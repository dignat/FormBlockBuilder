<template>
  <div class="panel">
    <p class="panel-heading"> <span class="is-clickable" @click="toggle= !toggle">Text Field -> {{ fields.title}} - Collapse/Expand   <font-awesome-icon :icon="['fas','angle-double-down']"/></span></p>
    <div class="section" v-show="toggle">
        <div class="field">
            <div class="control">
                <label class="label">Alias Select Title</label>
                <input class="input" type="text" name="title" v-model="fields.title">
                <label class="label">Choose slices from title to generate name ( ex. 0,1,2 - start from 0)</label>
                <input class="input" type="text"  v-model="slices">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label">Alias Select Name</label>
                <input class="input" type="text" name="name" v-model="fields.name">
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
                <input class="input" type="text" name="selectKey" v-model="fields.selectKey">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label"> Multi</label>
                <input class="checkbox" type="checkbox" name="multi" v-model="fields.multi">
            </div>
        </div>

    </div>
  </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {mapGetters} from 'vuex'
    import appMixin from '../mixins'
    export default {
        name: "AliasSelect",
        mixins: [appMixin],
        props: {
            listFields: Object
        },
        data (){
            return {
              toggle: true,
                slices: '',
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
                toEditField: 'editField',
              toDeleteField: 'deleteField'
            }),
            ...mapGetters(['getTransform','getRules']),
            addField() {
                const fields = {
                    type: 'inputlookupaliasselect',
                    name: this.fields.name === "" ? this.fields.name =  this.nameGenerator(this.fields.title,this.slices.length > 0 ? this.slices.split(',') : []) : this.fields.name,
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
                const editFields = {
                    type: 'inputlookupaliasselect',
                    name: this.fields.name === "" ? this.fields.name =  this.nameGenerator(this.fields.title) : this.fields.name,
                    title: this.fields.title,
                    target: this.fields.target,
                    labelKey: this.fields.labelKey,
                    selectKey: this.fields.selectKey,
                    idKey: this.fields.idKey,
                    multi: this.fields.multi,
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