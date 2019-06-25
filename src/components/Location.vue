<template>
    <div class="section">
        <div class="field">
            <div class="control">
                <label class="label"> Name For Location</label>
                <input class="input" type="text" :listFields="listFields.name" v-model="fields.name">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label"> Title For Location</label>
                <input class="input" type="text" :listFields="listFields.title" v-model="fields.title">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label"> Minute Field For Location</label>
                <input class="input" type="text" :listFields="listFields.minute" v-model="fields.minute">
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Location",
        props: {
          listFields: Object
        },
        data () {
            return {
                fields: {
                    type: "inputlocation",
                    name: '',
                    title: '',
                    minute: '',
                    hidden: '',
                    required:  ''
                }
            }
        },
        methods: {
            addField() {
                Object.assign({}, {title: '', name: '', minute: '', hidden: '',  required: ''});
                this.fields.type = 'inputlocation';
                return this.fields;
            }
        },
        beforeMount() {
            this.fields = this.listFields;
        }
    }
</script>

<style scoped>

</style>