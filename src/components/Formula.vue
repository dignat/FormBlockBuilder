<template>
    <div class="section">
        <div class="field">
            <div class="control">
                <label class="label">Title for Formula</label>
                <input class="input" name="title" type="text" :listFields="listFields.title" v-model="fields.title">
                <label class="label">Name for Formula</label>
                <input class="input" name="name" type="text" :listFields="listFields.name" v-model="fields.name">
                <label class="label">Script</label>
                <input class="input" name="script" type="text" :listFields="listFields.script" v-model="fields.script">
                <label class="label">Hidden Formula?</label>
                <input class="checkbox" name="hidden" type="checkbox" :listFields="listFields.hidden" v-model="fields.hidden">
                <input class="is-hidden" name="type" type="hidden" :listFields="listFields.type" v-model="fields.type" value="inputformula">
            </div>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "Formula",
        props: {
            listFields: Object
        },
        data () {
            return {
                fields: {
                    type: "inputformula",
                    title: '',
                    name: '',
                    hidden: '',
                    script: '',
                    store: 0
                }
            }
        },
        methods: {
            addField() {
                Object.assign({}, {title: '', name: '', required: '', hidden: '', script: ''});
                this.fields.type = "inputformula";
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