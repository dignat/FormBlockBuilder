<template>
    <div class="section">
        <div class="control">
            <label class="label">Title for Checkbox</label>
            <input class="input" type="text" name="title" :listFields="listFields.title" v-model="fields.title">
            <label class="label">Choose slices from title to generate name ( ex. 0,1,2 - start from 0)</label>
            <input class="input" type="text"  v-model="slices">
            <label class="label">Name for Checkbox</label>
            <input class="input" type="text" name="name" :listFields="listFields.name" v-model="fields.name">
            <label class="label">Width for Checkbox</label>
            <input class="input" type="number" name="width" :listFields="listFields.width" v-model="fields.width">
            <label class="label">Checkbox Required?</label>
            <input class="checkbox" type="checkbox" name="required" :listFields="listFields.required" v-model="fields.required">
            <label class="label">Checkbox Hidden?</label>
            <input class="checkbox" name="hidden" type="checkbox" :listFields="listFields.hidden" v-model="fields.hidden">
        </div>
    </div>
    
</template>

<script>
    import {mapActions} from 'vuex'
    import {mapGetters} from 'vuex'
    import appMixin from '../mixins'
    export default {
        name: "Checkbox",
        mixins: [appMixin],
        props: {
            listFields: Object
        },
        data () {
            return {
                slices: '',
                fields: {
                    type: "inputcheckbox",
                    title: '',
                    name: '',
                    required: 0,
                    hidden: 0,
                    width: 100
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
                    type: "inputcheckbox",
                    title: this.fields.title,
                    name: this.fields.name === "" ? this.fields.name =  this.nameGenerator(this.fields.title,this.slices.length > 0 ? this.slices.split(',') : []) : this.fields.name,
                    required: this.fields.required,
                    hidden: this.fields.hidden,
                    width: this.fields.width
                };
                this.toAddField(fields);
                return fields;
            },
            editField() {
                const editFields = {
                    type: "inputcheckbox",
                    title: this.fields.title,
                    name: this.fields.name === "" ? this.fields.name =  this.nameGenerator(this.fields.title) : this.fields.name,
                    required: this.fields.required,
                    hidden: this.fields.hidden,
                    width: this.fields.width
                };
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