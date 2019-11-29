<template>
    <div>
        <button @click="generateHide(fields.name, 'string', 'test', 'my text')">Generate Script</button>
        <div class="field">
            <div class="control">
                <label class="label">Title for Formula</label>
                <input class="input" name="title" type="text" :listFields="listFields.title" v-model="fields.title">
                <label class="label">Name for Formula</label>
                <input class="input" name="name" type="text" :listFields="listFields.name" v-model="fields.name">
                <label class="label">Script</label>
                <input class="input" name="script" type="text" :listFields="listFields.script" v-model="fields.script">
                <label class="label">Hidden Formula?</label>
                <input class="checkbox" name="hidden" type="checkbox" :listFields="listFields.hidden" v-model="fields.hidden">
                <label class="label">Required Formula?</label>
                <input class="checkbox" name="required" type="checkbox" :listFields="listFields.required" v-model="fields.required">
                <label class="label">Store Formula?</label>
                <input class="checkbox" name="required" type="checkbox" :listFields="listFields.store" v-model="fields.store">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Test Formula",
        props: {
            listFields: Object
        },
        data() {
            return {
                types: [],
                fields: {
                    type: "inputformula",
                    title: '',
                    name: '',
                    hidden: 0,
                    script: '',
                    store: 0,
                    required: 0
                }
            }
        },
        methods: {
            generateHide(type, typeOfControllerField, controllerField, fieldToHide) {
                switch(typeOfControllerField) {
                    case 'string':
                        console.log(typeOfControllerField);
                        this.fields.script = `form=GetForm();result=form.GetStringValue('${controllerField}');if (result == "Yes"){form.SetDisplay('${fieldToHide}',1);}else{form.SetDisplay('${fieldToHide}',0);}`;
                        break;
                }
            }
        }
    }
</script>

<style scoped>

</style>