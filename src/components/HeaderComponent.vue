<template>
    <div class="section">
        <div class="field">
            <div class="control">
                <label class="label"> Name For Text</label>
                <input class="input" type="text" :listFields="listFields.name" v-model="textfields.name">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label"> Body/Text For Text</label>
                <input class="input" type="text" :listFields="listFields.body" v-model="textfields.body">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label"> Hidden Text?</label>
                <input class="checkbox" type="checkbox" :listFields="listFields.hidden" v-model="textfields.hidden">
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
                textfields: {
                    type: 'text',
                    name: '',
                    body: '',
                    hidden: ''
                }
            }
        },
        methods: {
            addField() {
                Object.assign({}, {body: '', name: '', hidden: ''});
                this.textfields.type = 'text';
                return this.textfields;
            },
            editField (fields) {
                this.textfields = fields;
                return this.textfields
            }
        },
        beforeMount() {
            this.textfields = this.listFields;
            this.textfields.type = 'text'
        }
    }
</script>

<style scoped>

</style>