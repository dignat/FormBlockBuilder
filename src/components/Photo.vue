<template>
    <div class="section">
        <div class="field">
            <div class="control">
                <label class="label">Title for Photo</label>
                <input class="input" name="title" type="text" :listFields="listFields.title" v-model="fields.title">
                <label class="label">Name for Photo</label>
                <input class="input" name="name" type="text" :listFields="listFields.name" v-model="fields.name">
                <label class="label">Photo Required?</label>
                <input class="checkbox" type="checkbox" name="required" :listFields="listFields.required" v-model="fields.required">
                <label class="label">Photo Hidden?</label>
                <input class="checkbox" name="hidden" type="checkbox" :listFields="listFields.hidden" v-model="fields.hidden">
            </div>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "Photo",
        props: {
            listFields: Object
        },
        data () {
            return {
                fields: {
                    type: 'inputimage',
                    title: '',
                    name: '',
                    hidden: '',
                    required: '',
                    source: ''
                }
            }
        },
        methods: {
            addField() {
                Object.assign({}, {title: '', name: '', required: '', hidden: '', source: ''});
                return this.fields;
            },
        },
        beforeMount() {
            this.fields = this.listFields;
            this.fields.type = 'inputimage';
        }
    }
</script>

<style scoped>

</style>