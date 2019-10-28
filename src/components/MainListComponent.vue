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
            <div class="control">
                <label class="label">Target -1</label>
                <input class="checkbox" type="checkbox" name="targetStatus" @change="!targetStatus === targetStatus" v-model="targetStatus">
            </div>
            <div class="control" v-if="!transform">
                    <ListComponent ref="form" v-for="(field, index) in buildFields" :listFields="field" v-model="fields.template"
                               :id="index" :key="index" @addList="sync" @editList="edit"></ListComponent>
            </div>
            <div class="control" v-if="transform">
                <ListComponent ref="form" v-for="(field, index) in translatedInputList.template" :listFields="field" v-model="fields.template"
                               :radio="field.type" :hasList="dependantList" :fieldListType="field.type" :type="field.type" :deepDependantType="field.type"
                               :transformList="transform" :changeRules="changeRules" :listFieldType="translatedListTypes[index]"
                               :deepDependantListFieldType="deepDependantTypes[index]"
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
    import {mapGetters} from 'vuex'
    export default {
        name: "MainListComponent",
        props: {
            listFields: Object,
            deepDependantListTypes: Array,
            transformList: Boolean,
            changeRules: Boolean,
            translatedList: Object,
            fieldListType: String,
            listFieldType: Object,
            deepDependantListFieldType: Object,
            dependantTypes: Array,
            hasList: Boolean,
            deepDependantType: String,},
        components: {
            ListComponent
        },
        data () {
            return {
                targetStatus: false,
                buildFields: [],
                currentListFields: [],
                translatedInputList: {},
                translatedListTypes:[],
                deepDependantTypes:[],
                transform: false,
                dependantList: false,
                transformedArray: [],
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
            ...mapGetters(['getTransform','getRules']),

            sync (value) {
                this.currentListFields.push(value);
            },
            edit(value) {

            },
            addMoreListFields() {
                console.log(this.currentListFields, 'in the main list');
                this.buildFields.push({
                    id: this.count++,
                    template: this.currentListFields
                });
            },
            addField() {
                const fields = {
                    type: 'inputlist',
                    name: this.fields.name === "" ? this.fields.name = this.fields.title.replace(/[\s,&\-/_?():]/g,"").toLowerCase() : this.fields.name,
                    title: this.fields.title,
                    iteratorKey: this.fields.iteratorKey,
                    target: this.fields.target,
                    template: this.currentListFields
                };
                if(this.targetStatus) {
                    delete Object.assign(fields, {['uri']:fields['iteratorKey']})['iteratorKey'];
                }
                this.toAddField(fields);
                return fields;
            },
            editField() {
                const editFields = {
                    type: 'inputlist',
                    name: this.fields.name === "" ? this.fields.name = this.fields.title.replace(/[\s,&\-/_?():]/g,"").toLowerCase() : this.fields.name,
                    title: this.fields.title,
                    iteratorKey: this.fields.iteratorKey,
                    target: this.fields.target,
                    template: this.currentListFields
                };
                this.toEditField(editFields);
                return editFields;
            }
        },
        beforeMount() {
            if (this.getTransform() && !this.getRules()) {
                this.fields = this.listFields;
            }
            this.translatedInputList = this.listFields;
            this.translatedListTypes = this.dependantTypes;
            this.deepDependantTypes = this.deepDependantListTypes;
            this.transform=this.transformList;
            this.dependantList = this.hasList;
        }
    }
</script>

<style scoped>

</style>