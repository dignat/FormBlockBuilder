<template>
    <div class="section">
        <div class="field">
            <div class="control">
                <label class="label"> Title For Scan</label>
                <input class="input" type="text" :listFields="listFields.title" v-model="fields.title">
                <label class="label">Choose slices from title to generate name ( ex. 0,1,2 - start from 0)</label>
                <input class="input" type="text"  v-model="slices">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label"> Name For Scan</label>
                <input class="input" type="text" :listFields="listFields.name" v-model="fields.name">
            </div>
        </div>

        <div class="field">
            <div class="control">
                <label class="label">Hidden ?</label>
                <input class="checkbox" type="checkbox" name="hidden" :listFields="listFields.hidden" v-model="fields.hidden">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label">Required ?</label>
                <input class="checkbox" type="checkbox" name="required" :listFields="listFields.required" v-model="fields.required">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label">Custom ?</label>
                <input class="checkbox" type="checkbox" name="enabled" :listFields="listFields.custom" v-model="fields.custom">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label">Default</label>
                <input class="input" type="text" name="default" :listFields="listFields.default" v-model="fields.default">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label">Width</label>
                <input class="input" type="number" name="default" :listFields="listFields.width" v-model="fields.width">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label">Mode (1-QR code, 2 - QR pr Barcode)</label>
                <input class="input" type="number" name="default" :listFields="listFields.mode" v-model="fields.mode">
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {mapGetters} from 'vuex'
    import appMixin from "../mixins";
    export default {
        name: "BarCodes",
        props: {
            listFields: Object,
        },
        mixins: [appMixin],
        data () {
            return {
                slices: '',
                fields: {
                    type: 'inputscan',
                    name: '',
                    title: '',
                    hidden: 0,
                    default: '',
                    required: 0,
                    custom: 0,
                    mode: 1,
                    width: 0
                },
                toEdit: false
            }
        },
        methods: {
            ...mapActions({
                toAddField: 'addField',
                toEditField: 'editField',
                sendTheEditFields: 'checkedField',
              toDeleteField: 'deleteField'
            }),
            ...mapGetters(['getTransform','getRules']),
            addField() {
                const fields = {
                    type: 'inputscan',
                    title: this.fields.title,
                    name: this.fields.name === "" ? this.fields.name = this.nameGenerator(this.fields.title, this.slices.length > 0 ? this.slices.split(',') : []) : this.fields.name,
                    hidden: this.fields.hidden,
                    custom: this.fields.custom,
                    default: this.fields.default,
                    required: this.fields.required,
                    mode: this.fields.mode,
                    width: this.fields.width
                };
                this.toAddField(fields);
                return fields;
            },
            editField () {
                const editedFields = {
                    type: 'inputscan',
                    title: this.fields.title,
                    name: this.fields.name,
                    hidden: this.fields.hidden,
                    custom: this.fields.custom,
                    default: this.fields.default,
                    required: this.fields.required,
                    mode: this.fields.mode,
                    width: this.fields.width
                };

                this.toEditField(editedFields);
                return this.fields;
            },
          deleteField() {
            this.toDeleteField(this.fields);
            return this.fields;
          }
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