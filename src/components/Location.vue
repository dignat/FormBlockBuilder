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
    import {mapActions} from 'vuex'
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
                    hidden: 0,
                    required:  0
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
                    type: "inputlocation",
                    name: this.fields.name === "" ? this.fields.name = this.fields.title.replace(/[\s,&\-/_?():]/g,"").toLowerCase() : this.fields.name,
                    title: this.fields.title,
                    minute: this.fields.minute,
                    hidden: this.fields.hidden,
                    required:  this.fields.required
                };
                this.toAddField(fields);
                return fields;
            },
            editField() {
                const fields = {
                    type: "inputlocation",
                    name: this.fields.name === "" ? this.fields.name = this.fields.title.replace(/[\s,&\-/_?():]/g,"").toLowerCase() : this.fields.name,
                    title: this.fields.title,
                    minute: this.fields.minute,
                    hidden: this.fields.hidden,
                    required:  this.fields.required
                };
                this.toEditField(fields);
                return this.fields;
            }
        },

    }
</script>

<style scoped>

</style>