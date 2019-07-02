<template>
    <div class="section">
    <div class="field">
        <div class="control">
            <label class="label"> Name For Text</label>
            <input class="input" type="text" :listFields="listFields.name" v-model="fields.name">
        </div>
    </div>
       <div class="field">
           <div class="control">
               <label class="label"> Title For Text</label>
               <input class="input" type="text" :listFields="listFields.title" v-model="fields.title">
           </div>
       </div>
       <div class="field">
           <div class="control">
               <label class="label"> Limit Field For Text</label>
               <input class="input" type="text" :listFields="listFields.limit" v-model="fields.limit">
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
                <label class="label">Enabled ?</label>
                <input class="checkbox" type="checkbox" name="enabled" :listFields="listFields.enabled" v-model="fields.enabled">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label">Default</label>
                <input class="input" type="text" name="default" :listFields="listFields.default" v-model="fields.default">
            </div>
        </div>

    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: "TextComponent",
        props: {
            listFields: Object,
        },
        data () {
            return {
                fields: {
                    type: 'inputtext',
                    name: '',
                    title: '',
                    limit: 255,
                    hidden: false,
                    default: '',
                    required: false,
                    enabled:false
                }
            }
        },
        methods: {
            ...mapActions({
               toAddField: 'addField',
            }),
            addField() {
               const fields = {
                   type: 'inputtext',
                   title: this.fields.title,
                   name: this.fields.name === "" ? this.fields.title.replace(/[\s,&\-/_?]/g,"").toLowerCase() : this.fields.name,
                   hidden: this.fields.hidden,
                   limit: this.fields.limit,
                   default: this.fields.default,
                   required: this.fields.required,
                   enabled: this.fields.enabled
               };
                this.toAddField(fields);
                return fields;
            },
            editField (fields) {
               const field = {
                    type: 'inputtext',
                    title: fields.title,
                    name: fields.name === "" ? this.fields.title.replace(/[\s,&\-/_?]/g,"").toLowerCase() : fields.name,
                    hidden: fields.hidden,
                    limit: fields.limit,
                    default: fields.default,
                    required: fields.required,
                    enabled: fields.enabled
                };
               return field;
            }
        },
    }
</script>

<style scoped>

</style>