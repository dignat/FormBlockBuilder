<template>
  <div class="panel" :id="id">
    <p class="panel-heading"> <span class="is-clickable" @click="toggle= !toggle">List Field -> {{ fields.title}} - Collapse/Expand   <font-awesome-icon :icon="['fas','angle-double-down']"/></span></p>
    <div class="section" v-show="toggle">
        <div class="field">
            <div class="control">
                <label class="label">Keep Iterator With Target</label>
                <input class="checkbox" type="checkbox" name="keepIterator" @change="populateTarget"  v-model="keepIteratorKey">
                <label class="label">Target -1</label>
                <input class="checkbox" type="checkbox" name="targetStatus"  @change="populateTarget" v-model="targetStatus">
            </div>
        </div>
      <div class="field">
            <div class="control">
                <label class="label">List Title</label>
                <input class="input" type="text" name="title" :listFields="listFields.title" v-model="fields.title">
            </div>
      </div>
      <div class="field">
            <div class="control">
                <label class="label">List Name</label>
                <input class="input" type="text" name="name" :listFields="listFields.name" v-model="fields.name">
                <label class="label">Choose slices from title to generate name ( ex. 0,1,2 - start from 0)</label>
                <input class="input" type="text"  v-model="slices">
            </div>
      </div>
      <div class="field">
            <div class="control">
                <label class="label">List Iterator/Uri Key</label>
                <input class="input" type="text" name="iteratorKey" :listFields="listFields.iteratorKey" v-model="fields.iteratorKey">
            </div>
      </div>
      <div class="field">
            <div class="control">
                <label class="label">List Target</label>
                <input class="input" type="text" name="target" :listFields="listFields.target" v-model="fields.target">
            </div>
      </div>
      <div class="field">
            <div class="control">
                <label class="label">List Uri</label>
                <input class="input" type="text" name="uri" :listFields="listFields.uri" v-model="fields.uri">
            </div>
      </div>
      <div class="field">
          <div class="control">
            <label class="label">Add items list</label>
            <input class="checkbox" type="checkbox" name="" v-model="toAddItems">
          </div>
      </div>
          <div class="field" v-if="toAddItems">
            <div class="control">
              <label class="label">Write items in this manner {title:'a title'} and comma separate more than one item {title:'a title'},{qty:7}</label>
              <input type="number" v-model="arrayLength" class="input">
              <div v-for="(field, index) in Number(arrayLength)" :key="index">
                <label class="label">Key</label>
                <input type="text" ref="itemKey" class="input">
                <label class="label">Value</label>
                <input type="text" ref="itemValue" class="input">

                <button class="button is-primary" @click="addItemsFields(index)">Add Items</button>
              </div>
            </div>
          </div>
        </div>
      <div class="field">
            <div class="control" v-if="!transform">
                    <ListComponent ref="form" v-for="(field, index) in buildFields" :listFields="field"
                                   :list="buildFields[index]" v-model="fields.template"
                               :id="index+''+index" :key="field.id" @addList="sync" @editList="edit(index, $event)" @deleteList="deleteListField(index)">

                    </ListComponent>
            </div>
            <div class="control" v-if="transform">
                <ListComponent v-for="(field, index) in translatedInputList.template" :listFields="field" v-model="fields.template"
                               :radio="field.type" :hasList="dependantList"  :type="field.type"
                               :transformList="transform" :changeRules="changeRules" :listFieldType="translatedListTypes[index]"
                               :deepDependantListTypes="deepDependantFieldTypes"
                               :id="index" :key="index" @addList="sync" @editList="edit">

                </ListComponent>
            </div>
        </div>

    <div class="field is-grouped">
        <div class="control">
            <button class="button is-primary" @click="addField">Add List</button>
        </div>
        <div class="control">
            <button class="button is-info" @click="addMoreListFields">Show More List Fields</button>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
    import ListComponent from "./ListComponent"
    import {mapActions} from 'vuex'
    import {mapGetters} from 'vuex'
    import appMixin from '../mixins'
    export default {
        name: "MainListComponent",
        mixins: [appMixin],
        props: {
          list : Object,
            listFields: Object,
            deepDependantListTypes: Array,
            transformList: Boolean,
            changeRules: Boolean,
            translatedList: Object,
            listFieldType: Object,
            dependantTypes: Array,
            hasList: Boolean,
            id: Number
        },
        components: {
            ListComponent
        },
        data () {
            return {
              toggle: true,
              toAddItems: false,
              itemsLength: 0,
              arrayLength: 0,
              listChoices: [],
                slices: '',
                targetStatus: false,
                keepIteratorKey: false,
                buildFields: [],
                currentListFields: [],
                translatedInputList: {},
                translatedListTypes:[],
                deepDependantTypes:[],
                transform: false,
                dependantList: false,
                transformedArray: [],
                deepDependantFieldTypes: [],
                itemsString: "",
              title: '',
                count: 0,
                fields: {
                    type: 'inputlist',
                    name: '',
                    title: '',
                    iteratorKey: '',
                    target: '',
                    uri: '',
                    items: [],
                    template: []
                }
            }
        },
        methods: {
            ...mapActions({
                toAddField: 'addField',
                toEditField: 'editField',
              toDeleteField: 'deleteField'
            }),
            ...mapGetters(['getTransform','getRules']),
          addItemsFields(index) {
              let itemKey = this.$refs.itemKey[index].value;
            let itemValue = this.$refs.itemValue[index].value;
            let objectItems = {};
            objectItems[itemKey] = itemValue;
            this.fields.items.push(objectItems);
          },
            sync (value) {
                this.currentListFields.push(value);
            },
            edit(index,value) {
               if (this.buildFields[index].id === index && this.buildFields[index].template[index].name === value.name) {
                 Object.assign(this.buildFields[index].template[index], value);
               } else if(this.buildFields[index].id === index) {
                 Object.assign(this.buildFields[index].template[index], value);
               }

            },
          deleteListField(index) {
              this.buildFields[index].template.splice(index,1);
              this.buildFields.splice(index,1);
              console.log(index, this.buildFields[index]);
          },
            addMoreListFields() {
                console.log(this.translatedInputList);
                console.log(this.buildFields.length, 'build fields in the lists')
                if (this.currentListFields.length > 1) {
                    if (this.uniqueFieldName(this.currentListFields)) {
                        alert('The field that you just added has a duplicate name!!!');
                    }
                }
                this.buildFields.push({
                    id: this.count++,
                    template: this.currentListFields
                });
            },
            addField() {
                const fields = {
                    type: 'inputlist',
                    name: this.fields.name === "" ? this.fields.name =  this.nameGenerator(this.fields.title,this.slices.length > 0 ? this.slices.split(',') : []) : this.fields.name,
                    title: this.fields.title,
                    iteratorKey: this.fields.iteratorKey,
                    target: this.fields.target,
                    items: this.fields.items,
                    template: this.currentListFields
                };
                if(this.targetStatus && !this.keepIteratorKey) {
                    delete Object.assign(fields, {['uri']:fields['iteratorKey']})['iteratorKey'];
                    //const newObject = {}; - for a new object
                    //delete Object.assign(newObject, o, {[newKey]: o[oldKey] })[oldKey];
                }
                this.toAddField(fields);
                return fields;
            },
            populateTarget() {
                console.log(this.keepIteratorKey, this.targetStatus)
                if (this.targetStatus && !this.keepIteratorKey) {
                    this.fields.target = '-1';
                    this.fields.iteratorKey = '/v1/api/' + this.fields.iteratorKey;
                    this.fields.uri = this.fields.uri.replace(this.fields.uri, '')
                } else if (this.targetStatus && this.keepIteratorKey) {
                    this.fields.target = '-1';
                    this.fields.uri = '/v1/api/' + this.fields.uri;
                    this.fields.iteratorKey = this.fields.iteratorKey.replace(this.fields.iteratorKey, '')
                } else {
                    this.fields.target = this.fields.target.replace(this.fields.target, '');
                    this.fields.iteratorKey = this.fields.iteratorKey.replace(this.fields.iteratorKey, '')
                    this.fields.uri = this.fields.uri.replace(this.fields.uri, '')
                }
                return !this.targetStatus === this.targetStatus
            },
            editField() {
                const editFields = {
                    type: 'inputlist',
                    name: this.fields.name === "" ? this.fields.name =  this.nameGenerator(this.fields.title) : this.fields.name,
                    title: this.fields.title,
                    iteratorKey: this.fields.iteratorKey,
                    target: this.fields.target,
                    template: this.currentListFields
                };
                this.toEditField(editFields);
                return editFields;
            },
          deleteField() {
            this.toDeleteField(this.fields);
            return this.fields;
          }
        },
        beforeMount() {
            if (this.getTransform() && !this.getRules()) {
                this.fields = this.listFields;
            }
            this.translatedInputList = this.listFields;
            this.translatedListTypes = this.dependantTypes;
            this.transform=this.transformList;
            this.dependantList = this.hasList;
            this.deepDependantFieldTypes = this.deepDependantListTypes
        }
    }
</script>

<style scoped>

</style>