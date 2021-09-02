<template>
  <div class="panel" >
    <p class="panel-heading"><i>Text box , to insert a free text</i> </p>
    <div class="section">
      <div class="field">
        <div class="control">
          <label class="label"> Title For Text</label>
          <input class="input" type="text"  v-model="fields.title" :placeholder="fields.title">
          <label class="label">Choose slices from title to generate name ( ex. 0,1,2 - start from 0)</label>
          <input class="input" type="text" v-model="slices">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label"> Name For Text</label>
          <input class="input" type="text" v-model="fields.name">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label"> Limit Field For Text</label>
          <input class="input" type="number"  v-model="fields.limit">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label">Hidden ?</label>
          <input class="checkbox" type="checkbox" name="hidden" v-model="fields.hidden">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label">Required ?</label>
          <input class="checkbox" type="checkbox" name="required"  v-model="fields.required">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label">Enabled ?</label>
          <input class="checkbox" type="checkbox" name="enabled"  v-model="fields.enabled">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label">Link ?</label>
          <input class="checkbox" type="checkbox" name="enabled"  v-model="fields.link">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label">Default</label>
          <input class="input" type="text" name="default" v-model="fields.default">
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-primary" @click.once="add(fields)">Create Field</button>
        </div>
        <div class="control">
          <button class="button is-primary" @click="edit(fields)">Edit Field</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex';
export default {
name: "TextComponentWithVuex",
  data() {
  return {
    fields: {
      type: '',
      name: '',
      title: '',
      limit: 255,
      hidden: 0,
      default: '',
      required: 0,
      enabled: 1,
      link: 0
    },
  }
  },
  methods: {
  ...mapActions({
    add: 'createInputField',
    edit: 'editInputField'
  }),
  },
  computed: {
    slices: {
      get: function() {
        return this.$store.state.slices
      },
      set: function (newVal) {
        this.$store.commit('updateSlices', newVal)
      }
    }
  }
}
</script>

<style scoped>

</style>