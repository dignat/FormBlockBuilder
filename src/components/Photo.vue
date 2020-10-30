<template>
    <div class="section">
        <div class="field">
            <div class="control">
                <label class="label">Title for Photo</label>
                <input class="input" name="title" type="text" :listFields="listFields.title" v-model="fields.title">
                <label class="label">Choose slices from title to generate name ( ex. 0,1,2 - start from 0)</label>
                <input class="input" type="text"  v-model="slices">
                <label class="label">Name for Photo</label>
                <input class="input" name="name" type="text" :listFields="listFields.name" v-model="fields.name">
                <label class="label">Source for Photo</label>
                <input class="input" name="source" type="number" :listFields="listFields.source" v-model="fields.source">
                <label class="label">Photo Required?</label>
                <input class="checkbox" type="checkbox" name="required" :listFields="listFields.required" v-model="fields.required">
                <label class="label">Photo Hidden?</label>
                <input class="checkbox" name="hidden" type="checkbox" :listFields="listFields.hidden" v-model="fields.hidden">
                <label class="label">Photo Width?</label>
                <input class="number" name="width" type="number" :listFields="listFields.width" v-model="fields.width">
            </div>
        </div>
    </div>
    
</template>

<script>
    import {mapActions} from 'vuex'
    import {mapGetters} from 'vuex'
    import appMixin from "../mixins";

    export default {
        name: "Photo",
        mixins: [appMixin],
        props: {
            listFields: Object
        },
        data () {
            return {
                slices: '',
                fields: {
                    type: 'inputimage',
                    title: '',
                    name: '',
                    hidden: 0,
                    required: 0,
                    source: 0,
                    width: 50
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
                        type: 'inputimage',
                        title: this.fields.title,
                        name: this.fields.name === "" ? this.fields.name = this.nameGenerator(this.fields.title,this.slices.length > 0 ? this.slices.split(',') : []) : this.fields.name,
                        hidden: this.fields.hidden,
                        required: this.fields.required,
                        source: this.fields.source,
                        width: this.fields.width
                };
                this.toAddField(fields);
                return fields;
            },
            editField() {
                const editedFields = {
                    type: 'inputimage',
                    title: this.fields.title,
                    name: this.fields.name,
                    hidden: this.fields.hidden,
                    required: this.fields.required,
                    source: this.fields.source,
                    width: this.fields.width
                };
                this.toEditField(editedFields);
                return editedFields;
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