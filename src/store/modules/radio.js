import Vue from 'vue';
import appMixin from "../../mixins";
const state = {
    buildingBlocks: [],
    slices: "",
    id: null,
    fieldComponent: null,
    field: {
        type: "",
        title: "",
        name: "",
        required: 0,
        hidden: 0

    },
    formVuex: {
        title: "",
        type: "form",
        name: "",
        uri: "",
        items: []
    },
    type : null,
    types:[{name:'inputlookup', label: 'Lookup', icon: 'table',componentName: "LookupComponentWithVuex"},
        {name:'inputtext', label: 'Text', icon: 'font', componentName: "TextComponentWithVuex"},
        {name:'inputlookupalias', label: 'Alias', icon: 'align-center',componentName: ""},
        {name:'inputlookupaliasselect', label: 'Alias Select', icon: 'th-list',componentName: ""},
        {name:'inputrepeat', label: 'Repeater', icon: 'th-large',componentName: ""},
        {name:'inputnumber', label: 'Number', icon: 'calculator',componentName: ""},
        {name:'inputradio', label: 'Radio', icon: 'check-circle',componentName: ""},
        {name:'inputselect', label: 'Drop Down', icon: 'list',componentName: ""},
        {name:'inputlist', label: 'List', icon: 'th-large',componentName: ""},
        {name:'inputcheckbox', label: 'Checkbox', icon: 'check-square',componentName: ""},
        {name:'inputimage', label: 'Image', icon: 'camera',componentName: ""},
        {name:'inputsignature',label: 'Signature', icon: 'signature',componentName: ""},
        {name:'inputformula', label: 'Formula', icon: 'subscript',componentName: ""},
        {name: 'inputdate',label: 'Date', icon: 'clock',componentName: ""},
        {name: 'inputlocation', label: 'GPS', icon: 'map-marker',componentName: ""},
        {name: 'text', label: 'Long Text', icon:'paragraph',componentName: ""},
        {name:'inputlookupaliasimage', label: 'Alias Image', icon: 'camera',componentName: ""},
        {name:'inputduration',label: 'Duration',icon: 'stopwatch',componentName: ""},
        {name:'inputscan', label: 'Scanner', icon: 'qrcode',componentName: ""}],
};

const mutations = {
    changeType (state, type) {
       state.type = type.type;
       console.log(type.componentName)
        try {
            return  Vue.component(type.componentName, () => import (`../../components/${type.componentName}`));
        } catch (e) {
            console.log(e.toString())
        }
    },
    handleComponent(state, component) {
        state.fieldComponent = component.componentName
    },
    createInputField (state, inputfield, slices) {
        state.field.type = state.type
        state.field = inputfield;
        state.field.name = inputfield.name === "" ? appMixin.methods.nameGenerator(inputfield.title, slices !== undefined && slices.length > 0 ? slices.split(',') : [] ) : inputfield.name
        state.id++;
        state.formVuex.items.push(inputfield)
    },
    editInputField(state, field) {
        console.log(state.id, state.buildingBlocks, field)
    },
    addBlock ( state, fields) {
        state.buildingBlocks.push({
            id: state.id,
            items: state.formVuex.items
        })
        console.log(state.type, state.fieldComponent)
    }
};

const actions = {
    changeType({commit}, type) {
        commit('changeType', type)
    },
    createInputField({commit}, inputfield,  slices) {
        commit('createInputField', inputfield, slices)
    },
    addBlock ({commit}, fields) {
        commit('addBlock', fields);
    },
    editInputField ({commit},field) {
        commit ('editInputField',field);
    },
    handleComponent ({commit}, component) {
        commit('handleComponent', component)
    }
};

const getters = {
    getTypes: state => {
        console.log(state.types)
        return state.types;
    },
    getInputField: state => {
        return state.field;
    },
    getComponentType: state => {
        return state.fieldComponent;
    },
    getFormItems: state => {
        return state.formVuex.items;
    },
    getSlices: state => {
        return state.slices;
    },
    getBuildingBlocks: state => {
        return state.buildingBlocks;
    },
    getForm: state => {
        return state.formVuex;
    },
    getId: state => {
        return state.id;
    },
    getType: state => {
        return state.type;
    }

}

export default {
    state,
    mutations,
    actions,
    getters
}