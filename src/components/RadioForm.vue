<template>
    <div class="section">
        <div class="control">
            <Radios :types="types" :radio="customType" @change="handleChange"/>
            <label class="label">Radio Field Name</label>
            <input class="input" type="text" name="name" :listFields="listFields.name" v-model="fields.name">
            <label class="label">Radio Field Title</label>
            <input class="input" type="text" name="title" :listFields="listFields.title" v-model="fields.title">
            <label class="label">Radio Hidden ?</label>
            <input class="checkbox" type="checkbox" name="hidden" :listFields="listFields.hidden" v-model="fields.hidden">
            <div v-if="customTitles" v-for="(item, index) in customFields" :listFields="listFields.items">
                <label class="label">Custom Title Field</label>
                <input class="input" type="text" name="title" :customField="customTitles" v-model="item.title">
            </div>
            <div v-if="transformed" v-for="(item, index) in fields.items" >
                <label class="label">Custom Title Field</label>
                <input class="input" type="text" name="title" :listFields="item.title" v-model="item.title">
            </div>
        </div>
            <div class="field">
                <div v-if="customTitles" class="control">
                    <button class="button is-primary" @click="addCustomFields">Add Titles</button>
                </div>
            </div>
    </div>
</template>

<script>
    import Radios from "./Radios"
    import {mapActions} from 'vuex'
    export default {
        name: "RadioForm",
        props: {
            listFields: Object,
            radio: String,
            customField: Boolean,
            transformList: Boolean,
        },
        components: {
            Radios
        },
        data () {
            return {
                customTitles: false,
                types: ['default', 'custom'],
                transformed: false,
                customType: '',
                customFields: [
                    {title: ''}
                ],
                fields: {
                    type: "inputradio",
                    title: '',
                    name: '',
                    hidden: '',
                    items:[
                        {title: 'Yes'},
                        {title: 'No'}
                    ]
                }
            }
        },
        methods: {
            ...mapActions({
                toAddField: 'addField',
                toEditField: 'editField'
            }),
            addCustomFields() {
                this.customFields.push({
                    title:''
                });
            },
            addField() {
                const fields = {
                    type: "inputradio",
                    title: this.fields.title,
                    name:  this.fields.name === "" ? this.fields.title.replace(/[\s,&\-/_?():]/g,"").toLowerCase() : this.fields.name,
                    hidden: this.fields.hidden,
                    items: this.customTitles ? this.fields.items = this.customFields : this.fields.items = [{title: 'Yes'},{title: 'No'}]

                };
                this.toAddField(fields);
                return fields

            },
            editField () {
                this.fields.name === "" ? this.fields.title.replace(/[\s,&-/_?():.]/g,"").toLowerCase().substring(0,7) : this.fields.name;
                this.toEditField(this.fields);
                return this.fields;
            },
            handleChange(type) {
                console.log(type);
                switch(type) {
                    case 'custom':
                        this.customTitles = true;
                        this.customType = type;
                        console.log(this.customTitles);
                        break;
                    case 'default':
                        // do nothing
                        this.customTitles = false;
                        this.customType = type;
                        break;
                }
            }
        }
    }
</script>

<style scoped>

</style>