<template>
    <div>
        <label class="label" v-html="title"></label>
        <input class="input is-medium" :type="type.replace('input','')" v-bind:style="{width: width}" v-if="!['inputselect','inputmultiselect','inputlookup','inputrepeat', 'inputlist', 'inputradio','inputsignature'].includes(type)"/>

        <div class="select is-primary"   v-if="type === 'inputselect' || type === 'inputmultiselect'">
            <select v-bind:items="items">
                <option v-html="item.title" v-for="item in items"></option>
            </select>
        </div>
        <div class="select is-primary" v-if="type === 'inputlookup'">
            <select >
                <option v-html="title"></option>
            </select>

        </div>
        <div v-bind:items="items" v-if="type === 'inputrepeat'">
            <div v-for="item in items">
                <label v-html="item.title"></label>
                <input  class="input is-medium" :type="item.type.replace('input','')">
            </div>
            <button>Copy</button> <button>Add {{title}}</button>
        </div>
        <div v-bind:template="template" v-if="type === 'inputlist'">
            <div v-for="item in template">
                <label v-html="item.title"></label>
                <input   class="input is-medium" :type="item.type.replace('input','')" v-bind:style="{width:item.width}"/>
            </div>
        </div>
        <div v-bind:items="items" v-if="type === 'inputradio'" v-for="item in items">
            <label v-html="item.title"></label>
                <input  class="input is-medium" :type="type.replace('input','')" v-bind:style="{width:width}"/>

        </div>
        <div v-if="type === 'inputsignature'" class="control">
            <button class="button is-info">{{title}}</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Html",
        props: {
            type: String,
            width: String,
            title: String,
            items: Array,
            template: Array
        }
    }
</script>

<style scoped>

</style>