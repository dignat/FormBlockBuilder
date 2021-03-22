<template>
  <div class="panel" :id="id">
    <p class="panel-heading"><i>Text box , to insert a free text</i> </p>
    <div class="section">
        <div class="field">
            <div class="control">
                <label class="label"> Title For Text</label>
                <input class="input" type="text" :listFields="listFields.title" v-model="fields.title" :placeholder="fields.title">
                <label class="label">Choose slices from title to generate name ( ex. 0,1,2 - start from 0)</label>
                <input class="input" type="text"  v-model="slices">
            </div>
        </div>
        <div class="field">
        <div class="control">
            <label class="label"> Name For Text</label>
            <input class="input" type="text" :listFields="listFields.name" v-model="fields.name">
        </div>
    </div>
       <div class="field">
           <div class="control">
               <label class="label"> Limit Field For Text</label>
               <input class="input" type="number" :listFields="listFields.limit" v-model="fields.limit">
           </div>
       </div>
        <div class="field">
            <div class="control">
                <label class="label">Hidden ?</label>
                <input class="checkbox" type="checkbox" name="hidden" :listFields="listFields.hidden" v-model="fields.hidden">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label">Required ?</label>
                <input class="checkbox" type="checkbox" name="required" :listFields="listFields.required" v-model="fields.required">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label">Enabled ?</label>
                <input class="checkbox" type="checkbox" name="enabled" :listFields="listFields.enabled" v-model="fields.enabled">
            </div>
        </div>
      <div class="field">
        <div class="control">
          <label class="label">Link ?</label>
          <input class="checkbox" type="checkbox" name="enabled" :listFields="listFields.link" v-model="fields.link">
        </div>
      </div>
        <div class="field">
            <div class="control">
                <label class="label">Default</label>
                <input class="input" type="text" name="default" :listFields="listFields.default" v-model="fields.default">
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
        name: "TextComponent",
        props: {
            listFields: Object,
            id: [Number,String],
        },
        mixins: [appMixin],
        data () {
            return {
              toggle: true,
                slices: '',
                fields: {
                    type: 'inputtext',
                    name: '',
                    title: '',
                    limit: 255,
                    hidden: 0,
                    default: '',
                    required: 0,
                    enabled: 1,
                    link: 0
                },
                toEdit: false
            }
        },
        methods: {
            ...mapActions({
               toAddField: 'addField',
                toEditField: 'editField',
                sendTheEditFields: 'checkedField',
                toDeleteField: 'deleteField'
            }),
            ...mapGetters(['getTransform','getRules','editedName']),
            addField() {
               const fields = {
                   type: 'inputtext',
                   title: this.fields.title,
                   name: this.fields.name === "" ? this.fields.name = this.nameGenerator(this.fields.title, this.slices.length > 0 ? this.slices.split(',') : []) : this.fields.name,
                   hidden: this.fields.hidden,
                   limit: parseInt(this.fields.limit),
                   default: this.fields.default,
                   required: this.fields.required,
                   enabled: this.fields.enabled
               };
                this.toAddField(fields);
                return fields;
            },
            editField () {
                const editedFields = {
                    type: 'inputtext',
                    title: this.fields.title,
                    name: this.fields.name === "" ? this.fields.name = this.nameGenerator(this.fields.title, this.slices.length > 0 ? this.slices.split(',') : []) : this.fields.name,
                    hidden: this.fields.hidden,
                    limit: parseInt(this.fields.limit),
                    default: this.fields.default,
                    required: this.fields.required,
                    enabled: this.fields.enabled
                };
                this.toEditField(editedFields);
                this.sendTheEditFields(editedFields.name);
                return editedFields;
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