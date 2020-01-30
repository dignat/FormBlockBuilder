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
                <input class="checkbox" type="checkbox" :listFields="listFields.multi" name="multi" v-model="fields.multi">
            </div>
            <label class="label">Custom ?</label>
            <div class="control">
                <input class="checkbox" type="checkbox" :listFields="listFields.custom" name="custom" v-model="fields.custom">
            </div>
            <label class="label">Filter ?</label>
            <div class="control">
                <input class="checkbox" type="checkbox" name="filter" v-model="filterPicked">
            </div>
            <div class="control" v-for="filter in fields.filter">
                <input class="input" type="text" name="key"  v-model="filter.key">
                <input class="input" type="text" name="values" v-model="filter.values">
            </div>
        </div>
    </div>


</template>

<script>
    import {mapActions} from 'vuex'
    import {mapGetters} from 'vuex'

    export default {
        name: "Lookup",
        props: {
            listFields: Object
        },
       data () {
            return {
                routes: false,
                filterPicked: false,
                types: ['lookup', 'text', 'alias'],
                fields: {
                    type: 'inputlookup',
                    title: '',
                    name: '',
                    uri: '',
                    labelKey: '',
                    idKey: '',
                    multi: 0,
                    custom: 0,
                    filter: [
                        {
                            key: '',
                            values: []
                        }
                    ]
                }
            }
       },
        methods: {
            ...mapActions({
                toAddField: 'addField',
                toEditField: 'editField'
            }),
            ...mapGetters(['getTransform','getRules']),
            addField() {
                const fields = {
                    type: "inputlookup",
                    title: this.fields.title,
                    name: this.fields.name === "" ? this.fields.title.replace(/[\s,&-/_?():.]/g,"").toLowerCase().substring(0,7) : this.fields.name,
                    uri: this.fields.uri = this.routes ? '/v1/api/' + this.fields.uri : '/reflow/data/sync/lookup/' + this.fields.uri,
                    labelKey: this.fields.labelKey,
                    idKey: this.fields.idKey,
                    multi: this.fields.multi,
                    custom: this.fields.custom

                };
                if (this.filterPicked) {
                    fields.filter = this.fields.filter
                }
                this.toAddField(fields);
                return fields;
            },
            clearField() {
               this.fields.uri = this.fields.uri.replace(this.fields.uri, '');
            },
            editField() {
                const editFields = {
                    type: "inputlookup",
                    title: this.fields.title,
                    name: this.fields.name === "" ? this.fields.title.replace(/[\s,&-/_?():.]/g,"").toLowerCase().substring(0,7) : this.fields.name,
                    uri: this.fields.uri = this.routes ? '/v1/api/' + this.fields.uri : '/reflow/data/sync/lookup/' + this.fields.uri,
                    labelKey: this.fields.labelKey,
                    idKey: this.fields.idKey,
                    multi: this.fields.multi,
                    custom: this.fields.custom
                };
                if (this.fields.filter !== undefined) {
                    editFields.filter = this.fields.filter
                }
                    this.toEditField(editFields);
                return editFields;
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