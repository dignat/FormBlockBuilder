<template>
    <div>

        <div class="field">

            <div class="control">
                <Radios :types="types"  :radio="transform ? listFieldType: currentType" @change="handleChange"/>
            </div>
            <div class="control" v-if="!transform">
                <component ref="form"
                           :is="currentFieldType" :props="currentProps" :mainListFields="mainListFields"
                           :listFields="currentListFields"
                           ></component>
            </div>
            <div class="control" v-if="transform && !dependantList">
                <component ref="form" :listFieldTypes="listFieldTypes"
                           :is="changedRules ? currentFieldType: listFieldTypes" :props="currentProps"
                           :transformList="transformList"  :changeRules="changeRules"
                           :listFields="changedRules ? currentListFields : listFields"></component>
            </div>
        </div>
            <div class="field">
                <div class="control">
                    <button class="button is-info" @click="addField">Add List Fields</button>
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
    import MainListComponent from "./MainListComponent"
    import DateComponent from "./DateComponent"
    export default {
        name: "ListComponent",
        props: {
            listFields: Object,
            transformList: Boolean,
            changeRules: Boolean,
            mainListFields: Object,
            radio: String,
            listFieldType: String,
            listFieldTypes: Object,
            dependantListTypes: Object,
            hasList: Boolean
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
            MainListComponent,
            DateComponent

        },
        data () {
            return {
                types: ['inputlookup',
                    'inputtext',
                    'inputlookupalias',
                    'inputnumber',
                    'inputselect',
                    'inputradio',
                    'inputcheckbox',
                    'inputimage',
                    'inputsignature',
                    'inputformula',
                    'inputlist',
                    'inputdate'],
                currentFieldType: null,
                currentType: null,
                currentProps: {},
                currentListFields: {},
                transformedFields: {},
                dependantListFieldTypes: null,
                transform: null,
                dependantList: false,
                changedRules: false,
            }
        },
        methods: {
            addField() {
                this.currentListFields = this.$refs.form.addField();
                this.$emit('addList', this.currentListFields);
            },
            handleChange(type) {
                console.log(type);
                switch(type) {
                    case 'inputlookup':
                        this.currentFieldType = Lookup;
                        this.currentType = type;
                        this.currentListFields = {};
                        break;
                    case 'inputtext':
                        this.currentFieldType = TextComponent;
                        this.currentType = type;
                        this.currentListFields = {};
                        break;
                    case 'inputnumber':
                        this.currentFieldType = Number;
                        this.currentType = type;
                        this.currentListFields = {};
                        break;
                    case 'inputlookupalias':
                        this.currentFieldType = Alias;
                        this.currentType = type;
                        this.currentListFields = {};
                        break;
                    case 'inputselect':
                        this.currentFieldType = Select;
                        this.currentType = type;
                        this.currentListFields = {};
                        break;
                    case 'inputradio':
                        this.currentFieldType = RadioForm;
                        this.currentType = type;
                        this.currentListFields = {};
                        break;
                    case 'inputcheckbox':
                        this.currentFieldType = Checkbox;
                        this.currentType = type;
                        this.currentListFields = {};
                        break;
                    case 'inputimage':
                        this.currentFieldType = Photo;
                        this.currentType = type;
                        this.currentListFields = {};
                        break;
                    case 'inputsignature':
                        this.currentFieldType = Signature;
                        this.currentType = type;
                        this.currentListFields = {};
                        break;
                    case 'inputformula':
                        this.currentFieldType = Formula;
                        this.currentType = type;
                        this.currentListFields = {};
                        break;
                    case 'inputlist':
                        this.currentFieldType = MainListComponent;
                        this.currentType = type;
                        this.currentListFields = {};
                        break;
                    case 'inputdate':
                        this.currentFieldType = DateComponent;
                        this.currentType = type;
                        this.currentListFields = {};
                        break;

                }
            }
        },
        beforeMount() {
            this.currentType = this.radio;
            this.currentFieldType  = this.listFieldTypes;
            this.transform = this.transformList;
            this.changedRules = this.changeRules;
            this.listFieldType = this.radio
            this.dependantList = this.hasList
            this.dependantListFieldTypes = this.dependantListTypes
            this.transformedFields = this.listFields
        }
    }
</script>

<style scoped>

</style>