<template>
    <div class="section">
        <div class="field">
            <div class="control">
                <label class="label">Alias Select Name</label>
                <input class="input" type="text" name="name" v-model="fields.name">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label">Alias Select Title</label>
                <input class="input" type="text" name="title" v-model="fields.title">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label">Alias Select Target</label>
                <input class="input" type="text" name="target" v-model="fields.target">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label">Alias Select Label Key</label>
                <input class="input" type="text" name="labelKey" v-model="fields.labelKey">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label">Alias  Select Id Key</label>
                <input class="input" type="text" name="idKey" v-model="fields.idKey">
            </div>
        </div>

        <div class="field">
            <div class="control">
                <label class="label">Alias Select Enabled</label>
                <input class="checkbox" type="checkbox" name="enabled" v-model="fields.enabled">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label"> Multi</label>
                <input class="checkbox" type="checkbox" name="multi" v-model="fields.multi">
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "AliasSelect",
        props: {
            listFields: Object
        },
        data (){
            return {
                fields: {
                    type: 'inputlookupaliasselect',
                    name: '',
                    title: '',
                    target: '',
                    labelKey: '',
                    idKey: '',
                    multi: false,
                    enabled: false
                }
            }

        },
        methods : {
            addField() {
                Object.assign({}, {title: '', name: '', target: '', labelKey: '', idKey: '', multi: false, enabled: false});
                this.fields.name === "" ? this.fields.title.replace(/[\s,&\-/_?():]/g,"").toLowerCase() : this.fields.name;
                return this.fields;
            }

        },
        beforeMount() {
            this.fields = this.listFields;
            this.fields.type = "inputlookupaliasselect";
        }

    }
</script>

<style scoped>

</style>