<template>
        <div class="field">
            <div class="control">
            <Radios :types="types" :radio="transform ? repeaterType: currentType" @change="handleChange"/>
        </div>
            <div class="control" v-if="!transform">
                <component ref="form" :type="currentType" :is="currentFieldType" :props="currentProps" :listFields="currentRepeaterFields"></component>
            </div>
            <div v-if="transform" class="control">
                <component ref="form" :repeaterTypes="repeaterTypes"
                           :is="changeRules ? currentFieldType: repeaterTypes" :props="currentProps"  :changeRules="changeRules"
                           :listFields="changeRules ? currentRepeaterFields : listFields"></component>
            </div>
            <div class="control">
                <button class="button is-info" @click="addField">Add Repeater Fields</button>
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
    export default {
        name: "Repeater",
        props: {
            listFields: Object,
            transformList: Boolean,
            changeRules: Boolean,
            radio: String,
            repeaterType: String,
            repeaterTypes: Object
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
            Formula
        },
        data () {
            return {
                types: ['inputlookup', 'inputtext', 'inputlookupalias','inputnumber', 'inputselect', 'inputradio', 'inputcheckbox', 'inputimage', 'inputsignature', 'inputformula','inputdate'],
                currentFieldType: null,
                currentType: null,
                currentProps: {},
                currentRepeaterFields: {},
                transformedFields: {},
                transform: null,
                changedRules: false,
            }
        },
        methods: {
            addField() {
                this.currentRepeaterFields = this.$refs.form.addField();
                this.$emit('addRepeater', this.currentRepeaterFields);
            },
            handleChange(type) {
                console.log(type);
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

                }
            }
        },
        beforeMount() {
            this.currentType = this.radio;
            this.currentFieldType  = this.repeaterTypes;
            this.transform = this.transformList;
            this.changedRules = this.changeRules;
            this.repeaterType = this.radio
        }
    }
</script>

<style scoped>

</style>