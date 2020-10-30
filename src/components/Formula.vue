<template>
    <div class="section">
        <div class="field">
            <div class="control">
                <label class="label">Title for Formula</label>
                <input class="input" name="title" type="text" :listFields="listFields.title" v-model="fields.title">
                <label class="label">Name for Formula</label>
                <input class="input" name="name" type="text" :listFields="listFields.name" v-model="fields.name">
                <label class="label">Script</label>
                <input class="input" name="script" type="text" :listFields="listFields.script" v-model="fields.script">
                <label class="label">Hidden Formula?</label>
                <input class="checkbox" name="hidden" type="checkbox" :listFields="listFields.hidden" v-model="fields.hidden">
                <label class="label">Required Formula?</label>
                <input class="checkbox" name="required" type="checkbox" :listFields="listFields.required" v-model="fields.required">
                <label class="label">Store Formula?</label>
                <input class="checkbox" name="required" type="checkbox" :listFields="listFields.store" v-model="fields.store">
                <label class="label">Generate Formula?</label>
                <input class="checkbox" name="required" type="checkbox" v-model="generateFormula">
            </div>
            <div class="control" v-if="generateFormula">
                <label class="label">Select  type of Formula</label>
                <div class="select is-fullwidth">
                    <select class="select" v-model="selectedFormula">
                        <option v-for="formula in formulas" :value="formula">{{ formula.type }}</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="control" v-if="selectedFormula.type === 'hide' && generateFormula">
            <label class="label">Field Names</label>
            <div class="select is-fullwidth">
                <select class="select" v-model="selectedName">
                    <option v-for="(element, index) in list.items !== undefined ? list.items : list.template" :key="index" :value="element.name" :fieldName="element.name">{{ element.name }} </option>
                </select>
            </div>
            <div class="select is-primary is-fullwidth" style="background: white;" @click="Show=!Show" >
                <label class="label">To Hide Field</label>
            </div>
            <div  style="background: white; padding: 5px;" v-for="element in list.items !== undefined ? list.items : list.template"  :fieldName=" element.name" v-if="Show">
                <input type="checkbox" class="checkbox is-fullwidth" :value="element.name" v-model="checked" :disabled="element.name === selectedName"/>
                <span>{{ element.name }}</span>
            </div>


            <label class="label">Select Type of Controller Field</label>
            <div class="select is-fullwidth">
                <select class="select" v-model="selected">
                <option v-for="element in types" :value="element" >{{ element.type }}</option>
                </select>
            </div>
            <div class="control">
                <button class="button is-primary" @click="generateHide(fields.name, selected.type, selectedName, checked.join(','))">Generate Script</button>
            </div>
        </div>

    </div>
    
</template>

<script>
    import {mapActions} from 'vuex'
    import {mapGetters} from 'vuex'
    import Select from "./Select";

    export default {
        name: "Formula",
        components: {Select},
        props: {
            listFields: Object,
            list: Object
        },
        data () {
            return {
                checked:[],
                Show: false,
                generateFormula: false,
                selected: {},
                selectedName: {},
                selectedFormula: {},
                types: [{'type':'string'}, {'type':'number'}],
                formulas: [{'type': 'hide'},{'type': 'calculate'}],
                fields: {
                    type: "inputformula",
                    title: '',
                    name: '',
                    hidden: 0,
                    script: 'form=GetForm();',
                    store: 0,
                    required: 0
                }
            }
        },
        methods: {
            ...mapActions({
                toAddField: 'addField',
                toEditField: 'editField',
              toDeleteField: 'deleteField'
            }),
            ...mapGetters(['getTransform','getRules']),
            generateHide(type, typeOfControllerField, controllerField, fieldToHide) {
              console.log(this.listFields)
                switch(typeOfControllerField) {
                    case 'string':
                        this.fields.script = `form=GetForm();result=form.GetStringValue('${controllerField}');if (result == 'Yes'){form.SetDisplay('${fieldToHide}',1);}else{form.SetDisplay('${fieldToHide}',0);}`;
                    break;
                    case 'number':
                        this.fields.script = `form=GetForm();result=form.GetValue('${controllerField}');if (result > 0){form.SetDisplay('${fieldToHide}',1);}else{form.SetDisplay('${fieldToHide}',0);}`;
                    break;
                }
            },
            addField() {
                const fields = {
                    type: "inputformula",
                    title: this.fields.title,
                    name: this.fields.name,
                    hidden: this.fields.hidden,
                    script: this.fields.script,
                    required: 0,
                    store: this.fields.store
                };
                this.toAddField(fields);
                return fields;
            },
            editField() {
                const editFields = {
                    type: "inputformula",
                    title: this.fields.title,
                    name: this.fields.name,
                    hidden: 0,
                    script: this.fields.script,
                    required: 0,
                    store: 0
                };
                this.toEditField(editFields);
                return editFields;
            },
          deleteField() {
            this.toDeleteField(this.fields);
            return this.fields;
          }
        },
        beforeMount() {
            if (this.getTransform() && !this.getRules()) {
                this.fields = this.listFields;
            }
        },
    }
</script>

<style scoped>

</style>