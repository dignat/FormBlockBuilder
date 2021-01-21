<template>
  <div class="panel">
    <p class="panel-heading"> <span class="is-clickable" @click="toggle= !toggle">Number Field -> {{ fields.title}} - Collapse/Expand   <font-awesome-icon :icon="['fas','angle-double-down']"/></span></p>
    <div class="section" v-show="toggle">
        <div class="field">
            <div class="control">
                <label class="label">Number Field Title</label>
                <input class="input" type="text" name="title" :listFields="listFields.title" v-model="fields.title">
                <label class="label">Choose slices from title to generate name ( ex. 0,1,2 - start from 0)</label>
                <input class="input" type="text"  v-model="slices">
                <label class="label">Number Field Name</label>
                <input class="input" type="text" name="name" :listFields="listFields.name" v-model="fields.name">
                <label class="label">Number Field Decimals</label>
                <input class="input" type="text" name="decimals" :listFields="listFields.decimals" v-model="fields.decimals">
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
        name: "Number",
        mixins: [appMixin],
        props: {
            listFields: Object
        },
        data () {
            return {
              toggle: true,
                slices: '',
                fields: {
                    type: 'inputnumber',
                    name: '',
                    title: '',
                    decimals: 0
                },
            }
        },
        methods: {
            ...mapActions({
                toAddField: 'addField',
                toEditField: 'editField',
                sendTheEditFields: 'checkedField',
                toDeleteField: 'deleteField'
            }),
            ...mapGetters(['getTransform','getRules']),
            addField () {
                const fields = {
                    type: 'inputnumber',
                    title: this.fields.title,
                    name: this.fields.name === "" ? this.fields.name =  this.nameGenerator(this.fields.title,this.slices.length > 0 ? this.slices.split(',') : []) : this.fields.name,
                    decimals: this.fields.decimals
                };
                this.toAddField(fields);
                return fields;

            },
            editField() {
                const editedFields = {
                    type: this.fields.type,
                    name: this.fields.name === "" ? this.fields.name =  this.nameGenerator(this.fields.title,this.slices.length > 0 ? this.slices.split(',') : []) : this.fields.name,
                    title: this.fields.title,
                    decimals: this.fields.decimals
                };
                this.toEditField(editedFields);
                this.sendTheEditFields(editedFields.name);
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