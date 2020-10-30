<template>
    <div class="section">
        <div class="field">
            <div class="control">
                <label class="label">Title for Signature</label>
                <input type="text" name="title" class="input" :listFields="listFields.title" v-model="fields.title">
                <label class="label">Choose slices from title to generate name ( ex. 0,1,2 - start from 0)</label>
                <input class="input" type="text"  v-model="slices">
                <label class="label">Name for Signature</label>
                <input class="input" name="name" type="text" :listFields="listFields.name" v-model="fields.name">
                <label class="label">Statement</label>
                <input class="input" name="statement" type="text" :listFields="listFields.statement" v-model="fields.statement">
                <label class="label">Max</label>
                <input class="label" type="text" name="max" :listFields="listFields.max" v-model="fields.max">
                <label class="label">Min</label>
                <input class="label" type="text" name="min" :listFields="listFields.min" v-model="fields.min">
                <label class="label">Hidden Signature?</label>
                <input class="checkbox" name="hidden" type="checkbox"  :listFields="listFields.hidden" v-model="fields.hidden">
                <label class="label">Add Uri to Signature?</label>
                <input class="checkbox" name="hidden" type="checkbox"   v-model="addUri">
                <div v-if="addUri">
                    <label class="label">Uri</label>
                    <input class="label" type="text" name="min" :listFields="listFields.uri" v-model="fields.uri">
                    <label class="label">Id Key</label>
                    <input class="label" type="text" name="min" :listFields="listFields.idKey" v-model="fields.idKey">
                    <label class="label">Label Key</label>
                    <input class="label" type="text" name="min" :listFields="listFields.labelKey" v-model="fields.labelKey">
                </div>

            </div>
        </div>
    </div>
    
</template>

<script>
    import {mapActions} from 'vuex'
    import {mapGetters} from 'vuex'
    import appMixin from '../mixins'
    export default {
        name: "Signature",
        mixins: [appMixin],
        props: {
            listFields: Object
        },
        data () {
            return {
                slices: '',
                addUri: false,
                fields: {
                    type: "inputsignature",
                    title: '',
                    name: '',
                    min: 0,
                    max: 0,
                    hidden: 0,
                    statement: '',
                    uri: '',
                    idKey: '',
                    labelKey: ''
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
            addField() {
                const fields = {
                    type: "inputsignature",
                    title: this.fields.title,
                    name: this.fields.name === "" ? this.fields.name = this.nameGenerator(this.fields.title,this.slices.length > 0 ? this.slices.split(',') : []): this.fields.name,
                    min: this.fields.min,
                    max: this.fields.max,
                    hidden: this.fields.hidden,
                    statement: this.fields.statement
                };
                if (this.addUri) {
                    fields.uri = this.fields.uri;
                    fields.idKey = this.fields.idKey;
                    fields.labelKey = this.fields.labelKey;
                }
                this.toAddField(fields);
                return fields;
            },
            editField() {
                const editFields = {
                    type: "inputsignature",
                    title: this.fields.title,
                    name: this.fields.name === "" ? this.fields.name = this.nameGenerator(this.fields.title,this.slices.length > 0 ? this.slices.split(',') : []) : this.fields.name,
                    min: this.fields.min,
                    max: this.fields.max,
                    hidden: this.fields.hidden,
                    statement: this.fields.statement
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
        }
    }
</script>

<style scoped>

</style>