<template>
    <div class="formSection">
      <p class="panel-heading"> <span class="is-clickable" @click="toggle= !toggle">Field  ->  Collapse/Expand   <font-awesome-icon :icon="['fas','angle-double-down']"/></span></p>
      <div class="columns is-grouped" v-show="toggle">
            <div class="column is-one-fifth">
              <Radios v-myscroll:id="id" :types="types" :radio="transform ? changedRules ? currentType : translatedType : currentType" @click="handleChange"/>
            </div>
            <div class="column">
              <div v-if="!transform" class="formSection">
                <component ref="form" :is="currentFieldType" :fieldsType="fieldsType" :id="id"
                           :list="list" :transformList="transformList" :listFields="currentProps">
                </component>
              </div>
              <div  v-if="transform">
                <component :is="changedRules ? currentFieldType : fieldsType" ref="form"
                           :list="list" :dependantTypes="dependantFieldTypes" :repeaterTypes="repeaterTypes" :repeaterType="repeaterType"
                           :transformList="transformList" :translatedList="transformedFields" :deepDependantListTypes="deepDependantFieldTypes"
                           :hasList="hasList"
                           :listFields="changedRules ? currentProps: transformedFields">
                </component>
              </div>

              <div class="field is-grouped" v-if="currentType !== undefined">
                <div class="control">
                  <button class="button is-primary" @click.once="addField" :disabled="currentType === undefined">Add all Fields</button>
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
                  <button class="button is-primary" @click="removeShownField">Remove Shown Field</button>
                </div>
                <div class="control">
                  <button class="button is-primary" @click="addAfterField" :disabled="currentType === undefined">Add After Field</button>
                </div>
              </div>
            </div>
        </div>
       <!--<div class="field" v-if="!transform">
           <div class="control">
               <component ref="form" :is="currentFieldType" :fieldsType="fieldsType"
                          :list="list" :transformList="transformList" :listFields="currentProps">
               </component>
           </div>
       </div>-->
        <!--<div class="field" v-if="transform">
            <div class="control">
                <component :is="changedRules ? currentFieldType : fieldsType" ref="form"
                            :list="list" :dependantTypes="dependantFieldTypes" :repeaterTypes="repeaterTypes" :repeaterType="repeaterType"
                           :transformList="transformList" :translatedList="transformedFields" :deepDependantListTypes="deepDependantFieldTypes"
                           :hasList="hasList"
                           :listFields="changedRules ? currentProps: transformedFields">
                </component>
            </div>
        </div>-->
      <!-- <div class="field is-grouped">
           <div class="control">
               <button class="button is-primary" @click.once="addField" :disabled="currentType === undefined">Add all Fields</button>
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
           <button class="button is-primary" @click="removeShownField">Remove Shown Field</button>
         </div>
         <div class="control">
           <button class="button is-primary" @click="addAfterField" :disabled="currentType === undefined">Add After Field</button>
         </div>
       </div>-->
    </div>

</template>

<script>
    import {mapActions} from 'vuex';
    import {mapGetters} from 'vuex';
    import {mapState} from 'vuex';
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
    import {myscroll} from "../directives/myscroll";
    import RadiosWithVuex from "./RadiosWithVuex";
    import TextComponentWithVuex from "./TextComponentWithVuex";
    import FormVuex from "./FormVuex";
    export default {
        name: "Forms",
        props: {
            id: [Number, String],
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
            BarCodes,
          RadiosWithVuex,
          TextComponentWithVuex,
          FormVuex

        },
        data() {
            return {
              toggle: true,
                selected: {},
                types: [
                    {name:'inputlookup', label: 'Lookup', icon: 'table'},
                  {name:'inputtext', label: 'Text', icon: 'font'},
                  {name:'inputlookupalias', label: 'Alias', icon: 'align-center'},
                  {name:'inputlookupaliasselect', label: 'Alias Select', icon: 'th-list'},
                  {name:'inputrepeat', label: 'Repeater', icon: 'th-large'},
                  {name:'inputnumber', label: 'Number', icon: 'calculator'},
                  {name:'inputradio', label: 'Radio', icon: 'check-circle'},
                  {name:'inputselect', label: 'Drop Down', icon: 'list'},
                  {name:'inputlist', label: 'List', icon: 'th-large'},
                  {name:'inputcheckbox', label: 'Checkbox', icon: 'check-square'},
                  {name:'inputimage', label: 'Image', icon: 'camera'},
                  {name:'inputsignature',label: 'Signature', icon: 'signature'},
                  {name:'inputformula', label: 'Formula', icon: 'subscript'},
                  {name: 'inputdate',label: 'Date', icon: 'clock'},
                  {name: 'inputlocation', label: 'GPS', icon: 'map-marker'},
                  {name: 'text', label: 'Long Text', icon:'paragraph'},
                  {name:'inputlookupaliasimage', label: 'Alias Image', icon: 'camera'},
                  {name:'inputduration',label: 'Duration',icon: 'stopwatch'},
                  {name:'inputscan', label: 'Scanner', icon: 'qrcode'}],
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
                sendTheEditFields: 'checkedField',
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
          removeShownField() {
            this.$emit('removeShownFields', this.currentProps);
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
        },
    }
</script>

<style scoped>
.formSection {
  border: #b5b5b5 solid 1px;
  margin-bottom: 50px;
}
</style>