<template>
        <div class="field">
            <div class="control">
            <Radios :types="types" :radio="transform ? translatedRepeaterType: changedRules ? currentType : translatedRepeaterType" @change="handleChange"/>
        </div>
            <div class="control" v-if="!transform">
                <component ref="form" :type="currentType" :is="currentFieldType" :props="currentProps" :listFields="currentRepeaterFields" :list="list"></component>
            </div>
            <div v-if="transform" class="control">
                <component ref="form"
                           :is="changedRules ? currentFieldType: translatedFieldType" :props="currentProps" :changeRules="changeRules"
                           :listFields="changeRules ? currentRepeaterFields : transformedFields"></component>
            </div>
            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-info" @click="addField">Add Repeater Fields</button>
                </div>
                <div class="control">
                    <button class="button is-primary" @click="editField">Edit Repeater Fields</button>
                </div>
                <div class="control">
                    <button class="button is-primary" @click="deleteField">Delete Repeater Fields</button>
                </div>
            </div>
        </div>
</template>

<script>
    import Lookup from './Lookup';
    import Radios from "./Radios";
    import TextComponent from "./TextComponent"
    import Number from "./Number"
    import Alias from "./Alias"
    import Select from "./Select"
    import RadioForm from "./RadioForm"
    import Checkbox from "./Checkbox"
    import Photo from "./Photo"
    import Signature from "./Signature"
    import Formula from "./Formula"
    import DateComponent from './DateComponent'
    import MainRepeater from './MainRepeater'
    import Duration from "./Duration"
    import Header from "./HeaderComponent"
    export default {
        name: "Repeater",
        props: {
          list: Object,
            listFields: Object,
            transformList: Boolean,
            changeRules: Boolean,
            radio: String,
            repeaterType: String,
            repeaterFieldType: Object
        },
        components: {
            Radios,
            Lookup,
            TextComponent,
            Number,
            Alias,
            Select,
            RadioForm,
            Photo,
            Signature,
            Formula,
            MainRepeater,
            Duration,
            Header
        },
        data () {
            return {
                types: ['inputlookup', 'inputtext', 'inputlookupalias','inputnumber', 'inputselect', 'inputradio', 'inputcheckbox', 'inputimage', 'inputsignature', 'inputformula','inputdate', 'inputrepeat','inputduration','text'],
                currentFieldType: null,
                currentType: null,
                currentProps: {},
                translatedFieldType: null,
                currentRepeaterFields: {},
                transformedFields: {},
                translatedRepeaterType: '',
                transform: null,
                changedRules: false,
            }
        },
        methods: {
            addField() {
                this.currentRepeaterFields = this.$refs.form.addField();
                this.$emit('addRepeater', this.currentRepeaterFields);
            },
            editField () {
              this.currentRepeaterFields = this.$refs.form.editField();
              if (this.transform) {
                  console.log(this.transformedFields);
                  this.$emit('editRepeater', this.transformedFields);
              } else {
                  console.log(this.currentRepeaterFields)
                  this.$emit('editRepeater', this.currentRepeaterFields);
              }
            },
            deleteField() {
                this.currentRepeaterFields = this.$refs.form.deleteField();
                this.$emit('deleteRepeater', this.currentRepeaterFields);
            },

            handleChange(type) {
              this.changedRules = true;
              console.log(this.changedRules, type);
                switch(type) {
                    case 'inputlookup':
                        this.currentFieldType = Lookup;
                        this.currentType = type;
                        this.currentRepeaterFields = {};
                        break;
                    case 'inputtext':
                        this.currentFieldType = TextComponent;
                        this.currentType = type;
                        this.currentRepeaterFields = {};
                        break;
                    case 'inputnumber':
                        this.currentFieldType = Number;
                        this.currentType = type;
                        this.currentRepeaterFields = {};
                        break;
                    case 'alias':
                        this.currentFieldType = Alias;
                        this.currentType = type;
                        this.currentRepeaterFields = {};
                        break;
                    case 'inputselect':
                        this.currentFieldType = Select;
                        this.currentType = type;
                        this.currentRepeaterFields = {};
                        break;
                    case 'inputradio':
                        this.currentFieldType = RadioForm;
                        this.currentType = type;
                        this.currentRepeaterFields = {};
                        break;
                    case 'inputcheckbox':
                        this.currentFieldType = Checkbox;
                        this.currentType = type;
                        this.currentRepeaterFields = {};
                        break;
                    case 'inputimage':
                        this.currentFieldType = Photo;
                        this.currentType = type;
                        this.currentRepeaterFields = {};
                        break;
                    case 'inputsignature':
                        this.currentFieldType = Signature;
                        this.currentType = type;
                        this.currentRepeaterFields = {};
                        break;
                    case 'inputformula':
                        this.currentFieldType = Formula;
                        this.currentType = type;
                        this.currentRepeaterFields = {};
                        break;
                    case 'inputdate':
                        this.currentFieldType = DateComponent;
                        this.currentType = type;
                        this.currentRepeaterFields = {};
                        break;
                    case 'inputrepeat':
                        this.currentFieldType = MainRepeater;
                        this.currentType = type;
                        this.currentRepeaterFields = {};
                        break;
                    case 'inputlookupalias':
                        this.currentFieldType = Alias;
                        this.currentType = type;
                        this.currentRepeaterFields = {};
                        break;
                    case 'inputduration':
                        this.currentFieldType = Duration;
                        this.currentType = type;
                        this.currentRepeaterFields = {};
                        break;
                      case 'text':
                        this.currentFieldType = Header;
                        this.currentType = type;
                        this.currentRepeaterFields = {};
                        break;

                }
            }
        },
        beforeMount() {
            this.currentType = this.radio;
            this.transform = this.transformList;
            this.changedRules = this.changeRules;
            this.translatedRepeaterType = this.repeaterType;
            this.translatedFieldType = this.repeaterFieldType;
            this.transformedFields = this.listFields;
        }
    }
</script>

<style scoped>

</style>