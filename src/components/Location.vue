<template>
  <div class="panel">
    <p class="panel-heading"> <span class="is-clickable" @click="toggle= !toggle">GPS Field -> {{ fields.title}} - Collapse/Expand   <font-awesome-icon :icon="['fas','angle-double-down']"/></span></p>
    <div class="section" v-show="toggle">
        <div class="field">
            <div class="control">
                <label class="label"> Title For Location</label>
                <input class="input" type="text" :listFields="listFields.title" v-model="fields.title">
                <label class="label">Choose slices from title to generate name ( ex. 0,1,2 - start from 0)</label>
                <input class="input" type="text"  v-model="slices">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label"> Name For Location</label>
                <input class="input" type="text" :listFields="listFields.name" v-model="fields.name">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label"> Minute Field For Location</label>
                <input class="input" type="text" :listFields="listFields.minute" v-model="fields.minute">
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
        name: "Location",
        mixins: [appMixin],
        props: {
          listFields: Object,
        },
        data () {
            return {
              toggle: true,
                slices: '',
                fields: {
                    type: "inputlocation",
                    name: '',
                    title: '',
                    minute: '',
                    hidden: 0,
                    required:  0
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
                    type: "inputlocation",
                    name: this.fields.name === "" ? this.fields.name =  this.nameGenerator(this.fields.title,this.slices.length > 0 ? this.slices.split(',') : []) : this.fields.name,
                    title: this.fields.title,
                    minute: this.fields.minute,
                    hidden: this.fields.hidden,
                    required:  this.fields.required
                };
                this.toAddField(fields);
                return fields;
            },
            editField() {
                const fields = {
                    type: "inputlocation",
                    name: this.fields.name === "" ? this.fields.name =  this.nameGenerator(this.fields.title) : this.fields.name,
                    title: this.fields.title,
                    minute: this.fields.minute,
                    hidden: this.fields.hidden,
                    required:  this.fields.required
                };
                this.toEditField(fields);
                return this.fields;
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