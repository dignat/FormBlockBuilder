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
    import {mapActions} from 'vuex'
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
                    hidden: 0
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
                    type: 'text',
                    name: this.fields.name,
                    body: this.fields.body,
                    hidden: this.fields.hidden
                };
                this.toAddField(fields);
                return fields;
            },
            editField () {
                this.toEditField(this.fields);
                return this.fields
            }
        }
    }
</script>

<style scoped>

</style>