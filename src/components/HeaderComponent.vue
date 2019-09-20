<template>
    <div class="section">
        <div class="field">
            <div class="control">
                <label class="label"> Name For Text</label>
                <input class="input" type="text" :listFields="listFields.name" v-model="fields.name">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label"> Body/Text For Text</label>
                <input class="input" type="text" :listFields="listFields.body" v-model="fields.body">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label"> Hidden Text?</label>
                <input class="checkbox" type="checkbox" :listFields="listFields.hidden" v-model="fields.hidden">
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "HeaderComponent",
        props: {
            listFields: Object,
        },
        data () {
            return {
                fields: {
                    type: 'text',
                    name: '',
                    body: '<h3></h3>',
                    hidden: ''
                }
            }
        },
        methods: {
            addField() {
                Object.assign({}, {body: '', name: '', hidden: ''});
                this.fields.type = 'text';
                return this.fields;
            },
            editField (fields) {
                this.textfields = fields;
                return this.fields
            }
        },
        beforeMount() {
            this.textfields = this.listFields;
            this.fields.type = 'text'
        }
    }
</script>

<style scoped>

</style>