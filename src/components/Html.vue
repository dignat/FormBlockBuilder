<template>
    <div>
        <label class="label" v-html="title" v-if="!['inputsignature','inputimage','inputlookupaliasimage'].includes(type)"></label>
        <input class="input is-medium" :type="type.replace('input','')" v-bind:style="{width: width}" v-if="!['inputselect','inputmultiselect','inputlookup','inputrepeat', 'inputlist', 'inputradio','inputsignature','inputformula','text','inputlookupaliasselect','inputcheckbox','inputimage','inputlocation','inputlookupaliasimage'].includes(type)"/>
        <div class="select is-primary is-fullwidth"   v-if="type === 'inputselect'  || type === 'inputlookupaliasselect'">
            <select v-bind:items="items" class="select">
                <option v-html="item.title" v-for="item in items"></option>
            </select>
        </div>
        <div class="select is-primary is-fullwidth" v-if="type === 'inputlookup'">
            <select >
                <option v-html="title"></option>
            </select>
        </div>
        <div class="select is-primary is-fullwidth" style="background: white;" @click="Show=!Show" v-if="type === 'inputmultiselect' || type === 'inputlookup' && multi">
            <p style="margin-left: 5px;">Select Item</p>
        </div>

            <div  style="background: white; padding: 5px;" v-for="item in items" v-if="Show">
                <input type="checkbox" class="checkbox is-fullwidth"/>
                <span  v-html="item.title"></span>
            </div>

        <div v-bind:items="items" v-if="type === 'inputrepeat'" style="border: solid lightgrey;">
            <div v-for="item in items">
                <label class="label" v-html="item.title"></label>
                <input class="input is-medium" :type="item.type.replace('input','')"  v-if="!['inputselect','inputmultiselect','inputlookup','inputrepeat', 'inputlist', 'inputradio','inputsignature', 'inputformula','text','inputlookupaliasselect','inputimage','inputlocation','inputlookupaliasimage'].includes(item.type)">
                <div class="select is-primary is-fullwidth"   v-if="item.type === 'inputselect' || item.type === 'inputmultiselect'">
                    <select v-bind:items="item.items" class="select">
                        <option v-html="item.title" v-for="item in item.items"></option>
                    </select>
                </div>
                <div class="select is-primary is-fullwidth" v-if="item.type === 'inputlookup'">
                    <select>
                        <option v-html="item.title"></option>
                    </select>
                </div>
                <div v-if="item.type === 'inputsignature'" class="control">
                    <button class="button is-info" style="margin: 0 auto; display: block; width: 100%;"><font-awesome-icon icon="pen" />
                        <span>{{item.title}}</span></button>
                </div>
                <div v-if="item.type === 'inputimage' || item.type === 'inputlookupaliasimage'">
                    <button class="button is-info" style=" display: block; width: 50%;"><font-awesome-icon icon="camera" />
                        <span>{{item.item_title !== ''? item.item_title : item.title}}</span></button>
                </div>
                <div v-if="item.type === 'text'">
                    <h3 style="text-align: center;"><strong><span v-html="item.body"></span></strong></h3>
                </div>
                <div v-if="item.type==='inputradio'">
                    <label class="radio" v-bind:items="item.items" v-if="item.type === 'inputradio'" v-for="itemRadio in item.items">{{itemRadio.title}}
                        <input class="radio" type="radio" v-bind:style="{width:width}"/>
                    </label>
                </div>
                <div v-if="item.type==='inputcheckbox'">
                    <label class="checkbox" v-if="item.type ==='inputcheckbox'">
                        <input class="checkbox" type="checkbox" v-bind:style="{width:item.width}"/>
                    </label>
                </div>
                <div v-if="item.type==='inputrepeat'" style="border: solid lightgrey;">
                    <div v-for="repeaterItem in item">
                        <label class="label" v-html="repeaterItem.title"></label>
                        <input class="input is-medium" :type="repeaterItem.type.replace('input','')"  v-if="!['inputselect','inputmultiselect','inputlookup','inputrepeat', 'inputlist', 'inputradio','inputsignature', 'inputformula','text','inputlookupaliasselect','inputimage','inputlocation','inputlookupaliasimage'].includes(repeaterItem.type)">
                        <div class="select is-primary is-fullwidth"   v-if="repeaterItem.type === 'inputselect' || repeaterItem.type === 'inputmultiselect'">
                            <select v-bind:items="repeaterItem.items" class="select">
                                <option v-html="item.title" v-for="deepItem in repeaterItem.items"></option>
                            </select>
                        </div>
                        <div class="select is-primary is-fullwidth" v-if="repeaterItem.type === 'inputlookup'">
                            <select>
                                <option v-html="repeaterItem.title"></option>
                            </select>
                        </div>
                        <div v-if="repeaterItem.type === 'inputsignature'" class="control">
                            <button class="button is-info" style="margin: 0 auto; display: block; width: 100%;"><font-awesome-icon icon="pen" />
                                <span>{{repeaterItem.title}}</span></button>
                        </div>
                        <div v-if="repeaterItem.type === 'inputimage' || repeaterItem.type === 'inputlookupaliasimage'">
                            <button class="button is-info" style=" display: block; width: 50%;"><font-awesome-icon icon="camera" />
                                <span>{{repeaterItem.item_title !== ''? repeaterItem.item_title : repeaterItem.title}}</span></button>
                        </div>
                        <div v-if="repeaterItem.type === 'text'">
                            <h3 style="text-align: center;"><strong><span v-html="repeaterItem.body"></span></strong></h3>
                        </div>
                        <div v-if="item.type==='inputradio'">
                            <label class="radio" v-bind:items="repeaterItem.items" v-if="repeaterItem.type === 'inputradio'" v-for="itemRadio in repeaterItem.items">{{itemRadio.title}}
                                <input class="radio" type="radio" v-bind:style="{width:width}"/>
                            </label>
                        </div>
                        <div v-if="repeaterItem.type==='inputcheckbox'">
                            <label class="checkbox" v-if="repeaterItem.type ==='inputcheckbox'">
                                <input class="checkbox" type="checkbox" v-bind:style="{width:repeaterItem.width}"/>
                            </label>
                        </div>
                    </div>
                    <button class="button is-info is-left" style="margin-top: 5px; width: 45%; ">Copy</button> <button class="button is-info is-right" style="margin-top: 5px; width:45%;">Add {{title}}</button>
                </div>
            </div>
            <button class="button is-info is-left" style="margin-top: 5px; width: 45%; ">Copy</button> <button class="button is-info is-right" style="margin-top: 5px; width:45%;">Add {{item_title !== '' ? item_title: title}}</button>
        </div>
        <div v-bind:template="template" v-if="type === 'inputlist'" style="border: solid lightgrey;">
            <div v-for="item in template">
                <label v-html="item.title"></label>
                <input class="input is-medium" :type="item.type.replace('input','')" v-bind:style="{width:item.width}" v-if="!['inputselect','inputmultiselect','inputlookup','inputrepeat', 'inputlist', 'inputradio','inputsignature', 'inputformula','text','inputlookupaliasselect','inputimage','inputlocation','inputlookupaliasimage'].includes(item.type)"/>
                <div class="select is-primary is-fullwidth"   v-if="item.type === 'inputselect' || item.type === 'inputmultiselect'">
                    <select v-bind:items="item.items" class="select">
                        <option v-html="item.title" v-for="item in item.items"></option>
                    </select>
                </div>
                <div class="select is-primary is-fullwidth" v-if="item.type === 'inputlookup'">
                    <select>
                        <option v-html="item.title"></option>
                    </select>
                </div>
                <div v-if="item.type === 'text'">
                    <h3 style="text-align: center;"><strong><span v-html="item.body"></span></strong></h3>
                </div>
                <div v-if="item.type === 'inputimage' || item.type === 'inputlookupaliasimage'">
                    <button class="button is-info is-fullwidth" style="display: block;"><font-awesome-icon icon="camera" />
                        <span>{{item.title}}</span></button>
                </div>
                <div v-if="item.type==='inputcheckbox'">
                <label class="checkbox" v-if="item.type ==='inputcheckbox'">
                    <input class="checkbox" type="checkbox" v-bind:style="{width:item.width}"/>
                </label>
                </div>
                <div v-if="item.type==='inputradio'">
                    <label class="radio" v-bind:items="item.items" v-if="item.type === 'inputradio'" v-for="itemRadio in item.items">{{itemRadio.title}}
                        <input class="radio" type="radio" v-bind:style="{width:width}"/>
                    </label>
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
        <div v-if="type === 'text'" v-bind:items="items">
            <h3 style="text-align: center;"><strong><span v-html="body"></span></strong></h3>
        </div>
        <div v-if="type === 'inputimage' || type === 'inputlookupaliasimage'" v-bind:items="items">
            <button class="button is-info" style="margin:2px; display: block; width: 100%;"><font-awesome-icon icon="camera" v-bind:style="{width:width}"/>
                <span>{{title}}</span></button>
        </div>
        <div v-if=" type==='inputlocation'" v-bind:items="items">
            <label class="label">{{title}}</label>
            <input type="text" class="input is-medium" v-model="now"/>
        </div>
    </div>
</template>

<script>
    import Select from "./Select";
    import ListComponent from "./ListComponent";
    export default {
        name: "Html",
        components: {ListComponent, Select},
        props: {
            type: String,
            width: Number,
            title: String,
            items: Array,
            template: Array,
            body: String,
            multi: Number,
            item_title: String
        },
        data() {
            return {
                now: new Date(),
                isDropdownActive: false,
                Show: false
            }
        },
    }
</script>

<style scoped>

</style>