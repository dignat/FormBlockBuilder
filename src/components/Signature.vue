<template>
    <div class="section">
        <div class="field">
            <div class="control">
                <label class="label">Title for Signature</label>
                <input type="text" name="title" class="input" :listFields="listFields.title" v-model="fields.title">
                <label class="label">Name for Signature</label>
                <input class="input" name="name" type="text" :listFields="listFields.name" v-model="fields.name">
                <label class="label">Statement</label>
                <input class="input" name="statement" type="text" :listFields="listFields.statement" v-model="fields.statement">
                <label class="label">Min</label>
                <input class="label" type="text" name="max" :listFields="listFields.max" v-model="fields.max">
                <label class="label">Min</label>
                <input class="label" type="text" name="min" :listFields="listFields.min" v-model="fields.min">
                <label class="label">Hidden Signature?</label>
                <input class="checkbox" name="hidden" type="checkbox"  :listFields="listFields.hidden" v-model="fields.hidden">
            </div>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "Signature",
        props: {
            listFields: Object
        },
        data () {
            return {
                fields: {
                    type: "inputsignature",
                    title: '',
                    name: '',
                    min: '',
                    max: '',
                    hidden: '',
                    statement: ''
                }
            }
        },
        methods: {
            addField() {
                Object.assign({}, {title: '', name: '', min: '', max: '', required: '', hidden: ''});
                this.fields.type = 'inputsignature';
                this.fields.name === "" ? this.fields.title.replace(/[\s,&\-/_?():]/g,"").toLowerCase() : this.fields.name;
                return this.fields;
            },
        },
        beforeMount() {
            this.fields = this.listFields
        }
    }
</script>

<style scoped>

</style>