<template>
    <div class="control" >
<div v-for="fieldType in types">
  <button class="customButton" :radio="radio" ref="form"
          :id="fieldType.name" :value="fieldType.name"
          @click="updateChange(fieldType.name)"><font-awesome-icon :icon="['fas',fieldType.icon]"></font-awesome-icon>  {{fieldType.label}}</button>


            <!--<label class="radio" for="fieldType">
                <input type="radio" :radio="radio" ref="form"
                       :id="fieldType" :value="fieldType"
                       :types="types" v-model="radioModel" @change="updateChange">
                <strong><i>{{ fieldType }}</i></strong></label>-->
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
        radio: String,
        },
        data() {
            return {
                radioModel: '',
            }
        },
        methods: {
            updateChange (fieldType) {
              this.$emit('click', fieldType);
                this.$emit('change', fieldType);
            }
        },

        beforeMount() {
            this.radioModel = this.radio
        }
    }
</script>

<style scoped lang="scss">
.customButton{
  border: 1px solid #b5b5b5;
  color: #0a0a0a;
  background-color: white;
  padding: 25px 35px;
  margin: 0 10px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  width: 180px;

}
.glyph {
  position: absolute;
  left: 90px;
  top: 5px;
  pointer-events: none;
}
.customButton.focus, .customButton:focus {
  outline: 0;
  box-shadow: none!important;
}
</style>