<template>
    <div class="section">
        <div class="field">
            <label class="label">Routes ?</label>
            <div class="control">
                <input class="checkbox" type="checkbox" v-model="routes" @change="clearField">
            </div>
            <label class="label"> Name For Lookup</label>
            <div class="control">
                <input class="input" type="text" :listFields="listFields.name" v-model="fields.name">
            </div>
            <label class="label"> Title For Lookup</label>
            <div class="control">
                <input class="input" type="text" :listFields="listFields.title"  v-model="fields.title">
            </div>
            <label class="label"> Label Field For Lookup</label>
            <div class="control">
                <input class="input" type="text" :listFields="listFields.labelKey" v-model="fields.labelKey">
            </div>
            <label class="label"> Uri Field For Lookup</label>
            <div class="control">
                <input class="input" type="text" :listFields="listFields.uri" v-model="fields.uri">
            </div>
            <label class="label"> Id Key Field For Lookup</label>
            <div class="control">
                <input class="input" type="text" :listFields="listFields.idKey" v-model="fields.idKey">
            </div>
            <label class="label">Multi ?</label>
            <div class="control">
                <input class="checkbox" type="checkbox" name="multi" v-model="fields.multi">
            </div>
        </div>
    </div>


</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: "Lookup",
        props: {
            listFields: Object
        },
       data () {
            return {
                routes: false,
                types: ['lookup', 'text', 'alias'],
                fields: {
                    type: 'inputlookup',
                    title: '',
                    name: '',
                    uri: '',
                    labelKey: '',
                    idKey: '',
                    multi: false
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
                    type: "inputlookup",
                    title: this.fields.title,
                    name: this.fields.name === "" ? this.fields.title.replace(/[\s,&-/_?():.]/g,"").toLowerCase().substring(0,7) : this.fields.name,
                    uri: this.fields.uri = this.routes ? '/v1/api/' + this.fields.uri : '/reflow/data/sync/lookup/' + this.fields.uri,
                    labelKey: this.fields.labelKey,
                    idKey: this.fields.idKey,
                    multi: this.fields.multi
                };
                this.toAddField(fields);
                return fields;
            },
            clearField() {
               this.fields.uri = this.fields.uri.replace(this.fields.uri, '');
            },
            editField() {
                    this.fields.name === "" ? this.fields.title.replace(/[\s,&-/_?():.]/g,"").toLowerCase().substring(0,7) : this.fields.name,
                    this.fields.uri = this.routes ? '/v1/api/' + this.fields.uri : '/reflow/data/sync/lookup/' + this.fields.uri,
                    this.toEditField(this.fields);
                return this.fields;
            }
        }
    }

</script>

<style scoped>


</style>