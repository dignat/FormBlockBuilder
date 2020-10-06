<template>
    <div class="section">
        <div class="field">
            <div class="control">
                <label class="label">Repeater Title</label>
                <input class="input" type="text" name="title" :listFields="listFields.title" v-model="fields.title">
                <label class="label">Choose slices from title to generate name ( ex. 0,1,2 - start from 0)</label>
                <input class="input" type="text"  v-model="slices">
            </div>
            <div class="control">
                <label class="label">Repeater Name</label>
                <input class="input" type="text" name="name" :listFields="listFields.name" v-model="fields.name">
            </div>
            <div class="control">
                <label class="label">Repeater Item Title</label>
                <input class="input" type="text" name="item_title" :listFields="listFields.item_title" v-model="fields.item_title">
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
                          @addRepeater="sync" @editRepeater="edit" @deleteRepeater="deleteField(index)"></Repeater>
            </div>
            <div v-if="transform" class="control">
                <Repeater ref="form" v-for="(field, index) in translateRepeater.items" :listFields="field" v-model="fields.items"
                          :radio="field.type" :repeaterType="field.type" :transformList="transform" :type="field.type"
                          :changeRules="changedRules" :repeaterFieldType="translateTypes[index]"
                          :id="index" :key="index" @addRepeater="sync" @editRepeater="edit(field, index)"></Repeater>
            </div>
        </div>
        <div class="field is-grouped">
        <div class="control">
            <button class="button is-primary" @click="addField">Add Repeater</button>
        </div>
        <div class="control">
            <button class="button is-info" @click="addMoreRepeaterFields">Add More Repeater Fields</button>
        </div>
        <div class="control">
            <button class="button is-info" @click="removeRepeaterFields" :disabled="buildFields.length===0">Remove Fields From Repeater</button>
        </div>
        </div>

    </div>
</template>

<script>
    import Repeater from './Repeater'
    import {mapActions} from 'vuex'
    import {mapGetters} from 'vuex'
    import appMixin from '../mixins'

    export default {
        name: "MainRepeater",
        mixins: [appMixin],
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
                slices: '',
                buildFields: [],
                translateRepeater: {},
                currentRepeater: [],
                translateTypes: [],
                transform: false,
                changedRules: false,
                count: 0,
                fields: {
                    type: 'inputrepeat',
                    name: '',
                    title: '',
                    item_title: '',
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
            ...mapGetters(['getTransform','getRules','editedName']),
            sync (value) {
                console.log(value)
                this.currentRepeater.push(value);
            },
            edit(value, id) {
                if (this.transform) {
                    for(let i = 0; i < this.translateRepeater.items.length; i++) {
                        if (this.translateRepeater.items[i] === id) {
                            Object.assign(this.translateRepeater.items[i], value);
                        }
                    }
                } else {
                    for(let i = 0; i < this.currentRepeater.length; i++) {
                        if (this.currentRepeater[i].name === value.name) {
                            Object.assign(this.currentRepeater[i], value);
                        }else if (value.name ===this.editedName()) {
                            value.name = this.editedName();
                            Object.assign(this.currentRepeater[i], value);
                        }
                    }
                }


            },
            deleteField(value) {
                console.log(value)
                this.buildFields[0].items.splice(value,1);
                let buildIndex = this.buildFields.map((item) => item.id).indexOf(value);
                let listToDelete = [value];
                this.buildFields = this.buildFields.filter((item) => listToDelete.indexOf(item.id) === -1);


                console.log(this.buildFields)
            },
            removeRepeaterFields() {
                this.buildFields.pop();
            },
            addMoreRepeaterFields() {
                if (this.currentRepeater.length > 1) {
                    if (this.uniqueFieldName(this.currentRepeater)) {
                        alert('The field that you just added has a duplicate name!!!');
                    }
                }

                this.buildFields.push({
                    id: this.count++,
                    items: this.currentRepeater
                });
            },
            addField() {
                const fields = {
                    type: 'inputrepeat',
                    name: this.fields.name === "" ? this.fields.name =  this.nameGenerator(this.fields.title,this.slices.length > 0 ? this.slices.split(',') : []) : this.fields.name,
                    title: this.fields.title,
                    item_title: this.fields.item_title,
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
                    name: this.fields.name === "" ? this.fields.name =  this.nameGenerator(this.fields.title) : this.fields.name,
                    title: this.fields.title,
                    item_title: this.fields.item_title,
                    min: this.fields.min,
                    max: this.fields.max,
                    items: this.currentRepeater
                };
                this.toEditField(editFields);
                return editFields;
            }
        },
        beforeMount() {
            if (this.getTransform() && !this.getRules()) {
                this.fields = this.listFields;
            }
            this.translateRepeater = this.translatedList;
            this.translateTypes = this.repeaterTypes;
            this.transform = this.transformList;
            this.changedRules = this.changeRules;
        }
    }
</script>

<style scoped>

</style>