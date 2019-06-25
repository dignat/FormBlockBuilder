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
                <label class="label">List Itarator Key</label>
                <input class="input" type="text" name="iteratorKey" :listFields="listFields.iteratorKey" v-model="fields.iteratorKey">
            </div>
            <div class="control">
                <label class="label">List Target</label>
                <input class="input" type="text" name="target" :listFields="listFields.target" v-model="fields.target">
            </div>
            <div class="control" v-if="!transform">
                    <ListComponent ref="form" v-for="(field, index) in buildFields" :listFields="fields.template" v-model="fields.template"
                               :id="index" :key="index" @addList="sync"></ListComponent>
            </div>
            <div class="control" v-if="transform">
                <ListComponent ref="form" v-for="(field, index) in translateList.template" :listFields="field"
                               :radio="field.type" :listFieldType="field.type" :hasList="hasList"
                               :transformList="transform" :changeRules="changeRules" :listFieldTypes="listFieldTypes[index]"
                               :id="index" :key="index" @addList="sync"></ListComponent>
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
    export default {
        name: "MainListComponent",
        props: {
            listFields: Object,
            transformList: Boolean,
            changeRules: Boolean,
            translatedList: Object,
            listFieldTypes: Object,
            listFieldType: String,
            dependantListTypes: Array,
            hasList: Boolean
        },
        components: {
            ListComponent
        },
        data () {
            return {
                buildFields: [],
                currentListFields: [],
                translateList: [],
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
            sync (value) {
                this.currentListFields.push(value);
            },
            addMoreListFields() {
                console.log(this.$refs.form, 'in the main list');
                this.buildFields.push({
                    id: this.count++,
                    template: this.currentListFields
                });
            },
            addField() {
                this.fields.template= this.currentListFields
                this.fields.type = 'inputlist'
                Object.assign({}, {type: '', title: '', name: '', iteratorKey: '', target: ''});
                return this.fields;
            }
        },
         beforeMount() {
            this.fields = this.listFields
             this.translateList = this.translatedList
             this.transform = this.transformList
             this.dependantList = this.hasList
         }
    }
</script>

<style scoped>

</style>