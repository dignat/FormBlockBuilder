<template>
  <div>
    <b>{{ name }} (id: {{ id }})</b>
    <ul>
      <li v-for="child in children">
        <input type="text" :id="child.id" :name="child.name" :children="child.children">
      </li>
    </ul>
  </div>
</template>

<script>
  import Field from './Field'

  export default {
    name: 'Field',
    components: {
      Field
    },
    props: {
      id: Number,
      name: String,
      children: Array
    },
  }
</script>

<style scoped>
</style>
