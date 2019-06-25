<template>
    <div class="section">
        <div class="field">
            <div class="control">
                <label class="label">Alias Name</label>
                <input class="input" type="text" name="name" v-model="fields.name">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label">Alias Title</label>
                <input class="input" type="text" name="title" v-model="fields.title">
            </div>
        </div>
       <div class="field">
           <div class="control">
               <label class="label">Alias Target</label>
               <input class="input" type="text" name="target" v-model="fields.target">
           </div>
       </div>
        <div class="field">
            <div class="control">
                <label class="label">Alias Label Key</label>
                <input class="input" type="text" name="labelKey" v-model="fields.labelKey">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label">Alias Id Key</label>
                <input class="input" type="text" name="idKey" v-model="fields.idKey">
            </div>
        </div>

        <div class="field">
            <div class="control">
                <label class="label">Alias Enabled</label>
                <input class="checkbox" type="checkbox" name="enabled" v-model="fields.enabled">
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Alias",
        props: {
            listFields: Object
        },
        data () {
            return {
                fields: {
                    type: 'inputlookupalias',
                    name: '',
                    title: '',
                    target: '',
                    labelKey: '',
                    idKey: '',

                    enabled: false
                }
            }
        },
        methods: {
            addField () {
                Object.assign({}, {title: '', name: '', target: '', labelKey: '', idKey: '',  enabled: false});
                return this.fields;
            }
        },
         beforeMount() {
            this.fields = this.listFields;
             this.fields.type = "inputlookupalias";
         }
    }
</script>

<style scoped>

</style>