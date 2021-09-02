<template>
<div class="formSection">
  <p class="panel-heading"> <span class="is-clickable" @click="toggle= !toggle">Field  ->  Collapse/Expand   <font-awesome-icon :icon="['fas','angle-double-down']"/></span></p>
  <div class="columns is-grouped" v-show="toggle">
  <div class="column is-one-fifth" >
    <div v-for="fieldType in types" >
      <button class="customButton"
              @click="updateComponent(fieldType)">
        <font-awesome-icon :icon="['fas',fieldType.icon]"></font-awesome-icon>  {{fieldType.label}}</button>
    </div>

  </div>
<div class="column">
  <div class="formSection">
    <component :is="currentComponent"></component>
  </div>
</div>



</div>
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
      toggle:true,
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
.formSection {
  border: #b5b5b5 solid 1px;
  margin-bottom: 50px;
}
</style>