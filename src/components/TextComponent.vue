<template>
    <div class="section">
    <div class="field">
        <div class="control">
            <label class="label"> Name For Text</label>
            <input class="input" type="text" :listFields="listFields.name" v-model="textfields.name">
        </div>
    </div>
       <div class="field">
           <div class="control">
               <label class="label"> Title For Text</label>
               <input class="input" type="text" :listFields="listFields.title" v-model="textfields.title">
           </div>
       </div>
       <div class="field">
           <div class="control">
               <label class="label"> Limit Field For Text</label>
               <input class="input" type="text" :listFields="listFields.limit" v-model="textfields.limit">
           </div>
       </div>
        <div class="field">
            <div class="control">
                <label class="label">Hidden ?</label>
                <input class="checkbox" type="checkbox" name="hidden" :listFields="listFields.hidden" v-model="textfields.hidden" :value="textfields.hidden">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label">Required ?</label>
                <input class="checkbox" type="checkbox" name="required" :listFields="listFields.required" v-model="textfields.required">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label">Enabled ?</label>
                <input class="checkbox" type="checkbox" name="enabled" :listFields="listFields.enabled" v-model="textfields.enabled">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label">Default</label>
                <input class="input" type="text" name="default" :listFields="listFields.default" v-model="textfields.default">
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "TextComponent",
        props: {
            listFields: Object,
        },
        data () {
            return {
                textfields: {
                    type: 'inputtext',
                    name: '',
                    title: '',
                    limit: '',
                    hidden: "0",
                    default: '',
                    required: 0,
                    enabled: 0
                }
            }
        },
        methods: {
            addField() {
                console.log(this.textfields.hidden);
               this.textfields.type = 'inputtext';
               this.textfields.name =  this.textfields.name === undefined ? this.textfields.title.replace(/[\s,&\-/_?]/g,"").toLowerCase() : this.textfields.name;
               //this.textfields.hidden = (this.textfields.hidden) ? 1 : 0;
               return this.textfields;
            },
            editField (fields) {
                this.textfields.name =  this.textfields.name === undefined ? this.textfields.title.replace(/[\s,&\-/_?]/g,"").toLowerCase() : this.textfields.name;
                this.textfields = fields;
                return this.textfields;
            }
        },
        beforeMount() {
            this.textfields = this.listFields;
        }
    }
</script>

<style scoped>

</style>