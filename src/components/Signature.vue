<template>
    <div class="section">
        <div class="field">
            <div class="control">
                <label class="label">Title for Signature</label>
                <input type="text" name="title" class="input" :listFields="listFields.title" v-model="fields.title">
                <label class="label">Name for Signature</label>
                <input class="input" name="name" type="text" :listFields="listFields.name" v-model="fields.name">
                <label class="label">Statement</label>
                <input class="input" name="statement" type="text" :listFields="listFields.statement" v-model="fields.statement">
                <label class="label">Min</label>
                <input class="label" type="text" name="max" :listFields="listFields.max" v-model="fields.max">
                <label class="label">Min</label>
                <input class="label" type="text" name="min" :listFields="listFields.min" v-model="fields.min">
                <label class="label">Hidden Signature?</label>
                <input class="checkbox" name="hidden" type="checkbox"  :listFields="listFields.hidden" v-model="fields.hidden">
            </div>
        </div>
    </div>
    
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: "Signature",
        props: {
            listFields: Object
        },
        data () {
            return {
                fields: {
                    type: "inputsignature",
                    title: '',
                    name: '',
                    min: 0,
                    max: 0,
                    hidden: 0,
                    statement: ''
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
                    type: "inputsignature",
                    title: this.fields.title,
                    name: this.fields.name === "" ? this.fields.name = this.fields.title.replace(/[\s,&\-/_?():]/g,"").toLowerCase() : this.fields.name,
                    min: this.fields.min,
                    max: this.fields.max,
                    hidden: this.fields.hidden,
                    statement: this.fields.statement
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