<template>
    <div>
        <div class="field">
            <div class="control">
                <label class="label">List Name</label>
                <input class="input" type="text" name="name" :listFields="listFields.name" v-model="fields.name">
            </div>
            <div class="control">
                <label class="label">List Title</label>
                <input class="input" type="text" name="title" :listFields="listFields.title" v-model="fields.title">
            </div>
            <div  v-for="(field, index) in buildFields" :id="index" :key="index" >
                <div class="control">
                    <Radios :types="types" :radio="transform ? listTypes[index] : field.type[index]" @change="handleChange"/>
                </div>
                <div class="control" v-if="!transform">
                    <component ref="form"
                               v-for="(field, index) in buildFields" :listFields="fields.template" v-model="fields.template"
                               :id="index" :key="index" @addList="sync"></component>
                </div>
                <div class="control" v-if="transform">
                    <component ref="form" v-for="(field, index) in translateList.template" :listFields="field"
                               :radio="field.type" :listFieldType="field.type" :hasList="hasList"
                               :transformList="transform" :changeRules="changeRules" :listFieldTypes="listFieldTypes[index]"
                               :id="index" :key="index" @addList="sync"></component>
                </div>

            </div>
        </div>
        <div class="field">
            <div class="control">
                <button class="button is-info" @click="addField">Add List Fields</button>
            </div>
            <div class="control">
                <button class="button is-info" @click="addMoreListFields">Add More List Fields</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Lookup from './Lookup';
    import Radios from "./Radios";
    import TextComponent from "./TextComponent"
    import Alias from "./Alias"
    import Number from "./Number"
    import Select from "./Select"
    import RadioForm from "./RadioForm"
    import Checkbox from "./Checkbox"
    import Photo from "./Photo"
    import Signature from "./Signature"
    import Formula from "./Formula"
    import Location from "./Location"
    export default {
        name: "TestListComponent",
        props: {
            listFields: Object,
            translatedList: Object,
            transformList: Boolean,
            changeRules: Boolean,
            mainListFields: Object,
            radio: String,
            listFieldType: String,
            listFieldTypes: Object
        },
        components: {
            Lookup,
            Radios,
            TextComponent,
            Alias,
            Number,
            RadioForm,
            Checkbox,
            Photo,
            Signature,
            Formula,
            Location
        },
        data () {
            return {
                types: ['lookup', 'inputtext', 'alias', 'number', 'select', 'radio','checkbox','photo','signature', 'formula','inputlocation'],
                currentFieldType: null,
                currentType: null,
                currentProps: {},
                currentListFields: {},
                transformedFields: {},
                tempList: [],
                changedRules: false,
                listTypes : [],
                buildFields: [],
                fieldTypes: [],
                transform: false,
                count: 0,
                fields: {
                    type: 'inputlist',
                    name: '',
                    title: '',
                    template: []
                }
            }
        },
        methods: {
            sync (value) {
                this.currentListFields.push(value);
            },
            addField() {
                //this.tempList.push(this.currentListFields);
                //this.currentListFields = this.$refs.form.addField();
                this.tempList.push(this.currentListFields);
                this.fields.template = this.tempList;
                this.fields.type = 'inputlist';
                Object.assign({}, {type: '', title: '', name: ''});
                return this.fields;
            },
            addMoreListFields() {
                this.buildFields.push({
                    id: this.count++,
                    type: this.listTypes,
                    template: this.currentListFields,
                    fieldTypes: this.fieldTypes
                });
                console.log(this.currentListFields)
            },
            handleChange(type) {
                console.log(type);
                switch(type) {
                    case 'lookup':
                        this.currentFieldType = Lookup;
                        this.currentType = type;
                        this.listTypes.push(type)
                        this.fieldTypes.push(Lookup)
                        break;
                    case 'inputtext':
                        this.currentFieldType = TextComponent;
                        this.currentType = type;
                        this.listTypes.push(type)
                        this.fieldTypes.push(TextComponent)
                        break;
                    case 'number':
                        this.currentFieldType = Number;
                        this.currentType = type;
                        break;
                    case 'alias':
                        this.currentFieldType = Alias;
                        this.currentType = type;
                        break;
                    case 'select':
                        this.currentFieldType = Select;
                        this.currentType = type;
                        break;
                    case 'radio':
                        this.currentFieldType = RadioForm;
                        this.currentType = type;
                        break;
                    case 'checkbox':
                        this.currentFieldType = Checkbox;
                        this.currentType = type;
                        break;
                    case 'photo':
                        this.currentFieldType = Photo;
                        this.currentType = type;
                        break;
                    case 'signature':
                        this.currentFieldType = Signature;
                        this.currentType = type;
                        break;
                    case 'formula':
                        this.currentFieldType = Formula;
                        this.currentType = type;
                        break;
                    case 'inputlocation':
                        this.listTypes.push(type)
                        this.fieldTypes.push(Location)
                        break;

                }
            }
        },
        beforeMount() {
            this.fields = this.listFields
            this.transformedFields = this.translatedList
        }
    }
</script>

<style scoped>

</style>