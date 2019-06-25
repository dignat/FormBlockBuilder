<template>
  <div>
    <b>{{ name }}</b>
    <ul>
      <li v-for="child in children">
        <Field :id="child.id" :name="child.name" :children="child.children"></Field>
      </li>
    </ul>
  </div>
</template>

<script>
  import Field from './Field'

  export default {
    name: 'Form',
    components: {
      Field
    },
    props: {
      name: String,
      children: Array
    },
  }
</script>

<style scoped>
</style>
