<template>
  <div class="panel">
    <p class="panel-heading"> <span class="is-clickable" @click="toggle= !toggle">Decoration Text Field -> {{ fields.title}} - Collapse/Expand   <font-awesome-icon :icon="['fas','angle-double-down']"/></span></p>
    <div class="section" v-show="toggle">
        <div class="field">
            <div class="control">
                <label class="label"> Body/Text For Text</label>
              <textarea class="textarea is-fullwidth" type="text" :listFields="listFields.body" v-model="fields.body"></textarea>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label"> Name For Text</label>
                <input class="input" type="text" :listFields="listFields.name" v-model="fields.name">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label"> Hidden Text?</label>
                <input class="checkbox" type="checkbox" :listFields="listFields.hidden" v-model="fields.hidden">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label">Paragraph text?</label>
                <input class="checkbox" name="required" type="checkbox" v-model="isParagraph" @click="changeToParagraph">
            </div>
        </div>
    </div>
  </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {mapGetters} from 'vuex'

    export default {
        name: "HeaderComponent",
        props: {
            listFields: Object,
        },
        data () {
            return {
              toggle: true,
                isParagraph: false,
                fields: {
                    type: 'text',
                    name: '',
                    body: '<h3></h3>',
                    hidden: 0
                }
            }
        },
        methods: {
            ...mapActions({
                toAddField: 'addField',
                toEditField: 'editField',
              toDeleteField: 'deleteField'
            }),
            ...mapGetters(['getTransform','getRules']),
            changeToParagraph() {
                this.isParagraph = true;
              this.fields.body = this.isParagraph ? '<p></p>' : '<h3></h3>';
            },
            addField() {
                const fields = {
                    type: 'text',
                    name: this.fields.name,
                    body:  this.fields.body,
                    hidden: this.fields.hidden
                };
                this.toAddField(fields);
                return fields;
            },
            editField () {
                const editFields = {
                    type: 'text',
                    name: this.fields.name,
                    body: this.isParagraph ? '<p></p>' : this.fields.body,
                    hidden: this.fields.hidden
                };
                this.toEditField(editFields);
                return editFields;
            },
          deleteField() {
            this.toDeleteField(this.fields);
            return this.fields;
          }
        },
        beforeMount() {
            if (this.getTransform() && !this.getRules()) {
                this.fields = this.listFields;
            }
        }

    }
</script>

<style scoped>

</style>