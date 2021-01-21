<template>
  <div class="panel">
    <p class="panel-heading"> <span class="is-clickable" @click="toggle= !toggle">Radio Field -> {{ fields.title}} - Collapse/Expand   <font-awesome-icon :icon="['fas','angle-double-down']"/></span></p>
    <div class="section" v-show="toggle">
        <div class="control">
            <Radios :types="types" :radio="customType" @click="handleChange"/>
            <label class="label">Radio Field Title</label>
            <input class="input" type="text" name="title" :listFields="listFields.title" v-model="fields.title">
            <label class="label">Choose slices from title to generate name ( ex. 0,1,2 - start from 0)</label>
            <input class="input" type="text"  v-model="slices">
            <label class="label">Radio Field Name</label>
            <input class="input" type="text" name="name" :listFields="listFields.name" v-model="fields.name">
            <label class="label">Radio Hidden ?</label>
            <input class="checkbox" type="checkbox" name="hidden" :listFields="listFields.hidden" v-model="fields.hidden">
            <div v-if="customTitles" v-for="(item, index) in customFields" :listFields="listFields.items">
                <label class="label">Custom Title Field</label>
                <input class="input" type="text" name="title" :customField="customTitles" v-model="item.title">
            </div>
            <div v-if="transformed" v-for="(item, index) in fields.items" >
                <label class="label">Custom Title Field</label>
                <input class="input" type="text" name="title" :listFields="item.title" v-model="item.title">
            </div>
        </div>
            <div class="field">
                <div v-if="customTitles" class="control">
                    <button class="button is-primary" @click="addCustomFields">Add Titles</button>
                </div>
            </div>
    </div>
  </div>
</template>

<script>
    import Radios from "./Radios"
    import {mapActions} from 'vuex'
    import {mapGetters} from 'vuex'
    import appMixin from '../mixins'

    export default {
        name: "RadioForm",
        mixins: [appMixin],
        props: {
            listFields: Object,
            radio: String,
            customField: Boolean,
            transformList: Boolean,
        },
        components: {
            Radios
        },
        data () {
            return {
              toggle: true,
                slices:'',
                customTitles: false,
                defaultOtherTitles: false,
                types: [{name:'default', label: 'Default (Yes/No)', icon: 'check-circle'}, {name:'custom', label:'Custom', icon: 'check-circle'}, {name: 'default other', label: 'Default (Yes/No/N/A)',icon:'check-circle'}],
                transformed: false,
                customType: null,
                customFields: [
                    {title: ''}
                ],
                fields: {
                    type: "inputradio",
                    title: '',
                    name: '',
                    hidden: 0,
                    items:[
                        {title: 'Yes'},
                        {title: 'No'}
                    ]
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
            addCustomFields() {
                this.customFields.push({
                    title:''
                });
            },
            addField() {
                const fields = {
                    type: "inputradio",
                    title: this.fields.title,
                    name:  this.fields.name === "" ? this.fields.name = this.nameGenerator(this.fields.title,this.slices.length > 0 ? this.slices.split(',') : []) : this.fields.name,
                    hidden: this.fields.hidden,
                    items: this.customTitles ? this.fields.items = this.customFields : this.customType === 'default other' ? this.fields.items = [{title: 'Yes'},{title: 'No'},{title: 'N/A'}] : this.fields.items = [{title: 'Yes'},{title: 'No'}]

                };
                console.log(this.types)
                this.toAddField(fields);
                return fields

            },
            editField () {
                const editFields = {
                    type: "inputradio",
                    title: this.fields.title,
                    name:  this.fields.name === "" ? this.fields.name = this.nameGenerator(this.fields.title,this.slices.length > 0 ? this.slices.split(',') : []) : this.fields.name,
                    hidden: this.fields.hidden,
                    items: this.customTitles ? this.fields.items = this.customFields : this.customType === 'default other' ? this.fields.items = [{title: 'Yes'},{title: 'No'},{title: 'N/A'}] : this.fields.items = [{title: 'Yes'},{title: 'No'}]
                };
                this.toEditField(editFields);
                return editFields;
            },
          deleteField() {
            this.toDeleteField(this.fields);
            return this.fields;
          },
            handleChange(type) {
                console.log(type, 'should show the type');
                switch(type) {
                    case 'custom':
                        this.customTitles = true;
                        this.customType = type;
                        console.log(this.customTitles);
                        break;
                    case 'default':
                        // do nothing
                        this.customTitles = false;
                        this.customType = type;
                        break;
                    case 'default other':
                        this.customTitles = false;
                        this.customType = type;
                        break;
                }
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