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
                    hidden: '',
                    default: '',
                    required: '',
                    enabled: ''
                }
            }
        },
        methods: {
            addField() {
               Object.assign({}, {title: '', name: '', limit: '', hidden: '', default: '', required: '', enabled: ''});
               this.textfields.type = 'inputtext';
               this.textfields.name =  this.textfields.name.length === 0 ? this.textfields.title.replace(/[\s,&\-/_?]/g,"").toLowerCase() : this.textfields.name;
                 return this.textfields;
            },
            editField (fields) {
                this.textfields = fields;
                return this.textfields
            }
        },
        beforeMount() {
            this.textfields = this.listFields;
        }
    }
</script>

<style scoped>

</style>