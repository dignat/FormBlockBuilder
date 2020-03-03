<template>
    <div class="section">
    <div class="field">
        <div class="control">
            <label class="label"> Name For Text</label>
            <input class="input" type="text" :listFields="listFields.name" v-model="fields.name">
        </div>
    </div>
       <div class="field">
           <div class="control">
               <label class="label"> Title For Text</label>
               <input class="input" type="text" :listFields="listFields.title" v-model="fields.title">
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
                <label class="label">Default</label>
                <input class="input" type="text" name="default" :listFields="listFields.default" v-model="fields.default">
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
        },
        mixins: [appMixin],
        data () {
            return {
                fields: {
                    type: 'inputtext',
                    name: '',
                    title: '',
                    limit: 255,
                    hidden: 0,
                    default: '',
                    required: 0,
                    enabled: 1
                },
                toEdit: false
            }
        },
        methods: {
            ...mapActions({
               toAddField: 'addField',
                toEditField: 'editField',
                sendTheEditFields: 'checkedField'
            }),
            ...mapGetters(['getTransform','getRules']),
            addField() {
               const fields = {
                   type: 'inputtext',
                   title: this.fields.title,
                   name: this.fields.name === "" ? this.fields.name = this.nameGenerator(this.fields.title) : this.fields.name,
                   hidden: this.fields.hidden,
                   limit: this.fields.limit,
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
                    name: this.fields.name,
                    hidden: this.fields.hidden,
                    limit: this.fields.limit,
                    default: this.fields.default,
                    required: this.fields.required,
                    enabled: this.fields.enabled
                };

                this.toEditField(editedFields);
                return this.fields;
            },
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