<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <div class="field">
          <h1>Form Fields</h1>
          <label class="label">Form Title</label>
          <input class="input" type="text" name="title" v-model="formFields.title">
        </div>
        <div class="field">
          <label class="label">Form Name</label>
          <input class="input" type="text" name="name" v-model="formFields.name">
        </div>
        <div class="field" v-if="!transform">
          <Forms ref="form" v-for="(field, index) in buildFields" :id="index"
                  :transformList="transform" :list="formFields"
                 :key="index" :type="field.type" @addFields="sync" @editFields="edit">
          </Forms>
        </div>
        <div class="field" v-if="transform">
          <Forms :fieldsType="changingRules? currentFieldType: fieldTypes[index]" ref="form"
                 v-for="(field, index) in buildFields" :radio="field.type" :listType="dependantType" :repeaterType="dependantRepeaterType" :repeaterTypes="dependantRepeaterTypes"
                 :transformList="transform" :list="formFields" :key="index" :changeRules="changingRules" :listFieldTypes="dependantTypes" :dependant-list-types="dependantListFieldTypes" :has-list="dependantList"
                 :translatedList="formFields.items[index]" @addFields="sync" @editFields="edit"></Forms>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-primary" @click="addTypeFields">Add Fields To Form</button>
          </div>
          <div class="control ">
            <button class="button is-primary" @click="removeFields()">Remove Fields From Form</button>
          </div>
          <div class="control">
            <button class="button is-danger" @click="generateForm">Generate</button>
          </div>
          <div class="control">
            <button class="button is-danger" @click="translateForm()">Translate Form</button>
          </div>
        </div>

        <div class="section">
          <div class="field">
            <div class="control">
              <label class="label">Json Form</label>
                <textarea class="textarea is-primary" rows="40" cols="255">{{JSON.stringify(this.formFields, null, '\t')}}</textarea>
            </div>
          </div>
        </div>
        <div class="section">
          <textarea v-model="existingForm"></textarea>
        </div>

      </div>
      </section>
  </div>
</template>

<script>

 import Forms from './components/Forms'


  export default {
    name: 'App',
    components: {
      Forms
    },
    data () {
      return {
        transform: false,
        buildFields: [],
        tempFields: {},
        buildOfTranslate: [],
        currentFieldType: null,
        currentType: "",
        dependantType: "",
        dependantRepeaterType: "",
        currentProps: {},
        changingRules: false,
        fieldTypes: [],
        dependantTypes: [],
        dependantListFieldTypes: [],
        dependantListType: "",
        dependantRepeaterTypes: [],
        dependantList: false,
        existingForm: {
          title: '',
          type: 'form',
          name: '',
          uri: '',
          items: []
        },
        count: 0,
        formFields: {
          title: '',
          type: 'form',
          name: '',
          uri: '',
          items: []
        }
      }
    },
    methods: {
      sync (value) {
        this.formFields.items.push(value)
      },
      edit (value) {
        console.log(value, 'in the app');
        this.formFields.items.pop();
        this.formFields.items.push(value)
      },
      removeFields () {
        this.formFields.items.pop();
      },
      addTypeFields() {
        this.changingRules = true;
        console.log(this.changingRules);
        this.buildFields.push({
          id: this.count++,
          type: this.currentType,
        });
      },
      generateForm() {
        Object.assign({}, {title: '', name: '', type: 'form'});
        this.formFields.name = this.formFields.title.replace(/\s/g, "");
        this.formFields.uri = '/reflow/data/update/form/' + this.formFields.name;
        console.log(JSON.stringify(this.formFields))
      },
      translateForm() {
        this.transform = true;
        this.formFields = JSON.parse(this.existingForm);
        //this.buildOfTranslate = this.formFields.items;

        for (let i = 0; i < this.formFields.items.length; i++) {
          this.currentType =  this.formFields.items[i].type;
          this.fieldTypes.push(Forms.components)
          this.buildFields.push({
            id: this.count++,
            type: this.currentType,
            items: this.formFields.items[i]
          });
          switch (this.currentType) {
            case 'inputtext':
              this.fieldTypes[i] = Forms.components.TextComponent;
              console.log('inputtext',this.fieldTypes[i])
              break;
            case 'inputlocation':
              this.fieldTypes[i] = Forms.components.Location;
              console.log('inputlocation', this.fieldTypes[i])
              break;
            case 'inputradio':
              this.fieldTypes[i] = Forms.components.RadioForm
                    console.log('inputradio', this.formFields.items[i].items)
              break;
            case 'inputselect':
              this.fieldTypes[i] = Forms.components.SelectComponent
              break;
            case 'inputnumber':
              this.fieldTypes[i] = Forms.components.NumberComponent
              break;
            case 'inputlist':
              this.fieldTypes[i] = Forms.components.MainListComponent;
              console.log('inputlist', this.fieldTypes[i]);
                    for (let j = 0; j < this.formFields.items[i].template.length; j++) {
                      this.dependantType = this.formFields.items[i].template[j].type;
                      console.log('dependant types1', this.dependantType);
                      switch (this.dependantType) {
                        case 'inputtext':
                          this.dependantTypes[j] = Forms.components.TextComponent;
                          break;
                        case 'inputnumber':
                          this.dependantTypes[j] = Forms.components.NumberComponent
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
                    console.log('repeater', this.dependantRepeaterTypes, this.dependantRepeaterType)
                  break;
              }
            }
              break;
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "~bulma";
</style>
