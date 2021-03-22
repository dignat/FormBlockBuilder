<template>
  <div id="app" v-if="user.loggedId">
    <section class="section">
      <div class="container" style="width: 100%; margin: 20px;">
        <h1 class="has-text-centered"><strong>Form</strong></h1>
        <div class="field">
          <label class="label">Form Title</label>
          <input class="input" type="text" name="title" v-model="formFields.title">
        </div>
        <div class="field">
          <label class="label">Form Name</label>
          <input class="input" type="text" name="name" v-model="formFields.name">
        </div>
        <div class="field">
          <p><strong>Pick Forms From DB</strong></p>
          <div class="select is-primary is-fullwidth">
            <select class="select" @click="formsFromFirebase" v-model="selectedName">
              <option v-for="name in formNames" v-bind:value="name">{{name}}</option>
            </select>
          </div>
        </div>
        <div class="field">
          <p><strong>Pick A Client</strong></p>
          <div class="select is-primary is-fullwidth">
            <select class="select" @change="loadClient" v-model="selectedClientName">
              <option v-for="name in clientNames" v-bind:value="name">{{name}}</option>
            </select>
          </div>
        </div>
        <div class="field" v-if="!transform">
<!--       <FormVuex v-for="(item, index) in builder" :key="index"/>-->
          <Forms ref="form" v-for="(field, index) in buildFields" :id="index"
                 :transformList="transform" :list="formFields"
                 :key="field.id"  @addFields="sync(index, $event)"
                 @editFields="edit(index, field.id, $event)" @deleteFields="deleteField(index)"
                 @addBeforeFields="addBefore(index)" @addAfterFields="addAfter(index)" @removeShownFields="removeShown(index)">
          </Forms>
        </div>
        <div class="field" v-if="transform">
          <Forms :fieldsType="fieldTypes[index]" ref="form"
                 v-for="(field, index) in buildFields" :radio="field.type" :type="field.type" :fieldListType="dependantType" :repeaterType="dependantRepeaterType" :repeaterTypes="dependantRepeaterTypes"
                 :transformList="transform" :list="formFields" :key="field.id" :changeRules="changingRules" :dependantTypes="dependantListTypes"
                 :deepDependantType="deepDependantType" :deepDependantListTypes="deepDependantListFieldTypes"
                 :hasList="dependantList" :id="index"
                 :translatedList="field.items[index]"   @addFields="sync(index, $event)"
                 @editFields="editTranslated(index, field.id, $event)" @deleteFields="deleteField(index)">
          </Forms>
        </div>
        <div class="field is-grouped">
          <div class="control">
<!--            <button class="button is-primary" @click="addBlock()" >Show Fields To Add</button>-->
            <button class="button is-primary" @click="addTypeFields" :disabled="buildFields.length > formFields.items.length">Show Fields To Add</button>
          </div>
          <div class="control">
            <button class="button is-primary" @click="removeTypeFields">Remove Shown Fields</button>
          </div>
          <!--<div class="control ">
            <button class="button is-primary" @click="removeFields">Remove Fields From Form</button>
          </div>-->
          <div class="control">
            <button class="button is-danger" @click="generateForm(clients.id)" :disabled="clients.clientName === ''">Generate</button>
          </div>
          <div class="control">
            <button class="button is-danger" @click="translateForm">Translate Form</button>
          </div>
          <!--<div class="control">
            <button class="button is-danger" @click="translateOldForm">Translate Old Form</button>
          </div>-->
          <div class="control">
            <button class="button is-danger" @click="loadForm">Load Form</button>
          </div>
          <div class="control">
            <button class="button is-danger" :disabled="selectedClientName === ''" @click="updateForm(formFields.id, clients.id)">Update Form {{formFields.id}} Client Id{{ clients.id}}</button>
          </div>
          <div class="control">
            <button class="button is-success" @click="signOut">Log Out</button>
          </div>
        </div>
        <div class="section">
          <div class="field">
            <div class="control">
              <label class="label">Json Form</label>
              <textarea class="textarea is-primary" rows="40" cols="255">{{JSON.stringify(this.formFields, null, '\t')}}</textarea>
            </div>
          </div>
          <app-editor :table="tableToDisplay"></app-editor>
          <app-twig :template="tableToDisplay"></app-twig>
          <div class="control">
            <button class="button is-info" @click="Pdf()">Generate Pdf</button>
          </div>
        </div>
        <div class="section">
          <textarea v-model="existingForm">

          </textarea>
        </div>
      </div>
    </section>
    <section class="samsung">
      <div class="inside">
        <h3 style="text-align: center;"><strong>{{formFields.title}}</strong></h3>
        <app-html v-for="(data, index) in formFields.items"
                  :key="index"
                  v-bind:type="data.type"
                  v-bind:width="data.width"
                  v-bind:title="data.title"
                  v-bind:item_title="data.item_title"
                  v-bind:items="data.items"
                  v-bind:template="data.template"
                  v-bind:body="data.body"
                  v-bind:multi="data.multi"
                  v-bind:uri="data.uri"
                  v-bind:script="data.script"
                  v-bind:name="data.name"
                  v-bind:data="data">

        </app-html>
        <div class="field is-grouped">
          <button class="button is-primary is-fullwidth" style="margin-top: 10px; margin-right: 5px;" v-if="formFields.items.length">Copy</button>
          <button class="button is-primary is-fullwidth" style="margin-top: 10px; margin-right: 5px;" v-if="formFields.items.length"> Save</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import Forms from './components/Forms'
import Html from './components/Html'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'
import {mapState} from 'vuex'
import axios from 'axios'
import {db} from "./database/db";
import Select from "./components/Select";
import appMixin from "./mixins";
import Table from './components/Table';
import generatePdf from "./generatePdf";
import Editor from "./components/Editor";
import TemplateEditor from "./components/TemplateEditor";
import firebase from "firebase";
import user from "./store/modules/user";
import FormVuex from "./components/FormVuex";
export default {
  name: 'App',
  components: {
    Select,
    Forms,
    'app-html': Html,
    'app-editor': Editor,
    'app-twig': TemplateEditor,
    FormVuex
  },
  mixins: [appMixin],
  data () {
    return {
      isReplaced: false,
      tableToDisplay: '',
      forms: [],
      selectedName: '',
      selectedClientName: '',
      transform: false,
      buildFields: [],
      tempFields: {},
      buildOfTranslate: [],
      currentFieldType: null,
      currentType: "",
      dependantType: "",
      deepDependantType: "",
      dependantRepeaterType: "",
      currentProps: {},
      changingRules: false,
      fieldTypes: [],
      dependantListTypes: [],
      deepDependantListFieldTypes: [],
      dependantListFieldTypes: [],
      dependantListType: "",
      dependantRepeaterTypes: [],
      dependantList: false,
      message: '',
      formNames:[],
      clientNames: [
      ],
      existingForm: {
        title: '',
        type: 'form',
        name: '',
        uri: '',
        items: []
      },
      count: 0,
      clientForms: {
        client: {
          clientName: '',
          clientId: ''
        },
        formFields: {
          title: '',
          type: 'form',
          name: '',
          uri: '',
          items: []
        },
      },
      formFields: {
        title: '',
        type: 'form',
        name: '',
        uri: '',
        items: []
      },
      clients: {
        clientName: '',
        clientUri: '',
        forms:[]
      },

    }
  },
  methods: {
    ...mapActions({
      toTransform: 'translateOldForm',
      buildTypeFields: 'addTypeFields',
      setTransform: 'setTransform',
      addBlock: 'addBlock',
    }),
    ...mapGetters(['translatedForm', 'editFields', 'currentFormFields', 'currentForm','editedName','getRules']),
    Pdf() {
      this.tableToDisplay = generatePdf(this.formFields.items)
    },
    translateOldForm() {
      return this.toTransform(JSON.parse(this.existingForm), this.formFields);
    },
    clientFromDB() {
      firebase.database().ref('clients').once('value')
      .then((res) => {
        const data = res.val();
        const dbClientName = [];
        for(let key in data) {
          const clientName = data[key].clientName;
          dbClientName.push(clientName)
        }
        this.clientNames = dbClientName
      })
      .catch((error) => {
        console.log(error)
      })
    },
    formsFromFirebase() {
      firebase.database().ref('forms').once('value')
      .then((res) => {
        const data = res.val();
        const dbFormName = [];
        for (let key in data) {
          const formName = data[key].formFields !== undefined ? data[key].formFields.title : data[key].title;
          console.log(data[key].formFields)
          dbFormName.push(formName);
        }
        this.formNames = dbFormName;
        return this.formNames
      }).catch((error) => {
        console.log(error)
      })
     /* axios.get('https://formbuilder-f0c5e.firebaseio.com/forms.json?')
          .then(res => {
            const data = res.data;
            const dbFormName = [];
            for (let key in data) {
              const formName = data[key].title;
              dbFormName.push(formName);
            }
            this.formNames = dbFormName;
          })
          .catch(error => console.log(error))*/
    },
    sync (index,value) {
      console.log(value, this.formFields.items);
      if (this.isReplaced) {
        this.formFields.items.splice(index,0,value)
      } else {
        this.formFields.items.push(value)
      }

    },
    deleteField(value) {
      console.log(value, 'main delete button')
      this.buildFields[value].items.splice(value,1);
      this.buildFields.splice(value,1)
      console.log('There are the build fields',this.buildFields, this.buildFields[value])
    },
    edit (index, id, value) {
      if (this.buildFields[index].id === index && this.buildFields[index].items[index].name === value.name) {
        Object.assign(this.buildFields[index].items[index], value);
      } else if(this.buildFields[index].id === id) {
        Object.assign(this.buildFields[index].items[index], value);
      }
    },
    addBefore(index) {
      console.log(index, this.count)
      this.buildFields.splice(index, 0, {id: this.count++, items: this.formFields.items})
      this.isReplaced = true;
    },
    addAfter(index) {
      this.buildFields.splice(index+1, 0, {id: this.count++, items: this.formFields.items})
      this.isReplaced = true;
    },
    removeShown(index) {
      this.buildFields.splice(index,1);
    },
    editTranslated(value) {
      for(let j = 0; j < this.buildFields[0].items.length; j++) {
        if (value.name === this.buildFields[0].items[j].name) {
          Object.assign(this.buildFields[0].items[j], value);
          this.buildFields[0].items[j] = {...value};
        }
        else if (this.editedName() === this.buildFields[0].items[j].name) {
          console.log('I edit translated field', value.name, this.buildFields[0].items[j].name);
          value.name = this.editedName();
          Object.assign(this.buildFields[0].items[j], value);
          this.buildFields[0].items[j] = {...value};
        }
      }
    },
    removeFields () {
      this.formFields.items.pop();
    },
    addTypeFields() {
      console.log(this.clients)
      if (this.formFields.items.length > 1) {
        if (this.uniqueFieldName(this.formFields.items)) {
          alert('The field that you just added has a duplicate name!!!');
        }
      }
      this.changingRules = true;
      this.buildTypeFields(this.formFields);
      this.buildFields.push({
        id: this.count++,
        items: this.formFields.items
      });
      console.log(this.buildFields)
    },
    removeTypeFields () {
      if (this.buildFields.length > this.formFields.items.length) {
        this.buildFields.pop();
      }
    },
    updateClient(clientId) {
      firebase.database().ref('clients/'+clientId).update(this.clients)
          .then((result) => {
            console.log(result)
          })
          .catch((error) => {
            console.log(error)
          })
    },
    formsFromDbForClient(clientId) {

    },
    generateForm(clientId) {
      Object.assign({}, {title: '', name: '', type: 'form'});
      this.formFields.name = this.formFields.title.replace(/[\s,&,-\/_?():.]/g, "");
      this.formFields.uri = '/reflow/data/update/form/' + this.formFields.name;
      this.clientForms.client.clientName = this.selectedClientName;
      this.clientForms.client.clientId = clientId;
      Object.assign(this.clientForms.formFields, this.formFields)
      firebase.database().ref('forms').push(this.clientForms)
      .then((data) => {
          if (this.clients.clientName === this.selectedClientName) {
            this.clients.forms.push(data.getKey());
          }
          console.log(clientId)
       this.updateClient(clientId)
      }).catch((error) => {
        console.log(error)
      })
     // axios.post('https://formbuilder-f0c5e.firebaseio.com/forms.json?',this.formFields)
      //    .then(res => console.log(res))
       //   .catch(error => console.log(error))
    },
    loadClient() {
      firebase.database().ref('clients').once('value')
      .then((res) => {
        const data = res.val();
        const dbClient = [];
        for(let key in data) {
          const client = data[key];
          client.id = key;
          if (this.selectedClientName === data[key].clientName) {
            dbClient.push(client)
          }
        }
        Object.assign(this.clients, dbClient[0])
        console.log(this.clients)
      }).catch((error) => {
        console.log(error)
      })
    },
    loadForm() {
      firebase.database().ref('forms').once('value')
          .then((res) => {
            const data = res.val();
            console.log(data);
            const dbForm = [];
            for (let key in data) {
              const form = data[key].formFields !== undefined ? data[key].formFields : data[key];
              form.id = key;
              if (this.selectedName === data[key].title) {
                dbForm.push(form);
              } else if (data[key].formFields !== undefined) {
                if (this.selectedName === data[key].formFields.title) {
                  dbForm.push(form)
                  this.selectedClientName = data[key].client.clientName;
                }
              }
            }
            console.log(this.selectedName, this.selectedClientName);
            Object.assign(this.existingForm, dbForm[0]);
          }).catch((error) => {
        console.log(error)
      })
     /* axios.get('https://formbuilder-f0c5e.firebaseio.com/forms.json?')
          .then(res =>  {
            const data = res.data;
            const dbForm = [];
            for (let key in data) {
              const form = data[key];
              form.id = key;
              if (this.selectedName === data[key].title) {
                dbForm.push(form);
              }
            }
            Object.assign(this.existingForm, dbForm[0]);
          })
          .catch(error => console.log(error));*/
    },
    updateForm(formId, clientId) {
      var config = {
        headers: {'Access-Control-Allow-Origin': '*'}
      };
      this.clientForms.client.clientName = this.selectedClientName;
      this.clientForms.client.clientId = clientId;
      Object.assign(this.clientForms.formFields, this.formFields)
      console.log(this.clientForms.formFields)
      firebase.database().ref('forms/'+formId).update(this.clientForms)
      .then((data) => {
        console.log(data, 'data')
        if (this.clients.clientName === this.selectedClientName) {
          this.clients.forms.push(formId);
        }
      }).catch((error) => console.log(error))
     /* axios.put('https://formbuilder-f0c5e.firebaseio.com/forms/'+formId+".json",this.formFields,config)
          .then(res => console.log(res.data))
          .catch(error => console.log(error))*/
    },
    signOut() {
      firebase
      .auth()
          .signOut()
      .then(() => {
        this.$router.replace({name: "Login"})
      })
    },
    translateForm() {
      this.transform = true;
      this.setTransform(this.transform);
      Object.assign(this.formFields,this.existingForm);
      console.log(this.formFields)
      for (let i = 0; i < this.formFields.items.length; i++) {
        this.currentType = this.formFields.items[i].type;
        this.fieldTypes.push(Forms.components);
        this.buildFields.push({
          id: this.count++,
          type: this.currentType,
          items: this.formFields.items
        });
        switch (this.currentType) {
          case 'inputtext':
            this.fieldTypes[i] = Forms.components.TextComponent;
            break;
          case 'inputlocation':
            this.fieldTypes[i] = Forms.components.Location;
            console.log('inputlocation', this.fieldTypes[i]);
            break;
          case 'inputradio':
            this.fieldTypes[i] = Forms.components.RadioForm;
            console.log('inputradio', this.formFields.items[i].items);
            break;
          case 'inputselect':
            this.fieldTypes[i] = Forms.components.SelectComponent;
            break;
          case 'inputmultiselect':
            this.fieldTypes[i] = Forms.components.SelectComponent;
            break;
          case 'inputnumber':
            this.fieldTypes[i] = Forms.components.NumberComponent;
            break;
          case 'inputlookup':
            this.fieldTypes[i] = Forms.components.Lookup;
            break;
          case 'inputlookupalias':
            this.fieldTypes[i] = Forms.components.Alias;
            break;
          case 'inputlookupaliasselect':
            this.fieldTypes[i] = Forms.components.AliasSelect;
            break;
          case 'inputcheckbox':
            this.fieldTypes[i] = Forms.components.Checkbox;
            break;
          case 'inputlocation':
            this.fieldTypes[i] = Forms.components.Location;
            break;
          case 'text':
            this.fieldTypes[i] = Forms.components.HeaderComponent;
            break;
          case 'inputformula':
            this.fieldTypes[i] = Forms.components.Formula;
            break;
          case 'inputdate':
            this.fieldTypes[i] = Forms.components.DateComponent;
            break;
          case 'inputimage':
            this.fieldTypes[i] = Forms.components.Photo;
            break;
          case 'inputsignature':
            this.fieldTypes[i] = Forms.components.Signature;
            break;
          case 'inputmultiselect':
            this.fieldListType[i] = Forms.components.SelectComponent
            break;
          case 'inputlist':
            this.fieldTypes[i] = Forms.components.MainListComponent;
            console.log('inputlist', this.fieldTypes[i]);
            for (let j = 0; j < this.formFields.items[i].template.length; j++) {
              this.dependantType = this.formFields.items[i].template[j].type;
              this.dependantListTypes.push(Forms.components);
              console.log('dependant types1', this.dependantType);
              switch (this.dependantType) {
                case 'inputtext':
                  this.dependantListTypes[j] = Forms.components.TextComponent;
                  break;
                case 'inputnumber':
                  this.dependantListTypes[j] = Forms.components.NumberComponent;
                  break;
                case 'inputlookup':
                  this.dependantListTypes[j] = Forms.components.Lookup;
                  break;
                case 'inputdate':
                  this.dependantListTypes[j] = Forms.components.DateComponent;
                  break;
                case 'inputcheckbox':
                  this.dependantListTypes[j] = Forms.components.Checkbox;
                  break;
                case 'inputradio':
                  this.dependantListTypes[j] = Forms.components.RadioForm;
                  break;
                case 'text':
                  this.dependantListTypes[j] = Forms.components.HeaderComponent;
                  break;
                case 'inputlookupalias':
                  this.dependantListTypes[j] = Forms.components.Alias;
                  break;
                case 'inputimage':
                  this.dependantListTypes[j] = Forms.components.Photo;
                  break;
                case 'inputselect':
                  this.dependantListTypes[j] = Forms.components.SelectComponent;
                  break;
                case 'inputlist':
                  this.dependantList = true;
                  console.log('in the second list');
                  this.dependantListTypes[j] = Forms.components.MainListComponent;
                  for (let k = 0; k < this.formFields.items[i].template[j].template.length; k++) {
                    this.deepDependantType = this.formFields.items[i].template[j].template[k].type;
                    this.deepDependantListFieldTypes.push(Forms.components);
                    console.log('the whole array',this.deepDependantListFieldTypes);
                    console.log('dependant types2', this.deepDependantType);
                    console.log(this.formFields.items[i].template[j].template);

                    console.log('the deep one',this.deepDependantType);
                    switch (this.deepDependantType) {
                      case 'inputtext':
                        this.deepDependantListFieldTypes[k] = Forms.components.TextComponent;
                        break;
                      case 'inputnumber':
                        this.deepDependantListFieldTypes[k] = Forms.components.NumberComponent;
                        break;
                      case 'inputlookup':
                        this.deepDependantListFieldTypes[k] = Forms.components.Lookup;
                        break;
                      case 'inputdate':
                        this.deepDependantListFieldTypes[k] = Forms.components.DateComponent;
                        break;
                      case 'inputcheckbox':
                        this.deepDependantListFieldTypes[k] = Forms.components.Checkbox;
                        break;
                      case 'inputradio':
                        this.deepDependantListFieldTypes[k] = Forms.components.RadioForm;
                        break;
                      case 'text':
                        this.deepDependantListFieldTypes[k] = Forms.components.HeaderComponent;
                        break;
                      case 'inputlookupalias':
                        this.deepDependantListFieldTypes[k] = Forms.components.Alias;
                        break;
                      case 'inputimage':
                        this.deepDependantListFieldTypes[k] = Forms.components.Photo;
                        break;
                      case 'inputselect':
                        this.deepDependantListFieldTypes[k] = Forms.components.SelectComponent;
                        break;
                    }
                  }
                  break;

              }
            }
            break;
          case 'inputrepeat':
            this.fieldTypes[i] = Forms.components.MainRepeater;
            for (let k = 0; k < this.formFields.items[i].items.length; k++) {
              console.log(this.formFields.items[i].items[k]);
              this.dependantRepeaterType = this.formFields.items[i].items[k].type;
              this.dependantRepeaterTypes.push(Forms.components);
              console.log(this.fieldTypes);
              switch (this.dependantRepeaterType) {
                case 'inputtext':
                  this.dependantRepeaterTypes[k] = Forms.components.TextComponent;
                  console.log('repeater', this.dependantRepeaterTypes);
                  break;
                case 'inputnumber':
                  this.dependantRepeaterTypes[k] = Forms.components.NumberComponent;
                  console.log('repeater', this.dependantRepeaterTypes);
                  break;
                case 'inputlookup':
                  this.dependantRepeaterTypes[k] = Forms.components.Lookup;
                  console.log('repeater', this.dependantRepeaterTypes);
                  break;
                case 'inputcheckbox':
                  this.dependantRepeaterTypes[k] = Forms.components.Checkbox;
                  console.log('repeater', this.dependantRepeaterTypes);
                  break;
                case 'inputradio':
                  this.dependantRepeaterTypes[k] = Forms.components.RadioForm;
                  console.log('repeater', this.dependantRepeaterTypes);
                  break;
                case 'inputdate':
                  this.dependantRepeaterTypes[k] = Forms.components.DateComponent;
                  console.log('repeater', this.dependantRepeaterTypes);
                  break;
                case 'inputlookupalias':
                  this.dependantRepeaterTypes[k] = Forms.components.Alias;
                  console.log('repeater', this.dependantRepeaterTypes);
                  break;
                case 'inputimage':
                  this.dependantRepeaterTypes[k] = Forms.components.Photo;
                  console.log('repeater', this.dependantRepeaterTypes);
                  break;
                case 'text':
                  this.dependantRepeaterTypes[k] = Forms.components.HeaderComponent;
                  console.log('repeater', this.dependantRepeaterTypes);
                  break;
                case 'inputselect':
                  this.dependantRepeaterTypes[k] = Forms.components.SelectComponent;
                  break;
                case 'inputmultiselect':
                  this.dependantRepeaterTypes[k] = Forms.components.SelectComponent;
                  break;
                case 'inputsignature':
                  this.dependantRepeaterTypes[k] = Forms.components.Signature;
                  break;
              }
            }
            break;
        }
      }
    }
  },
  computed: {
    buildArray() {
      return this.$store.getters.translatedForm;
    },
    fields() {
      return this.$store.getters.fields;
    },
    ...mapGetters({
      user: "user",
      formItems: 'getFormItems',
      builder: 'getBuildingBlocks',
      formVuex: 'getForm'
    })
  },
  mounted() {
    this.clientFromDB()
    this.formsFromFirebase()
  }
}
</script>

<style lang="scss">
@import "~bulma";

.samsung{
  background: url(assets/iphone5s_portrait.svg) center no-repeat;
  background-size: contain;
  height: 762px;
  width: 366px;
  float: right;
  bottom: 0;
  position: sticky;
  position: -webkit-sticky; /* Safari */

}
.inside {
  width: 320px;
  height: 570px;
  overflow-y: scroll;
  position: relative;
  margin-left: 30px;
  top: 95px;

}
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
}
</style>
