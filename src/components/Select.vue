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
                    items:[
                        {title: ''},
                    ]
                }
            }
        },
        methods: {
            addSelectFields() {
                this.customFields.push({
                    title:''
                });
            },
            addField() {
                Object.assign({}, {title: '', name: ''});
                this.fields.items = this.customFields;
                return this.fields;
            },
        },
        beforeMount() {
            this.fields = this.listFields;
            this.fields.type = 'inputselect'
        }
    }
</script>

<style scoped>

</style>