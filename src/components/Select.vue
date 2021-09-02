<template>
  <div class="panel">
    <p class="panel-heading"> <span class="is-clickable" @click="toggle= !toggle">Drop down Field -> {{ fields.title}} - Collapse/Expand   <font-awesome-icon :icon="['fas','angle-double-down']"/></span></p>
    <div class="section" v-show="toggle">
        <div class="field">
            <div class="control">
                <label class="label">Select Field Title</label>
                <input class="input" type="text" name="title" :listFields="listFields.title" v-model="fields.title">
                <label class="label">Choose slices from title to generate name ( ex. 0,1,2 - start from 0)</label>
                <input class="input" type="text"  v-model="slices">
                <label class="label">Select Field Name</label>
                <input class="input" type="text" name="name" :listFields="listFields.name" v-model="fields.name">
                <label class="label"> Icon Key Field For Select</label>
                <div class="control">
                    <input class="input" type="text" :listFields="listFields.iconKey" v-model="fields.iconKey">
                </div>
              <div class="control">
                <label class="label">Add Value to Items title?</label>
                <input class="checkbox" type="checkbox"  v-model="addValue">
              </div>
                <div  v-for="item in customFields">
                    <label class="label">Title Field</label>
                    <input class="input" type="text" name="title" :listFields="item.title" v-model="item.title">
                  <label class="label" v-if="addValue">Title Value</label>
                  <input v-if="addValue" class="input" type="number" name="title" :listFields="item.value" v-model="item.value">
                </div>
                <div v-if="transformed" v-for="item in fields.items">
                    <label class="label">Title Field</label>
                    <input class="input" type="text" name="title" v-model="item.title">
                </div>
                <label class="label">Multi ?</label>
                <div class="control">
                    <input class="checkbox" type="checkbox" name="multi" v-model="fields.multi">
                </div>
                <label class="label">Custom ?</label>
                <div class="control">
                    <input class="checkbox" type="checkbox" name="custom" v-model="fields.custom">
                </div>
            </div>
        </div>

        <div class="field">
            <div class="control">
                <button  class="button is-primary" @click="addSelectFields">Add Titles</button>
            </div>
        </div>

    </div>
  </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {mapGetters} from 'vuex'
    import appMixin from '../mixins'
    import helper from 'field_name_helper'
    export default {
        name: "Select",
        mixins: [appMixin],
        radio: String,
        transformList: Boolean,
        props: {
            listFields: Object
        },
        data () {
            return {
              addValue: false,
              toggle: true,
                slices: '',
                customFields: [
                    {title: ''}
                ],
                transformed: false,
                fields: {
                    type: "inputselect",
                    title: '',
                    name: '',
                    multi: 0,
                    custom: 0,
                    items:[
                        {title: ''},
                    ]
                }
            }
        },
        methods: {
            ...mapActions({
                    toAddField: 'addField',
                    toEditField: 'editField',
                  toDeleteField: 'deleteField'
            }
            ),
            ...mapGetters(['getTransform','getRules']),
            addSelectFields() {
              if (this.addValue) {
                this.customFields.push({
                  title:'',
                  value: 0
                });
              } else {
                this.customFields.push({
                  title:''
                });
              }

            },
            addField() {
                const fields = {
                    type: this.fields.multi ? "inputmultiselect" : "inputselect",
                    title: this.fields.title,
                    name: this.fields.name === "" ? this.fields.name = helper.nameGenerator(this.fields.title, this.slices.length > 0 ? this.slices.split(',') : [], null) : this.fields.name,
                    multi: this.fields.multi,
                    custom: this.fields.custom,
                    items: this.customFields
                };
                this.toAddField(fields);
                return fields;
            },
            editField() {
                const editFields = {
                    type: this.fields.multi ? "inputmultiselect" : "inputselect",
                    title: this.fields.title,
                    name: this.fields.name === "" ? this.fields.name = this.nameGenerator(this.fields.title) : this.fields.name,
                    multi: this.fields.multi,
                    custom: this.fields.custom,
                    items: this.customFields
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
        }
    }
</script>

<style scoped>

</style>