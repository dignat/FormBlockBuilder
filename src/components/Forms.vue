<template>
    <div>
        <div class="field">
                <Radios :types="types" :radio="transform ? changedRules ? currentType : translatedType : currentType" @change="handleChange"/>
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
                <component :is="changedRules ? currentFieldType : fieldsType" ref="form"
                            :list="list" :dependantTypes="dependantFieldTypes" :repeaterTypes="repeaterTypes" :repeaterType="repeaterType"
                           :transformList="transformList" :translatedList="transformedFields" :deepDependantListTypes="deepDependantFieldTypes"
                           :hasList="hasList"
                           :listFields="changedRules ? currentProps: transformedFields">
                </component>
            </div>
        </div>
       <div class="field is-grouped">
           <div class="control">
               <button class="button is-primary" @click="addField" :disabled="currentType === undefined">Add all Fields</button>
           </div>
            <div class="control">
                <button class="button is-primary" @click="changedRules ? editField(currentProps) : editField(transformedFields)" :disabled="currentType === undefined">Edit all Fields</button>
            </div>
            <div class="control">
                <button class="button is-primary" @click="changedRules ? deleteField(currentProps) : deleteField(transformedFields)" :disabled="currentType === undefined">Delete Field</button>
            </div>
         <div class="control">
           <button class="button is-primary" @click="addBeforeField" :disabled="currentType === undefined">Add Before Field</button>
         </div>
         <div class="control">
           <button class="button is-primary" @click="addAfterField" :disabled="currentType === undefined">Add After Field</button>
         </div>
       </div>
    </div>

</template>

<script>
    import {mapActions} from 'vuex';
    import {mapGetters} from 'vuex';
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
    import AliasImage from "./AliasImage";
    import Duration from "./Duration";
    import BarCodes from "./BarCodes";
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
            fieldListType: String,
            repeaterTypes: Array,
            repeaterType: String,
            dependantTypes: Array,
            deepDependant: Object,
            deepDependantListTypes: Array,
            hasList: Boolean,
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
            AliasSelect,
            Duration,
            BarCodes

        },
        data() {
            return {
                selected: {},
                types: ['inputlookup', 'inputtext', 'inputlookupalias', 'inputlookupaliasselect', 'inputrepeat', 'inputnumber', 'inputradio', 'inputselect', 'inputlist', 'inputcheckbox', 'inputimage', 'inputsignature', 'inputformula','inputdate', 'inputlocation','text','inputlookupaliasimage','inputduration','inputscan'],
                currentFieldType: null,
                currentType: null,
                currentProps: {},
                transformedFields: {},
                deepTransformedFields:{},
                deepDependantFieldType: null,
                deepDependantField: null,
                transform: null,
                changedRules: false,
                translatedType: null,
                dependantFieldTypes:[],
                deepDependantFieldTypes: []
            }
        },
        methods: {
            ...mapActions({
                updateType: 'updateType',
                sendTheEditFields: 'checkedField'
            }),
            ...mapGetters(['getRules']),
            addField() {
                this.currentProps = this.$refs.form.addField();
                this.$emit('addFields', this.currentProps);
                console.log(this.currentProps, 'here in the form')
            },
            editField () {
                this.currentProps = this.$refs.form.editField();
                this.$emit('editFields', this.currentProps);
                console.log(this.currentProps, 'edit Fields')
            },
            deleteField() {
                this.currentProps = this.$refs.form.deleteField();
                this.$emit('deleteFields', this.currentProps);
                console.log(this.currentProps, 'delete Fields')
            },
          addBeforeField() {
            this.$emit('addBeforeFields', this.currentProps);
          },
          addAfterField() {
            this.$emit('addAfterFields', this.currentProps);
          },
            handleChange(type) {
                console.log('type',type);
                this.currentType = type;
                this.translatedType = type;
                let changedType = this.transform ? this.translatedType : this.currentType;
                this.updateType({
                    type: changedType
                });
                switch(changedType) {
                    case 'inputlookup':
                        this.currentFieldType = Lookup;
                        this.changedRules = true;
                      this.transform ? this.transformedFields !== undefined ? this.sendTheEditFields(this.transformedFields.name) : '' : this.currentProps !== undefined ? this.sendTheEditFields(this.currentProps.name) : '';
                      break;
                    case 'inputtext':
                        this.currentFieldType = TextComponent;
                        this.changedRules = true;
                        this.transform ? this.transformedFields !== undefined ? this.sendTheEditFields(this.transformedFields.name) : '' : this.currentProps !== undefined ? this.sendTheEditFields(this.currentProps.name) : '';
                        break;
                    case 'inputrepeat':
                        this.currentFieldType = MainRepeater;
                        this.changedRules = true;
                      this.transform ? this.transformedFields !== undefined ? this.sendTheEditFields(this.transformedFields.name) : '' : this.currentProps !== undefined ? this.sendTheEditFields(this.currentProps.name) : '';
                      break;
                    case 'inputlookupalias':
                        this.currentFieldType = Alias;
                        this.changedRules = true;
                      this.transform ? this.transformedFields !== undefined ? this.sendTheEditFields(this.transformedFields.name) : '' : this.currentProps !== undefined ? this.sendTheEditFields(this.currentProps.name) : '';
                      break;
                    case 'inputnumber':
                        this.currentFieldType = NumberComponent;
                        this.changedRules = true;
                        this.transform ? this.transformedFields !== undefined ? this.sendTheEditFields(this.transformedFields.name) : '' : this.currentProps !== undefined ? this.sendTheEditFields(this.currentProps.name) : '';
                        break;
                    case 'inputradio':
                        this.currentFieldType = RadioForm;
                        this.changedRules = true;
                      this.transform ? this.transformedFields !== undefined ? this.sendTheEditFields(this.transformedFields.name) : '' : this.currentProps !== undefined ? this.sendTheEditFields(this.currentProps.name) : '';
                      break;
                    case 'inputselect':
                        this.currentFieldType = SelectComponent;
                        this.changedRules = true;
                      this.transform ? this.transformedFields !== undefined ? this.sendTheEditFields(this.transformedFields.name) : '' : this.currentProps !== undefined ? this.sendTheEditFields(this.currentProps.name) : '';
                      break;
                    case 'inputlist':
                        this.currentFieldType = MainListComponent;
                        this.changedRules = true;
                      this.transform ? this.transformedFields !== undefined ? this.sendTheEditFields(this.transformedFields.name) : '' : this.currentProps !== undefined ? this.sendTheEditFields(this.currentProps.name) : '';
                      break;
                    case 'inputcheckbox':
                        this.currentFieldType = Checkbox;
                        this.changedRules = true;
                      this.transform ? this.transformedFields !== undefined ? this.sendTheEditFields(this.transformedFields.name) : '' : this.currentProps !== undefined ? this.sendTheEditFields(this.currentProps.name) : '';
                      break;
                    case 'inputimage':
                        this.currentFieldType = Photo;
                        this.changedRules = true;
                      this.transform ? this.transformedFields !== undefined ? this.sendTheEditFields(this.transformedFields.name) : '' : this.currentProps !== undefined ? this.sendTheEditFields(this.currentProps.name) : '';
                      break;
                    case 'inputsignature':
                        this.currentFieldType = Signature;
                        this.changedRules = true;
                      this.transform ? this.transformedFields !== undefined ? this.sendTheEditFields(this.transformedFields.name) : '' : this.currentProps !== undefined ? this.sendTheEditFields(this.currentProps.name) : '';
                      break;
                    case 'inputformula':
                        this.currentFieldType = Formula;
                        this.changedRules = true;
                        break;
                    case 'inputdate':
                        this.currentFieldType = DateComponent;
                        this.changedRules = true;
                      this.transform ? this.transformedFields !== undefined ? this.sendTheEditFields(this.transformedFields.name) : '' : this.currentProps !== undefined ? this.sendTheEditFields(this.currentProps.name) : '';
                      break;
                    case 'inputlocation':
                        this.currentFieldType = Location;
                        this.changedRules = true;
                      this.transform ? this.transformedFields !== undefined ? this.sendTheEditFields(this.transformedFields.name) : '' : this.currentProps !== undefined ? this.sendTheEditFields(this.currentProps.name) : '';
                      break;
                    case 'text':
                        this.currentFieldType = HeaderComponent;
                        this.changedRules = true;
                      this.transform ? this.transformedFields !== undefined ? this.sendTheEditFields(this.transformedFields.name) : '' : this.currentProps !== undefined ? this.sendTheEditFields(this.currentProps.name) : '';
                      break;
                    case 'inputlookupaliasselect':
                        this.currentFieldType = AliasSelect;
                        this.changedRules = true;
                      this.transform ? this.transformedFields !== undefined ? this.sendTheEditFields(this.transformedFields.name) : '' : this.currentProps !== undefined ? this.sendTheEditFields(this.currentProps.name) : '';
                      break;
                    case 'inputlookupaliasimage':
                        this.currentFieldType = AliasImage;
                        this.changedRules = true;
                      this.transform ? this.transformedFields !== undefined ? this.sendTheEditFields(this.transformedFields.name) : '' : this.currentProps !== undefined ? this.sendTheEditFields(this.currentProps.name) : '';
                      break;
                    case 'inputduration':
                        this.currentFieldType = Duration;
                        this.changedRules = true;
                      this.transform ? this.transformedFields !== undefined ? this.sendTheEditFields(this.transformedFields.name) : '' : this.currentProps !== undefined ? this.sendTheEditFields(this.currentProps.name) : '';
                      break;
                    case 'inputscan':
                        this.currentFieldType = BarCodes;
                        this.changedRules = true;
                      this.transform ? this.transformedFields !== undefined ? this.sendTheEditFields(this.transformedFields.name) : '' : this.currentProps !== undefined ? this.sendTheEditFields(this.currentProps.name) : '';
                      break;
                }
            }
        },
        beforeMount() {
            this.currentFieldType  = this.fieldsType;
            this.deepDependantFieldType = this.fieldsType;
            this.deepDependantFieldType = this.deepDependantType;
            this.dependantFieldTypes = this.dependantTypes;
            this.transform = this.transformList;
            this.translatedType = this.radio;
            this.currentType = this.radio;
            this.transformedFields = this.translatedList;
            this.deepDependantFieldTypes = this.deepDependantListTypes
        }
    }
</script>

<style scoped>

</style>