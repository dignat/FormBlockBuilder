<template>
  <div class="panel">
    <p class="panel-heading"> <span class="is-clickable" @click="toggle= !toggle">Date/Time Field -> {{ fields.title}} - Collapse/Expand   <font-awesome-icon :icon="['fas','angle-double-down']"/></span></p>
    <div class="section" v-show="toggle">
        <div class="field">
            <div class="control">
                <label class="label">Title for date</label>
                <input class="input" name="title" :listFields="listFields.title" v-model="fields.title">
                <label class="label">Choose slices from title to generate name ( ex. 0,1,2 - start from 0)</label>
                <input class="input" type="text"  v-model="slices">
                <label class="label">Name for date</label>
                <input class="input" name="name" :listFields="listFields.name" v-model="fields.name">
                <label class="label">Time Type</label>
                <input class="number" name="time" :listFields="listFields.time" v-model="fields.time">
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
        name: "DateComponent",
        mixins: [appMixin],
        props: {
            listFields: Object
        },
        data () {
            return {
              toggle: true,
                slices: '',
                fields: {
                    type: "inputdate",
                    title: '',
                    name: '',
                    time: '',
                    required: 0,
                    hidden: 0
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
                    type: "inputdate",
                    title: this.fields.title,
                    name: this.fields.name === "" ? this.fields.name = this.nameGenerator(this.fields.title,this.slices.length > 0 ? this.slices.split(',') : []) : this.fields.name,
                    time: this.fields.time,
                    required: this.fields.required,
                    hidden: this.fields.hidden
                };
                this.toAddField(fields);
                return fields;
            },
            editField() {
                const editFields = {
                    type: "inputdate",
                    title: this.fields.title,
                    name: this.fields.name === "" ? this.fields.name =  this.nameGenerator(this.fields.title) : this.fields.name,
                    time: this.fields.time,
                    required: this.fields.required,
                    hidden: this.fields.hidden
                };
                console.log(editFields.name);
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