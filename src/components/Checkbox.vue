<template>
    <div class="section">
        <div class="control">
            <label class="label">Title for Checkbox</label>
            <input class="input" type="text" name="title" :listFields="listFields.title" v-model="fields.title">
            <label class="label">Name for Checkbox</label>
            <input class="input" type="text" name="name" :listFields="listFields.name" v-model="fields.name">
            <label class="label">Checkbox Required?</label>
            <input class="checkbox" type="checkbox" name="required" :listFields="listFields.required" v-model="fields.required">
            <label class="label">Checkbox Hidden?</label>
            <input class="checkbox" name="hidden" type="checkbox" :listFields="listFields.hidden" v-model="fields.hidden">
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "Checkbox",
        props: {
            listFields: Object
        },
        data () {
            return {
                fields: {
                    type: "inputcheckbox",
                    title: '',
                    name: '',
                    required: '',
                    hidden: ''
                }
            }
        },
        methods: {
            addField() {
                Object.assign({}, {title: '', name: '', required: '', hidden: ''});
                this.fields.name === "" ? this.fields.title.replace(/[\s,&\-/_?():]/g,"").toLowerCase() : this.fields.name;
                return this.fields;
            },
        },
        beforeMount() {
            this.fields = this.listFields
            this.fields.type = 'inputcheckbox'
        }
    }
</script>

<style scoped>

</style>