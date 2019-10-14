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
                <input class="checkbox" name="required" type="checkbox" :listFields="listFields.required" v-model="fields.required">
            </div>
        </div>
    </div>
    
</template>

<script>
    import {mapActions} from 'vuex'
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
                    hidden: 0,
                    script: '',
                    store: 0,
                    required: 0
                }
            }
        },
        methods: {
            ...mapActions({
                toAddField: 'addField',
                toEditField: 'editField'
            }),
            addField() {
                const fields = {
                    type: "inputformula",
                    title: this.fields.title,
                    name: this.fields.name,
                    hidden: this.fields.hidden,
                    script: this.fields.script,
                    store: 0
                };
                this.toAddField(fields);
                return fields;
            },
            editField() {
                this.toEditField(this.fields);
                return this.fields;
            }
        }

    }
</script>

<style scoped>

</style>