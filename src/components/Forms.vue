<template>
    <div>
        <div class="field">
                <Radios :types="types" :radio="currentType" @change="handleChange"/>
        </div>
       <div class="field" v-if="!transform">
           <div class="control">
               <component ref="form" :is="currentFieldType" :fieldsType="fieldsType"
                          :list="list" :transformList="transformList" :listFields="currentProps">
               </component>
           </div>
       </div>
        <div class="field" v-if="transform">
            <div class="control">
                <component ref="form" :is="changedRules ? currentFieldType : fieldsType"
                           :fieldsType="fieldsType" :list="list" :listFieldType="listFieldType" :repeaterTypes="repeaterTypes" :repeaterType="repeaterType"
                           :transformList="transformList" :translatedList="translatedList" :changeRules="changeRules" :listFieldTypes="listFieldTypes"
                           :dependantListTypes="dependantListTypes" :hasList="hasList"
                           :listFields="changedRules ? currentProps: translatedList">
                </component>
            </div>
        </div>
       <div class="field">
           <div class="control">
               <button class="button is-primary" @click="addField" :disabled="currentType === undefined">Add all Fields</button>
           </div>
       </div>
        <div class="field">
            <div class="control">
                <button class="button is-primary" @click="changedRules ? editField(currentProps) : editField(translatedList)">Edit all Fields</button>
            </div>
        </div>


    </div>

</template>

<script>
    import Lookup from './Lookup';
    import Radios from "./Radios";
    import TextComponent from "./TextComponent"
    import MainRepeater from './MainRepeater'
    import Alias from './Alias'
    import NumberComponent from './Number'
    import RadioForm from './RadioForm'
    import SelectComponent from './Select'
    import MainListComponent from "./MainListComponent"
    import Checkbox from "./Checkbox"
    import Photo from "./Photo"
    import Signature from "./Signature"
    import Formula from "./Formula"
    import DateComponent from "./DateComponent"
    import Location from "./Location"
    import HeaderComponent from "./HeaderComponent"
    import ListComponent from "./ListComponent";
    import TestListComponent from "./TestListComponent";
    import AliasSelect from "./AliasSelect"

    export default {
        name: "Forms",
        props: {
            list: Object,
            radio: String,
            fieldsType: Object,
            listFields: Object,
            translatedList: Object,
            transformList: Boolean,
            changeRules: Boolean,
            listFieldTypes: Array,
            listFieldType: String,
            repeaterTypes: Array,
            repeaterType: String,
            dependantListTypes: Array,
            hasList: Boolean
        },
        components: {
            Radios,
            Lookup,
            TextComponent,
            MainRepeater,
            Alias,
            RadioForm,
            SelectComponent,
            MainListComponent,
            ListComponent,
            Checkbox,
            Photo,
            Signature,
            Formula,
            DateComponent,
            Location,
            HeaderComponent,
            TestListComponent,
            NumberComponent,
            AliasSelect

        },
        data() {
            return {
                types: ['inputlookup', 'inputtext', 'inputlookupalias', 'inputlookupaliasselect', 'inputrepeat', 'inputnumber', 'inputradio', 'inputselect', 'inputlist', 'inputcheckbox', 'inputimage', 'inputsignature', 'inputformula','inputdate', 'inputlocation','text'],
                currentFieldType: null,
                currentType: null,
                currentProps: {},
                transformedFields: {},
                transform: null,
                changedRules: false
            }
        },
        methods: {
            addField() {
                this.currentProps = this.$refs.form.addField();
                this.$emit('addFields', this.currentProps);
                console.log(this.currentProps, 'here in the form')
            },
            editField () {
                this.currentProps = this.$refs.form.editField();
                this.$emit('editFields', this.currentProps);
                console.log(this.currentProps)
            },

            handleChange(type) {
                console.log(type);
                switch(type) {
                    case 'inputlookup':
                        this.currentFieldType = Lookup;
                        this.currentType = type;
                        this.changedRules = true;
                        this.currentProps = {};
                        break;
                    case 'inputtext':
                        this.currentFieldType = TextComponent;
                        this.currentType = type;
                        this.changedRules = true;
                        this.currentProps = {};
                        break;
                    case 'inputrepeat':
                        this.currentFieldType = MainRepeater;
                        this.currentType = type;
                        this.changedRules = true;
                        this.currentProps = {};
                        break;
                    case 'inputlookupalias':
                        this.currentFieldType = Alias;
                        this.currentType = type;
                        this.changedRules = true;
                        this.currentProps = {};
                        break;
                    case 'inputnumber':
                        this.currentFieldType = NumberComponent;
                        this.currentType = type;
                        this.changedRules = true;
                        this.currentProps = {};
                        break;
                    case 'inputradio':
                        this.currentFieldType = RadioForm;
                        this.currentType = type;
                        this.changedRules = true;
                        break;
                    case 'inputselect':
                        this.currentFieldType = SelectComponent;
                        this.currentType = type;
                        this.changedRules = true;
                        this.currentProps = {};
                        break;
                    case 'inputlist':
                        this.currentFieldType = MainListComponent;
                        this.currentType = type;
                        this.changedRules = true;
                        this.currentProps = {};
                        break;
                    case 'inputcheckbox':
                        this.currentFieldType = Checkbox;
                        this.currentType = type;
                        this.changedRules = true;
                        this.currentProps = {};
                        break;
                    case 'inputimage':
                        this.currentFieldType = Photo;
                        this.currentType = type;
                        this.changedRules = true;
                        this.currentProps = {};
                        break;
                    case 'inputsignature':
                        this.currentFieldType = Signature;
                        this.currentType = type;
                        this.changedRules = true;
                        this.currentProps = {};
                        break;
                    case 'inputformula':
                        this.currentFieldType = Formula;
                        this.currentType = type;
                        this.changedRules = true;
                        break;
                    case 'inputdate':
                        this.currentFieldType = DateComponent;
                        this.currentType = type;
                        this.changedRules = true;
                        this.currentProps = {};
                        break;
                    case 'inputlocation':
                        this.currentFieldType = Location;
                        this.currentType = type;
                        this.changedRules = true;
                        this.currentProps = {};
                        break;
                    case 'text':
                        this.currentFieldType = HeaderComponent;
                        this.currentType = type;
                        this.changedRules = true;
                        this.currentProps = {};
                        break;
                    case 'inputlookupaliasselect':
                        this.currentFieldType = AliasSelect;
                        this.currentType = type;
                        this.changedRules = true;
                        this.currentProps = {};
                        break;

                }
            }
        },
        beforeMount() {
            this.currentType = this.radio;
            this.currentFieldType  = this.fieldsType;
            this.transform = this.transformList;
            this.transformedFields = this.translatedList;
            this.changedRules = this.changeRules;
        }
    }
</script>

<style scoped>

</style>