<template>
    <div class="section">
        <div class="field">
            <div class="control">
                <label class="label">Select Field Name</label>
                <input class="input" type="text" name="name" :listFields="listFields.name" v-model="fields.name">
                <label class="label">Select Field Title</label>
                <input class="input" type="text" name="title" :listFields="listFields.title" v-model="fields.title">
                <div  v-for="item in customFields">
                    <label class="label">Title Field</label>
                    <input class="input" type="text" name="title" :listFields="item.title" v-model="item.title">
                </div>
                <div v-if="transformed" v-for="item in fields.items">
                    <label class="label">Title Field</label>
                    <input class="input" type="text" name="title" v-model="item.title">
                </div>
                <label class="label">Multi ?</label>
                <div class="control">
                    <input class="checkbox" type="checkbox" name="multi" v-model="fields.multi">
                </div>
                <label class="label">Custom ?</label>
                <div class="control">
                    <input class="checkbox" type="checkbox" name="custom" v-model="fields.custom">
                </div>
            </div>
        </div>

        <div class="field">
            <div class="control">
                <button  class="button is-primary" @click="addSelectFields">Add Titles</button>
            </div>
        </div>

    </div>
    
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: "Select",
        radio: String,
        transformList: Boolean,
        props: {
            listFields: Object
        },
        data () {
            return {
                customFields: [
                    {title: ''}
                ],
                transformed: false,
                fields: {
                    type: "inputselect",
                    title: '',
                    name: '',
                    multi: 0,
                    custom: 0,
                    items:[
                        {title: ''},
                    ]
                }
            }
        },
        methods: {
            ...mapActions({
                    toAddField: 'addField',
                    toEditField: 'editField'
            }
            ),
            addSelectFields() {
                this.customFields.push({
                    title:''
                });
            },
            addField() {
                const fields = {
                    type: this.fields.multi ? "inputmultiselect" : "inputselect",
                    title: this.fields.title,
                    name: this.fields.name === "" ? this.fields.name = this.fields.title.replace(/[\s,&-/_?():.]/g,"").toLowerCase().substring(0,7) : this.fields.name,
                    multi: this.fields.multi,
                    custom: this.fields.custom,
                    items: this.customFields
                };
                this.toAddField(fields);
                return fields;
            },
            editField() {
                const editFields = {
                    type: this.fields.multi ? "inputmultiselect" : "inputselect",
                    title: this.fields.title,
                    name: this.fields.name === "" ? this.fields.name = this.fields.title.replace(/[\s,&-/_?():.]/g,"").toLowerCase().substring(0,7) : this.fields.name,
                    multi: this.fields.multi,
                    custom: this.fields.custom,
                    items: this.customFields
                };
                this.toEditField(editFields);
                return editFields;
            }
        }
    }
</script>

<style scoped>

</style>