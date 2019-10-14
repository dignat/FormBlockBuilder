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
                <component ref="form" :is="changedRules ? currentFieldType : fieldsType"
                           :fieldListType="listFieldType" :list="list" :dependantTypes="dependantTypes" :repeaterTypes="repeaterTypes" :repeaterType="repeaterType"
                           :transformList="transformList" :translatedList="transformedFields"
                            :hasList="hasList"
                           :listFields="changedRules ? currentProps: transformedFields">
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
                <button class="button is-primary" @click="changedRules ? editField(currentProps) : editField(transformedFields)">Edit all Fields</button>
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
                changedRules: false,
                translatedType: null
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
                console.log(this.currentProps)
            },
            handleChange(type) {
                console.log(type);
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
                        break;
                    case 'inputtext':
                        this.currentFieldType = TextComponent;
                        this.changedRules = true;
                        this.transform ? this.transformedFields !== undefined ? this.sendTheEditFields(this.transformedFields.name) : '' : this.currentProps !== undefined ? this.sendTheEditFields(this.currentProps.name) : '';
                        break;
                    case 'inputrepeat':
                        this.currentFieldType = MainRepeater;
                        this.changedRules = true;
                        break;
                    case 'inputlookupalias':
                        this.currentFieldType = Alias;
                        this.changedRules = true;
                        break;
                    case 'inputnumber':
                        this.currentFieldType = NumberComponent;
                        this.changedRules = true;
                        this.transform ? this.transformedFields !== undefined ? this.sendTheEditFields(this.transformedFields.name) : '' : this.currentProps !== undefined ? this.sendTheEditFields(this.currentProps.name) : '';
                        break;
                    case 'inputradio':
                        this.currentFieldType = RadioForm;
                        this.changedRules = true;
                        break;
                    case 'inputselect':
                        this.currentFieldType = SelectComponent;
                        this.changedRules = true;
                        break;
                    case 'inputlist':
                        this.currentFieldType = MainListComponent;
                        this.changedRules = true;
                        break;
                    case 'inputcheckbox':
                        this.currentFieldType = Checkbox;
                        this.changedRules = true;
                        break;
                    case 'inputimage':
                        this.currentFieldType = Photo;
                        this.changedRules = true;
                        break;
                    case 'inputsignature':
                        this.currentFieldType = Signature;
                        this.changedRules = true;
                        break;
                    case 'inputformula':
                        this.currentFieldType = Formula;
                        this.changedRules = true;
                        break;
                    case 'inputdate':
                        this.currentFieldType = DateComponent;
                        this.changedRules = true;
                        break;
                    case 'inputlocation':
                        this.currentFieldType = Location;
                        this.changedRules = true;
                        break;
                    case 'text':
                        this.currentFieldType = HeaderComponent;
                        this.changedRules = true;
                        break;
                    case 'inputlookupaliasselect':
                        this.currentFieldType = AliasSelect;
                        this.changedRules = true;
                        break;

                }
            }
        },
        beforeMount() {
            this.currentFieldType  = this.fieldsType;
            this.transform = this.transformList;
            this.translatedType = this.radio;
            this.currentType = this.radio;
            this.transformedFields = this.translatedList;
        }
    }
</script>

<style scoped>

</style>