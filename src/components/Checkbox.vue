<template>
    <div class="section">
        <div class="control">
            <label class="label">Title for Checkbox</label>
            <input class="input" type="text" name="title" :listFields="listFields.title" v-model="fields.title">
            <label class="label">Name for Checkbox</label>
            <input class="input" type="text" name="name" :listFields="listFields.name" v-model="fields.name">
            <label class="label">Checkbox Required?</label>
            <input class="checkbox" type="checkbox" name="required" :listFields="listFields.required" v-model="fields.required">
            <label class="label">Checkbox Hidden?</label>
            <input class="checkbox" name="hidden" type="checkbox" :listFields="listFields.hidden" v-model="fields.hidden">
        </div>
    </div>
    
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: "Checkbox",
        props: {
            listFields: Object
        },
        data () {
            return {
                fields: {
                    type: "inputcheckbox",
                    title: '',
                    name: '',
                    required: 0,
                    hidden: 0
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
                    type: "inputcheckbox",
                    title: this.fields.title,
                    name: this.fields.name === "" ? this.fields.name = this.fields.title.replace(/[\s,&\-/_?():]/g,"").toLowerCase() : this.fields.name,
                    required: this.fields.required,
                    hidden: this.fields.hidden
                };
                this.toAddField(fields);
                return fields;
            },
            editField() {
                this.fields.name === "" ? this.fields.name = this.fields.title.replace(/[\s,&\-/_?():]/g,"").toLowerCase() : this.fields.name;
                this.toEditField(this.fields);
                return this.fields;
            }
        },
    }
</script>

<style scoped>

</style>