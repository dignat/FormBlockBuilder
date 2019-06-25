<template>
    <div class="section">
        <div class="field">
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

                types: ['lookup', 'text', 'alias'],
                fields: {
                    type: 'inputlookup',
                    name: '',
                    title: '',
                    uri: '',
                    labelKey: '',
                    idKey: ''
                }
            }
       },
        methods: {
            addField() {
                Object.assign({}, {title: '', name: '', uri: '', labelKey: '', idKey: ''});
                this.fields.uri = '/reflow/data/sync/lookup/' + this.fields.uri;
                return this.fields;
            },
        },
        beforeMount() {
            this.fields = this.listFields;
            this.fields.type = 'inputlookup';
        }
    }

</script>

<style scoped>


</style>