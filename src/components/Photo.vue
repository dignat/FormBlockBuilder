<template>
    <div class="section">
        <div class="field">
            <div class="control">
                <label class="label">Title for Photo</label>
                <input class="input" name="title" type="text" :listFields="listFields.title" v-model="fields.title">
                <label class="label">Name for Photo</label>
                <input class="input" name="name" type="text" :listFields="listFields.name" v-model="fields.name">
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
    export default {
        name: "Photo",
        props: {
            listFields: Object
        },
        data () {
            return {
                fields: {
                    type: 'inputimage',
                    title: '',
                    name: '',
                    hidden: 0,
                    required: 0,
                    source: '',
                    width: 50
                }
            }
        },
        methods: {
            ...mapActions({
                toAddField: 'addField',
                toEditField: 'editField'
            }),
            addField() {
                const fields = {
                        type: 'inputimage',
                        title: this.fields.title,
                        name: this.fields.name,
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
            }
        }
    }
</script>

<style scoped>

</style>