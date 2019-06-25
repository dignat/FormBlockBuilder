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
            addField () {
                Object.assign({}, {name: '', title: '', decimals: ''});
                return this.fields;
            }
        },
        beforeMount() {
            this.fields = this.listFields;
            this.fields.type = 'inputnumber';
        }
    }
</script>

<style scoped>

</style>