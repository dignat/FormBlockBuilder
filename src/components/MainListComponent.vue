<template>
    <div class="section">
        <div class="field">
            <div class="control">
                <label class="label">Keep Iterator With Target</label>
                <input class="checkbox" type="checkbox" name="keepIterator" @change="populateTarget"  v-model="keepIteratorKey">
                <label class="label">Target -1</label>
                <input class="checkbox" type="checkbox" name="targetStatus"  @change="populateTarget" v-model="targetStatus">
            </div>
            <div class="control">
                <label class="label">List Title</label>
                <input class="input" type="text" name="title" :listFields="listFields.title" v-model="fields.title">
            </div>
            <div class="control">
                <label class="label">List Name</label>
                <input class="input" type="text" name="name" :listFields="listFields.name" v-model="fields.name">
                <label class="label">Choose slices from title to generate name ( ex. 0,1,2 - start from 0)</label>
                <input class="input" type="text"  v-model="slices">
            </div>
            <div class="control">
                <label class="label">List Iterator/Uri Key</label>
                <input class="input" type="text" name="iteratorKey" :listFields="listFields.iteratorKey" v-model="fields.iteratorKey">
            </div>
            <div class="control">
                <label class="label">List Target</label>
                <input class="input" type="text" name="target" :listFields="listFields.target" v-model="fields.target">
            </div>
            <div class="control">
                <label class="label">List Uri</label>
                <input class="input" type="text" name="uri" :listFields="listFields.uri" v-model="fields.uri">
            </div>
            <div class="control" v-if="!transform">
                    <ListComponent ref="form" v-for="(field, index) in buildFields" :listFields="field" v-model="fields.template"
                               :id="index" :key="index" @addList="sync" @editList="edit">

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
            <button class="button is-info" @click="addMoreListFields">Add More List Fields</button>
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
            listFields: Object,
            deepDependantListTypes: Array,
            transformList: Boolean,
            changeRules: Boolean,
            translatedList: Object,
            listFieldType: Object,
            dependantTypes: Array,
            hasList: Boolean,
        },
        components: {
            ListComponent
        },
        data () {
            return {
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
                count: 0,
                fields: {
                    type: 'inputlist',
                    name: '',
                    title: '',
                    iteratorKey: '',
                    target: '',
                    uri: '',
                    template: []
                }
            }
        },
        methods: {
            ...mapActions({
                toAddField: 'addField',
                toEditField: 'editField'
            }),
            ...mapGetters(['getTransform','getRules']),

            sync (value) {
                this.currentListFields.push(value);
            },
            edit(value) {
                if (!transform) {
                    this.currentListFields.pop();
                    this.currentListFields.push(value);
                }

            },
            addMoreListFields() {
                console.log(this.translatedInputList);
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