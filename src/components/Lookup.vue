<template>
  <div class="panel">
    <p class="panel-heading"> <span class="is-clickable" @click="toggle= !toggle">Lookup List Field -> {{ fields.title}} - Collapse/Expand   <font-awesome-icon :icon="['fas','angle-double-down']"/></span></p>
    <div class="section" v-show="toggle">
        <div class="field">

            <label class="label"> Title For Lookup</label>
            <div class="control">
                <input class="input" type="text" :listFields="listFields.title"  v-model="fields.title">
                <label class="label">Choose slices from title to generate name ( ex. 0,1,2 - start from 0)</label>
                <input class="input" type="text"  v-model="slices">
            </div>
            <label class="label"> Name For Lookup</label>
            <div class="control">
                <input class="input" type="text" :listFields="listFields.name" v-model="fields.name">
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
            <label class="label"> Icon Key Field For Lookup</label>
            <div class="control">
                <input class="input" type="text" :listFields="listFields.iconKey" v-model="fields.iconKey">
            </div>
            <label class="label">Separator</label>
            <div class="control">
                <input class="input" type="text" :listFields="listFields.separator" v-model="fields.separator">
            </div>
            <label class="label">Multi ?</label>
            <div class="control">
                <input class="checkbox" type="checkbox" :listFields="listFields.multi"  v-model="fields.multi">
            </div>
            <label class="label">Custom ?</label>
            <div class="control">
                <input class="checkbox" type="checkbox" :listFields="listFields.custom"  v-model="fields.custom">
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
  </div>

</template>

<script>
    import {mapActions} from 'vuex'
    import {mapGetters} from 'vuex'
    import appMixin from "../mixins";

    export default {
        name: "Lookup",
        mixins: [appMixin],
        props: {
            listFields: Object
        },
       data () {
            return {
              toggle: true,
                slices: '',
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
                    iconKey: '',
                    separator: '',
                    label_separator: '',
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
                toEditField: 'editField',
              toDeleteField: 'deleteField'
            }),
            ...mapGetters(['getTransform','getRules']),
            addField() {
                const fields = {
                    type: "inputlookup",
                    title: this.fields.title,
                    name: this.fields.name === "" ? this.fields.name = this.lookupNameGenerator(this.fields.title, this.fields.idKey) : this.fields.name,
                    uri: this.fields.uri =  '/v1/api/' + this.fields.uri,
                    labelKey: this.fields.labelKey,
                    idKey: this.fields.idKey,
                    iconKey: this.fields.iconKey,
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
                    name: this.fields.name === "" ? this.fields.name = this.lookupNameGenerator(this.fields.title, this.fields.idKey) : this.fields.name,
                    uri: this.fields.uri = this.fields.uri === '' ?  '/v1/api/' + this.fields.uri : this.fields.uri,
                    labelKey: this.fields.labelKey,
                    idKey: this.fields.idKey,
                    iconKey: this.fields.iconKey,
                    multi: this.fields.multi,
                    custom: this.fields.custom
                };
                if (this.fields.filter !== '') {
                    editFields.filter = this.fields.filter
                }
                    this.toEditField(editFields);
                return editFields;
            },
          deleteField() {
            this.toDeleteField(this.fields);
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