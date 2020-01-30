<template>
    <div class="section">
        <div class="field">
            <div class="control">
                <label class="label">Title for date</label>
                <input class="input" name="title" :listFields="listFields.title" v-model="fields.title">
                <label class="label">Name for date</label>
                <input class="input" name="name" :listFields="listFields.name" v-model="fields.name">
                <label class="label">Time Type</label>
                <input class="number" name="time" :listFields="listFields.time" v-model="fields.time">
            </div>
        </div>
    </div>
    
</template>

<script>
    import {mapActions} from 'vuex'
    import {mapGetters} from 'vuex'
    export default {
        name: "DateComponent",
        props: {
            listFields: Object
        },
        data () {
            return {
                fields: {
                    type: "inputdate",
                    title: '',
                    name: '',
                    time: '',
                    required: 0,
                    hidden: 0
                }
            }
        },
        methods: {
            ...mapActions({
                toAddField: 'addField',
                toEditField: 'editField'
            }),
            ...mapGetters(['getTransform','getRules']),
             addField () {
                const fields = {
                    type: "inputdate",
                    title: this.fields.title,
                    name: this.fields.name === "" ? this.fields.name = this.fields.title.replace(/[\s,&\-/_?():]/g,"").toLowerCase() : this.fields.name,
                    time: this.fields.time,
                    required: this.fields.required,
                    hidden: this.fields.hidden
                };
                this.toAddField(fields);
                return fields;
            },
            editField() {
                const editFields = {
                    type: "inputdate",
                    title: this.fields.title,
                    name: this.fields.name === "" ? this.fields.name = this.fields.title.replace(/[\s,&\-/_?():]/g,"").toLowerCase() : this.fields.name,
                    time: this.fields.time,
                    required: this.fields.required,
                    hidden: this.fields.hidden
                };
                console.log(editFields.name);
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