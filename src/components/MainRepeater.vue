<template>
    <div class="section">
        <div class="field">
            <div class="control">
                <label class="label">Repeater Name</label>
                <input class="input" type="text" name="name" :listFields="listFields.name" v-model="fields.name">
            </div>
            <div class="control">
                <label class="label">Repeater Title</label>
                <input class="input" type="text" name="title" :listFields="listFields.title" v-model="fields.title">
            </div>
            <div class="control">
                <label class="label">Min</label>
                <input class="input" type="number" name="min" :listFields="listFields.min" v-model="fields.min">
            </div>
            <div class="control">
                <label class="label">Max</label>
                <input class="input" type="number" name="max" :listFields="listFields.max" v-model="fields.max">
            </div>
            <div v-if="!transform" class="control">
                <Repeater ref="form" v-for="(field, index) in buildFields" :listFields="field"
                          :id="index" :type=field.type :key="index" v-model="fields.items"
                          @addRepeater="sync" @editRepeater="edit"></Repeater>
            </div>
            <div v-if="transform" class="control">
                <Repeater ref="form" v-for="(field, index) in translateRepeater.items" :listFields="field" v-model="fields.items"
                          :radio="field.type" :repeaterType="field.type" :transformList="transform" :type="field.type"
                          :changeRules="changeRules" :repeaterFieldType="translateTypes[index]"
                          :id="index" :key="index" @addRepeater="sync" @editRepeater="edit"></Repeater>
            </div>
        </div>
        <div class="field is-grouped">
        <div class="control">
            <button class="button is-primary" @click="addField">Add Repeater</button>
        </div>
        <div class="control">
            <button class="button is-info" @click="addMoreRepeaterFields">Add More Repeater Fields</button>
        </div>
        </div>

    </div>
</template>

<script>
    import Repeater from './Repeater'
    import {mapActions} from 'vuex'
    export default {
        name: "MainRepeater",
        props: {
            listFields: Object,
            transformList: Boolean,
            changeRules: Boolean,
            translatedList: Object,
            repeaterTypes: Array,
            repeaterType: String,
        },
        components: {
            Repeater
        },
        data () {
            return {
                buildFields: [],
                translateRepeater: {},
                currentRepeater: [],
                translateTypes: [],
                transform: false,
                count: 0,
                fields: {
                    type: 'inputrepeat',
                    name: '',
                    title: '',
                    items: [],
                    min: 0,
                    max: 0
                }
            }
        },
        methods: {
            ...mapActions({
                toAddField: 'addField',
                toEditField: 'editField'
            }),
            sync (value) {
                console.log(value)
                this.currentRepeater.push(value);
            },
            edit(value) {
                this.translateRepeater.items.pop();
                this.translateRepeater.items.push(value);
            },
            addMoreRepeaterFields() {
                this.buildFields.push({
                    id: this.count++,
                    items: this.currentRepeater
                });
            },
            addField() {
                const fields = {
                    type: 'inputrepeat',
                    name: this.fields.name === "" ? this.fields.name = this.fields.title.replace(/[\s,&\-/_?():]/g,"").toLowerCase() : this.fields.name,
                    title: this.fields.title,
                    min: this.fields.min,
                    max: this.fields.max,
                    items: this.currentRepeater
                };
                this.toAddField(fields);
                return fields;
            },
            editField() {
                const editFields = {
                    type: 'inputrepeat',
                    name: this.fields.name === "" ? this.fields.name = this.fields.title.replace(/[\s,&\-/_?():]/g,"").toLowerCase() : this.fields.name,
                    title: this.fields.title,
                    min: this.fields.min,
                    max: this.fields.max,
                    items: this.currentRepeater
                };
                this.toEditField(editFields);
                return editFields;
            }
        },
        beforeMount() {
            this.translateRepeater = this.translatedList;
            this.translateTypes = this.repeaterTypes;
            this.transform = this.transformList;
        }
    }
</script>

<style scoped>

</style>