<template>
    <div>
        <label class="label" v-html="title" v-if="!['inputsignature'].includes(type)"></label>
        <input class="input is-medium" :type="type.replace('input','')" v-bind:style="{width: width}" v-if="!['inputselect','inputmultiselect','inputlookup','inputrepeat', 'inputlist', 'inputradio','inputsignature','inputformula','text','inputlookupaliasselect','inputcheckbox'].includes(type)"/>

        <div class="select is-primary is-fullwidth"   v-if="type === 'inputselect' || type === 'inputmultiselect' || type === 'inputlookupaliasselect'">
            <select v-bind:items="items" class="select">
                <option v-html="item.title" v-for="item in items"></option>
            </select>
        </div>
        <div class="select is-primary is-fullwidth" v-if="type === 'inputlookup'">
            <select >
                <option v-html="title"></option>
            </select>
        </div>
        <div v-bind:items="items" v-if="type === 'inputrepeat'" style="border: solid lightgrey;">
            <div v-for="item in items">
                <label class="label" v-html="item.title"></label>
                <input class="input is-medium" :type="item.type.replace('input','')"  v-if="!['inputselect','inputmultiselect','inputlookup','inputrepeat', 'inputlist', 'inputradio','inputsignature', 'inputformula','text','inputlookupaliasselect'].includes(item.type)">
                <div class="select is-primary"   v-if="item.type === 'inputselect' || item.type === 'inputmultiselect'">
                    <select v-bind:items="items" class="select">
                        <option v-html="item.title" v-for="item in items"></option>
                    </select>
                </div>
                <div class="select is-primary is-fullwidth" v-if="item.type === 'inputlookup'">
                    <select>
                        <option v-html="item.title"></option>
                    </select>

                </div>
            </div>
            <button class="button is-info" style="margin-top: 5px;">Copy</button> <button class="button is-info" style="margin-top: 5px;">Add {{title}}</button>
        </div>
        <div v-bind:template="template" v-if="type === 'inputlist'" style="border: solid lightgrey;">
            <div v-for="item in template">
                <label v-html="item.title"></label>
                <input  :type="item.type.replace('input','')" v-bind:style="{width:item.width}" v-if="!['inputselect','inputmultiselect','inputlookup','inputrepeat', 'inputlist', 'inputradio','inputsignature', 'inputformula','text','inputlookupaliasselect'].includes(item.type)"/>
                <div class="select is-primary"   v-if="item.type === 'inputselect' || item.type === 'inputmultiselect'">
                    <select v-bind:items="items" class="select">
                        <option v-html="item.title" v-for="item in items"></option>
                    </select>
                </div>
                <div class="select is-primary is-fullwidth" v-if="item.type === 'inputlookup'">
                    <select>
                        <option v-html="item.title"></option>
                    </select>

                </div>
            </div>
        </div>
        <label class="checkbox" v-bind:items="items" v-if="type ==='inputcheckbox'">
            <input type="checkbox" :type="type.replace('input','')" v-bind:style="{width:width}"/>
        </label>
            <label class="radio" v-bind:items="items" v-if="type === 'inputradio'" v-for="item in items">{{item.title}}
                <input class="radio" :type="type.replace('input','')" v-bind:style="{width:width}"/>
            </label>
        <div v-if="type === 'inputsignature'" class="control">
            <button class="button is-info" style="margin: 0 auto; display: block; width: 100%;"><font-awesome-icon icon="pen" />
                <span>{{title}}</span></button>
        </div>
        <div v-if="type === 'text'" v-bind="body">
            <h3 style="text-align: center;"><strong><span v-html="body"></span></strong></h3>
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
            template: Array,
            body: String
        }
    }
</script>

<style scoped>

</style>