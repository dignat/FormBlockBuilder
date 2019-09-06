<template>
    <div class="section">
        <div class="field">
            <label class="label">Routes ?</label>
            <div class="control">
                <input class="checkbox" type="checkbox" v-model="routes">
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
                    name: '',
                    title: '',
                    uri: '',
                    labelKey: '',
                    idKey: '',
                    multi: false
                }
            }
       },
        methods: {
            addField() {
                Object.assign({}, {title: '', name: '', uri: '', labelKey: '', idKey: ''});
                this.fields.uri = this.routes ? '/v1/api/' + this.fields.uri : '/reflow/data/sync/lookup/' + this.fields.uri;
                return this.fields;
            },
            editField(fields) {
                fields.uri = '/v1/api/' + fields.uri;
                this.fields = fields;
                return this.fields;
            }
        },
        beforeMount() {
            this.fields = this.listFields;
            this.fields.type = 'inputlookup';
        }
    }

</script>

<style scoped>


</style>