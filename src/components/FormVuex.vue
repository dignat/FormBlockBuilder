<template>
<div class="container">
  <div class="control" >
    <div v-for="fieldType in types">
      <button class="customButton"
              @click="updateComponent(fieldType)">
        <font-awesome-icon :icon="['fas',fieldType.icon]"></font-awesome-icon>  {{fieldType.label}}</button>
    </div>
  </div>
    <component :is="currentComponent"></component>
</div>
</template>

<script>
import {mapState,mapActions, mapGetters} from 'vuex';
import RadiosWithVuex from "./RadiosWithVuex";
import Vue from "vue";
export default {
  name: "FormVuex",
  data() {
    return {
     currentComponent: null
    }
  },
  components: {
    RadiosWithVuex,
  },
  methods: {
    ...mapActions({
      handleChange : 'handleComponent',
      changeType: 'changeType'
    }),
    updateComponent(fieldType) {
      this.changeType(fieldType)
      this.handleChange(fieldType)
      this.currentComponent = this.fieldComponent
    }
  },
  computed: {
    ...mapGetters({
      fieldComponent: 'getComponentType',
      type: 'getType',
      types: 'getTypes',
    }),
  },

}
</script>

<style scoped>
.customButton{
  border: 1px solid #b5b5b5;
  color: #0a0a0a;
  background-color: white;
  padding: 10px 10px;
  margin: 0 0px;
  text-align: left;
  font-size: 14px;
  cursor: pointer;
  width: 115px;

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