<template>
    <div>
      <div class="columns is-grouped">
        <div class="column is-3">
          <Radios v-myscroll:id="id" :types="types" :radio="transform ? listTypeField: currentType" @click="handleChange" />
        </div>
        <div class="column">
          <div v-if="!transform">
            <component ref="form"
                       :is="currentFieldType" :props="currentProps" :mainListFields="mainListFields"
                       :listFields="currentListFields" :list="list" :id="id">
            </component>
          </div>
          <div v-if="transform">
            <component :is="changedRules ?  currentFieldType  : transformedListType" ref="form"
                       :transformList="transformList" :changeRules="changeRules" :hasList="dependantList" :translatedList="transformedFields"
                       :dependantTypes="[transformedListType]" :deepDependantListFieldTypes="[deepDependantFieldType]"
                       :listFields="changedRules ? currentListFields : transformedFields">

            </component>
          </div>
          <div class="field is-grouped" v-if="currentType !== undefined">
            <div class="control">
              <button class="button is-info" @click="addField">Add List Fields</button>
            </div>
            <div class="control">
              <button class="button is-info" @click="editField">Edit List Fields</button>
            </div>
            <div class="control">
              <button class="button is-info" @click="deleteField">Delete List Fields</button>
            </div>
          </div>
        </div>
      </div>

     <!-- <div class="field">
        <Radios :types="types" :radio="transform ? listTypeField: currentType" @change="handleChange"/>
      </div>
          <div class="field">
            <div class="control" v-if="!transform">
              <component ref="form"
                         :is="currentFieldType" :props="currentProps" :mainListFields="mainListFields"
                         :listFields="currentListFields" :list="list">
              </component>
            </div>

      <div class="field">
        <div class="control" v-if="transform">
          <component :is="changedRules ?  currentFieldType  : transformedListType" ref="form"
                     :transformList="transformList" :changeRules="changeRules" :hasList="dependantList" :translatedList="transformedFields"
                     :dependantTypes="[transformedListType]" :deepDependantListFieldTypes="[deepDependantFieldType]"
                     :listFields="changedRules ? currentListFields : transformedFields">

          </component>
        </div>
      </div>

        </div>
            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-info" @click="addField">Add List Fields</button>
                </div>
                <div class="control">
                    <button class="button is-info" @click="editField">Edit List Fields</button>
                </div>
              <div class="control">
                <button class="button is-info" @click="deleteField">Delete List Fields</button>
              </div>
            </div>-->
    </div>

</template>

<script>
    import {mapActions} from 'vuex';
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
    import HeaderComponent from "./HeaderComponent";
    import AliasImage from "./AliasImage";
    import Duration from "./Duration";
    import Location from "./Location";
    import BarCodes from "./BarCodes";
    import {myscroll} from "../directives/myscroll";
    export default {
        name: "ListComponent",
        props: {
            list: Object,
            listFields: Object,
            transformList: Boolean,
            changeRules: Boolean,
            mainListFields: Object,
            radio: String,
            count: Number,
            fieldListType: String,
            listFieldType: Object,
            dependantTypes: Array,
            deepDependant: Array,
            hasList: Boolean,
            translatedList: Object,
            deepDependantType: String,
            deepDependantListFieldType: Object,
            deepDependantListTypes: Array,
            id: String
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
            DateComponent,
            HeaderComponent,
          Duration,
          BarCodes,
          Location

        },
        data () {
            return {
              toggle: true,
              isSecondList: false,
                types: [ {name:'inputlookup', label: 'Lookup List', icon: 'table'},
                  {name:'inputtext', label: 'Text', icon: 'font'},
                  {name:'inputlookupalias', label: 'Auto Populate', icon: 'align-center'},
                  {name:'inputnumber', label: 'Number', icon: 'calculator'},
                  {name:'inputradio', label: 'Radio', icon: 'check-circle'},
                  {name:'inputselect', label: 'Drop Down', icon: 'list'},
                  {name:'inputlist', label: 'Record Item\'s List', icon: 'th-large'},
                  {name:'inputcheckbox', label: 'Checkbox', icon: 'check-square'},
                  {name:'inputimage', label: 'Image', icon: 'camera'},
                  {name:'inputformula', label: 'Formula', icon: 'subscript'},
                  {name: 'inputdate',label: 'Date', icon: 'clock'},
                  {name: 'inputlocation', label: 'GPS', icon: 'map-marker'},
                  {name: 'text', label: 'Decoration Text', icon:'paragraph'},
                  {name:'inputlookupaliasimage', label: 'Image From Record', icon: 'camera'},
                  {name:'inputduration',label: 'Time Duration',icon: 'stopwatch'},
                  {name:'inputscan', label: 'Scanner', icon: 'qrcode'}],
                currentFieldType: null,
                currentType: null,
                listTypeField: '',
                currentProps: {},
                currentListFields: {},
                transformedFields: {},
                dependantListFieldType: '',
                deepDependantFieldTypes: [],
                transform: null,
                dependantList: false,
                changedRules: false,
                transformedListType: null,
                translatedListTypes:[],
                deepDependantTypes:[],
                deepDependantFieldType: null,
                deepDependantRadioType: null,
            }
        },
        methods: {
            ...mapActions({
                updateType: 'updateType',
            }),
            addField() {
                this.currentListFields = this.$refs.form.addField();
                console.log('in the list xaxa');
                this.$emit('addList', this.currentListFields);
            },
            editField() {
                this.currentListFields = this.$refs.form.editField();
                this.$emit('editList', this.currentListFields);
            },
          deleteField() {
            this.currentListFields = this.$refs.form.deleteField();
            this.$emit('deleteList', this.currentListFields);
          },
            handleChange(type) {
                console.log('type list',type);
                this.currentType = type;
                let changedType =  this.currentType;
                this.updateType({
                    type: changedType
                });
                switch(changedType) {
                    case 'inputlookup':
                        this.currentFieldType = Lookup;
                        this.currentListFields = {};
                        break;
                    case 'inputtext':
                        this.currentFieldType = TextComponent;
                        this.deepDependantFieldType = TextComponent;
                        this.currentListFields = {};
                        console.log('hello from the list')
                        break;
                    case 'inputnumber':
                        this.currentFieldType = Number;
                        this.currentListFields = {};
                        break;
                    case 'inputlookupalias':
                        this.currentFieldType = Alias;
                        this.currentListFields = {};
                        break;
                    case 'inputselect':
                        this.currentFieldType = Select;
                        this.currentListFields = {};
                        break;
                    case 'inputradio':
                        this.currentFieldType = RadioForm;
                        this.currentListFields = {};
                        break;
                    case 'inputcheckbox':
                        this.currentFieldType = Checkbox;
                        this.currentListFields = {};
                        break;
                    case 'inputimage':
                        this.currentFieldType = Photo;
                        this.currentListFields = {};
                        break;
                    case 'inputsignature':
                        this.currentFieldType = Signature;
                        this.currentListFields = {};
                        break;
                    case 'inputformula':
                        this.currentFieldType = Formula;
                        this.currentListFields = {};
                        break;
                    case 'inputlist':
                        this.currentFieldType = MainListComponent;
                        this.currentListFields = {};
                        this.isSecondList = true;
                        console.log('in the list and I should see you once', this.isSecondList, 'is second list');
                        break;
                    case 'inputdate':
                        this.currentFieldType = DateComponent;
                        this.currentListFields = {};
                        break;
                    case 'text':
                        this.currentFieldType = HeaderComponent;
                        this.currentListFields = {};
                        break;
                    case 'inputlookupaliasimage':
                        this.currentFieldType = AliasImage;
                            this.currentListFields = {}
                            break;
                    case 'inputduration':
                      this.currentFieldType = Duration;
                      this.currentListFields = {}
                      break;
                  case 'inputlocation':
                    this.currentFieldType = Location;
                    this.currentListFields = {}
                      break;
                    case 'inputscan':
                      this.currentFieldType = BarCodes;
                      this.currentListFields = {}
                      break;

                }
            }
        },
        beforeMount() {
            this.currentType = this.radio;
            this.listTypeField = this.radio;
            this.deepDependantRadioType = this.deepDependantType;
            this.transform = this.transformList;
            this.changedRules = this.changeRules;
            this.currentFieldType = this.listFieldType;
            this.transformedListType = this.listFieldType;
            this.deepDependantFieldType = this.deepDependantListFieldType;
            this.dependantList = this.hasList;
            this.transformedFields = this.listFields;
            this.translatedListTypes = this.dependantTypes;
            this.deepDependantFieldTypes = this.deepDependantTypes
        },
    }
</script>

<style scoped>

</style>