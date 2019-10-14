<template>
    <div class="control" >
<div v-for="fieldType in types">
            <label class="radio" for="fieldType">
                <input type="radio" :radio="radio" ref="form"
                       :id="fieldType" :value="fieldType"
                       :types="fieldType.types" v-model="radioModel" @change="updateChange">
                <strong><i>{{ fieldType }}</i></strong></label>
</div>
    </div>
</template>

<script>
    import Radios from './Radios'
    export default {
        name: "Radios",
        components: {
            Radios
        },
    props: {
        types: Array,
        radio: String
        },
        data() {
            return {
                radioModel: ''
            }
        },
        methods: {
            updateChange () {
                this.$emit('change', this.radioModel);
            }
        },

        beforeMount() {
            this.radioModel = this.radio
        }
    }
</script>

<style scoped lang="scss">

</style>