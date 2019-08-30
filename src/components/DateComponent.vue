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
                    required: '',
                    hidden: ''
                }
            }
        },
        methods: {
            addField () {
                this.fields.name === "" ? this.fields.title.replace(/[\s,&\-/_?():]/g,"").toLowerCase() : this.fields.name;
                Object.assign({}, {title: '', name: '', time: '', required: '', hidden: ''});
                return this.fields;
            }
        },
        beforeMount() {
            this.fields = this.listFields;
            this.fields.type = 'inputdate'
        }
    }
</script>

<style scoped>

</style>