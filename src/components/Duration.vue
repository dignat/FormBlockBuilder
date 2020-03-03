<template>
    <div class="section">
        <div class="field">
            <div class="control">
                <label class="label">Duration Field Name</label>
                <input class="input" type="text" name="name" :listFields="listFields.name" v-model="fields.name">
                <label class="label">Duration Field Title</label>
                <input class="input" type="text" name="title" :listFields="listFields.title" v-model="fields.title">
                <label class="label">Duration Field Time</label>
                <input class="input" type="text" name="time" :listFields="listFields.time" v-model="fields.time">
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {mapGetters} from 'vuex'
    export default {
        name: "Duration",
        props: {
            listFields: Object
        },
        data() {
            return {
                field: {
                    type: 'inputduration',
                    name: '',
                    title: '',
                    time: 0
                }
            }
        },
        methods: {
            ...mapActions({
                toAddField: 'addField',
                toEditField: 'editField',
            }),
            ...mapGetters(['getTransform','getRules']),
            addField () {
                const fields = {
                    type: 'inputduration',
                    title: this.fields.title,
                    name: this.fields.name === "" ? this.fields.name =  this.nameGenerator(this.fields.title) : this.fields.name,
                    decimals: this.fields.time
                };
                this.toAddField(fields);
                return fields;

            },
            editField() {
                const editedFields = {
                    type: this.fields.type,
                    name: this.fields.name,
                    title: this.fields.title,
                    decimals: this.fields.time
                };
                this.toEditField(editedFields);
                return this.fields;
            },
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