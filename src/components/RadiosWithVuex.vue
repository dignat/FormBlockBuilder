<template>
 <div class="control" >
  <div v-for="fieldType in types">
    <button class="customButton"
            @click="updateType(fieldType)">
      <font-awesome-icon :icon="['fas',fieldType.icon]"></font-awesome-icon>  {{fieldType.label}}</button>
  </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import {mapGetters} from 'vuex';
export default {
name: "RadiosWithVuex",

  methods: {
  ...mapActions({
    changeType: 'changeType'
  }),
    updateType(fieldType) {
    this.changeType(fieldType)
    }
  },
  computed: {
    ...mapGetters({
      types: 'getTypes',
    }),
  }
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