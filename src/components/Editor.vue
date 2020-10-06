<template>
    <div>
        <ckeditor  :table="table" :value="editorTable" :allowedContent="allowedContent" :config="editorConfig"></ckeditor>
        <code>{{ table }}</code>
    </div>
</template>

<script>
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
    export default {
        name: "Editor",
        props: {
            table: String
        },
        data() {
            return {
                editor: ClassicEditor,
                editorData: '',
                allowedContent: true,
                editorConfig: {

                }
            }
        },
        computed: {
            editorTable: {
                get: function() {
                    return this.table
                },
                set: function () {

                }
            }
        }
    }
</script>

<style scoped>

</style>