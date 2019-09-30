<template>
    <div class="section">
        <div class="field">
            <div class="control">
                <label class="label">Number Field Name</label>
                <input class="input" type="text" name="name" :listFields="listFields.name" v-model="fields.name">
                <label class="label">Number Field Title</label>
                <input class="input" type="text" name="title" :listFields="listFields.title" v-model="fields.title">
                <label class="label">Number Field Decimals</label>
                <input class="input" type="text" name="decimals" :listFields="listFields.decimals" v-model="fields.decimals">
            </div>
        </div>
    </div>
    
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: "Number",
        props: {
            listFields: Object
        },
        data () {
            return {
                fields: {
                    type: 'inputnumber',
                    name: '',
                    title: '',
                    decimals: ''
                }
            }
        },
        methods: {
            ...mapActions({
                toAddField: 'addField',
                toEditField: 'editField'
            }),
            addField () {
                const fields = {
                    type: this.fields.type,
                    name: this.fields.name === "" ? this.fields.title.replace(/[\s,&\-/_?():]/g,"").toLowerCase() : this.fields.name,
                    title: this.fields.title,
                    decimals: this.fields.decimals
                };
                this.toAddField(fields);
                return fields;

            },
            editField() {
                this.fields.name === "" ? this.fields.title.replace(/[\s,&\-/_?():]/g,"").toLowerCase() : this.fields.name;
                this.toEditField(this.fields);
                return this.fields;
            }
        },
    }
</script>

<style scoped>

</style>