<template>
    <div class="section">
        <div class="field">
            <div class="control">
                <label class="label">Alias Title</label>
                <input class="input" type="text" name="title" v-model="fields.title">
                <label class="label">Choose slices from title to generate name ( ex. 0,1,2 - start from 0)</label>
                <input class="input" type="text"  v-model="slices">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label">Alias Name</label>
                <input class="input" type="text" name="name" v-model="fields.name">
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
    import {mapGetters} from 'vuex'
    import appMixin from '../mixins'
    export default {
        name: "Alias",
        mixins: [appMixin],
        props: {
            listFields: Object
        },
        data () {
            return {
                slices: '',
                fields: {
                    type: 'inputlookupalias',
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
                toEditField: 'editField',
              toDeleteField: 'deleteField'
            }),
            ...mapGetters(['getTransform','getRules']),
            addField () {
                const fields = {
                    type: 'inputlookupalias',
                    name: this.fields.name === "" ? this.fields.name =  this.nameGenerator(this.fields.title,this.slices.length > 0 ? this.slices.split(',') : []) : this.fields.name,
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
                    type: 'inputlookupalias',
                    name: this.fields.name === "" ? this.fields.name =  this.nameGenerator(this.fields.title) : this.fields.name,
                    title: this.fields.title,
                    target: this.fields.target,
                    labelKey: this.fields.labelKey,
                    idKey: this.fields.idKey,
                    format: this.fields.format,
                    custom: this.fields.custom
                };
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