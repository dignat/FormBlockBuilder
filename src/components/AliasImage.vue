<template>
    <div class="section">
        <div class="field">
            <div class="control">
                <label class="label">Alias Name</label>
                <input class="input" type="text" name="name" v-model="fields.name">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label">Alias Title</label>
                <input class="input" type="text" name="title" v-model="fields.title">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label">Alias Target</label>
                <input class="input" type="text" name="target" v-model="fields.target">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label">Alias Label Key</label>
                <input class="input" type="text" name="labelKey" v-model="fields.labelKey">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label">Alias Id Key</label>
                <input class="input" type="text" name="idKey" v-model="fields.idKey">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label">Alias Format</label>
                <input class="input" type="text" name="format" v-model="fields.format">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label">Alias Enabled</label>
                <input class="checkbox" type="checkbox" name="custom" v-model="fields.custom">
            </div>
        </div>

    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: "AliasImage",
        props: {
            listFields: Object
        },
        data () {
            return {
                fields: {
                    type: 'inputlookupaliasimage',
                    name: '',
                    title: '',
                    target: '',
                    labelKey: '',
                    idKey: '',
                    format: '',
                    custom: 0


                }
            }
        },
        methods: {
            ...mapActions({
                toAddField: 'addField',
                toEditField: 'editField'
            }),
            addField () {
                const fields = {
                    type: 'inputlookupaliasimage',
                    name: this.fields.name === "" ? this.fields.name = this.fields.title.replace(/[\s,&\-/_?():]/g,"").toLowerCase() : this.fields.name,
                    title: this.fields.title,
                    target: this.fields.target,
                    labelKey: this.fields.labelKey,
                    idKey: this.fields.idKey,
                    format: this.fields.format,
                    custom: this.fields.custom
                };
                this.toAddField(fields);
                return fields;
            },
            editField() {
                const editFields = {
                    type: 'inputlookupaliasimage',
                    name: this.fields.name === "" ? this.fields.name = this.fields.title.replace(/[\s,&\-/_?():]/g,"").toLowerCase() : this.fields.name,
                    title: this.fields.title,
                    target: this.fields.target,
                    labelKey: this.fields.labelKey,
                    idKey: this.fields.idKey,
                    format: this.fields.format,
                    custom: this.fields.custom
                };
                this.toEditField(editFields);
                return editFields;
            }
        },
    }
</script>

<style scoped>

</style>