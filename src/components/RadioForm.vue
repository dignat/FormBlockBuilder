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
            addCustomFields() {
                this.customFields.push({
                    title:''
                });
            },
            addField() {
                Object.assign({}, {title: '', name: '', hidden: ''});
                Object.assign({}, {title: ''});
                if (this.customTitles) {
                    this.fields.items = this.customFields;
                } else {
                    this.fields.items = [
                        {title: 'Yes'},
                            {title: 'No'}
                            ]
                }
                this.fields.type = 'inputradio';
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
        },
        beforeMount() {
            this.fields = this.listFields
            this.customType = this.radio
            this.transformed = this.transformList;
        }
    }
</script>

<style scoped>

</style>