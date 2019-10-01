<template>
    <div class="section">
        <div class="field">
            <div class="control">
                <label class="label">List Name</label>
                <input class="input" type="text" name="name" :listFields="listFields.name" v-model="fields.name">
            </div>
            <div class="control">
                <label class="label">List Title</label>
                <input class="input" type="text" name="title" :listFields="listFields.title" v-model="fields.title">
            </div>
            <div class="control">
                <label class="label">List Iterator Key</label>
                <input class="input" type="text" name="iteratorKey" :listFields="listFields.iteratorKey" v-model="fields.iteratorKey">
            </div>
            <div class="control">
                <label class="label">List Target</label>
                <input class="input" type="text" name="target" :listFields="listFields.target" v-model="fields.target">
            </div>
            <div class="control" v-if="!transform">
                    <ListComponent ref="form" v-for="(field, index) in buildFields" :listFields="fields" v-model="fields.template"
                               :id="index" :key="index" @addList="sync" @editList="edit"></ListComponent>
            </div>
            <div class="control" v-if="transform">
                <ListComponent ref="form" v-for="(field, index) in translatedInputList.template" :listFields="field" v-model="fields.template"
                               :radio="field.type" :hasList="hasList"  :fieldListType="field.type" :type="field.type"
                               :transformList="transform" :changeRules="changeRules" :listFieldType="translatedListTypes[index]"
                               :id="index" :key="index" @addList="sync" @editList="edit"></ListComponent>
            </div>
        </div>

    <div class="field is-grouped">
        <div class="control">
            <button class="button is-primary" @click="addField">Add List</button>
        </div>
        <div class="control">
            <button class="button is-info" @click="addMoreListFields">Add More List Fields</button>
        </div>
    </div>
    </div>
    
</template>

<script>
    import ListComponent from "./ListComponent"
    import {mapActions} from 'vuex'
    export default {
        name: "MainListComponent",
        props: {
            listFields: Object,
            transformList: Boolean,
            changeRules: Boolean,
            translatedList: Object,
            fieldListType: String,
            listFieldType: {},
            dependantTypes: Array,
            hasList: Boolean
        },
        components: {
            ListComponent
        },
        data () {
            return {
                buildFields: [],
                currentListFields: [],
                translatedInputList: {},
                translatedListTypes:[],
                transform: false,
                dependantList: false,
                count: 0,
                fields: {
                    type: 'inputlist',
                    name: '',
                    title: '',
                    iteratorKey: '',
                    target: '',
                    template: []
                }
            }
        },
        methods: {
            ...mapActions({
                toAddField: 'addField',
                toEditField: 'editField'
            }),
            sync (value) {
                this.currentListFields.push(value);
            },
            edit(value) {
              this.translatedInputList.template.pop();
              this.translatedInputList.template.push(value)
            },
            addMoreListFields() {
                console.log(this.$refs.form, 'in the main list');
                this.buildFields.push({
                    id: this.count++,
                    template: this.currentListFields
                });
            },
            addField() {
                const fields = {
                    type: 'inputlist',
                    name: this.fields.name === "" ? this.fields.title.replace(/[\s,&\-/_?():]/g,"").toLowerCase() : this.fields.name,
                    title: this.fields.title,
                    iteratorKey: this.fields.iteratorKey,
                    target: this.fields.target,
                    template: this.currentListFields
                };
                this.toAddField(fields);
                return fields;
            },
            editField() {
                this.fields.name === "" ? this.fields.title.replace(/[\s,&\-/_?():]/g,"").toLowerCase() : this.fields.name;
                this.fields.template = this.currentListFields;
                this.toEditField(this.fields);
                return this.fields;
            }
        },
        beforeMount() {
            this.translatedInputList = this.translatedList;
            this.translatedListTypes = this.dependantTypes;
            this.transform=this.transformList;
        }
    }
</script>

<style scoped>

</style>