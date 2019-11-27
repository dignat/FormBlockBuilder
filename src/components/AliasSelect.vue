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
                <label class="label">Alias Select Key</label>
                <input class="checkbox" type="checkbox" name="selectKey" v-model="fields.selectKey">
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
    import {mapActions} from 'vuex'
    import {mapGetters} from 'vuex'
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
                    selectKey: '',
                    idKey: '',
                    multi: 0,
                }
            }

        },
        methods : {
            ...mapActions({
                toAddField: 'addField',
                toEditField: 'editField'
            }),
            ...mapGetters(['getTransform','getRules']),
            addField() {
                const fields = {
                    type: 'inputlookupaliasselect',
                    name: this.fields.name === "" ? this.fields.name = this.fields.title.replace(/[\s,&\-/_?():]/g,"").toLowerCase() : this.fields.name,
                    title: this.fields.title,
                    target: this.fields.target,
                    labelKey: this.fields.labelKey,
                    selectKey: this.fields.selectKey,
                    idKey: this.fields.idKey,
                    multi: this.fields.multi,
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
        beforeMount() {
            if (this.getTransform() && !this.getRules()) {
                this.fields = this.listFields;
            }
        }
    }
</script>

<style scoped>

</style>