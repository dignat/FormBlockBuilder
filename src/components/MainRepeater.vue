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
            <div v-if="!transform" class="control">
                <Repeater ref="form" v-for="(field, index) in buildFields" :listFields="fields.items"
                          :id="index" :type=field.type :key="index" v-model="fields.items"
                          @addRepeater="sync"></Repeater>
            </div>
            <div v-if="transform" class="control">
                <Repeater ref="form" v-for="(field, index) in translateRepeater.items" :listFields="field"
                          :radio="field.type" :repeaterType="field.type" :transformList="transform"
                          :changeRules="changeRules" :repeaterTypes="repeaterTypes[index]"
                          :id="index"  :key="index" @addRepeater="sync"></Repeater>
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
    export default {
        name: "MainRepeater",
        props: {
            listFields: Object,
            transformList: Boolean,
            changeRules: Boolean,
            translatedList: Object,
            repeaterTypes: Object,
            repeaterType: String,
        },
        components: {
            Repeater
        },
        data () {
            return {
                buildFields: [],
                translateRepeater: [],
                currentRepeater: [],
                transform: false,
                count: 0,
                fields: {
                    type: 'inputrepeat',
                    name: '',
                    title: '',
                    items: []
                }
            }
        },
        methods: {

            sync (value) {
                console.log(value)
                this.currentRepeater.push(value);
            },
            addMoreRepeaterFields() {
                this.buildFields.push({
                    id: this.count++,
                    items: this.currentRepeater
                });
            },
            addField() {
                this.fields.items = this.currentRepeater;
                this.fields.type = 'inputrepeat';
                Object.assign({}, {type: '', title: '', name: ''});
                this.fields.name === "" ? this.fields.title.replace(/[\s,&\-/_?():]/g,"").toLowerCase() : this.fields.name;
                return this.fields;
            }
        },
        beforeMount() {
            this.fields = this.listFields
            this.transform = this.transformList
            this.translateRepeater = this.translatedList
        }
    }
</script>

<style scoped>

</style>