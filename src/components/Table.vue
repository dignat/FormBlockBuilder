<template>
<div>
    <froala :tag="'textarea'" :config="config" v-model="model">Init text</froala>
</div>
</template>

<script>
    import VueFroala from 'vue-froala-wysiwyg'
    export default {
        name: "Table",
        data() {
            return {
                config: {
                    events: {
                        'froalaEditor.initialized': function () {
                            console.log('initialized')
                        }
                    }
                },
                model: '<p>Edit your content here</p>'
            }
        }

    }
</script>

<style scoped>
.pdf{
    border: #0a0a0a;
}
</style>