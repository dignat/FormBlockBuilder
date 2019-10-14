const state = {
    fields:{},
    currentType: '',
    currentForm: {
        items: []
    },
    formFieldType: '',
    translatedForm: {},
    translatedTypeField: '',
    translatedType: '',
    translatedField: '',
    id: 0,
    form: [],
    editFields: {},
    checkedField: false,
    editFieldName: '',
    transform: false,
    changeRules: false
};

const mutations = {
    'UPDATE_TYPE'(state, currentType) {
        state.currentType = currentType;
        console.log(currentType)
    },
    'ADD_TYPE_FIELDS' (state, fields) {
        state.fields = fields;
        state.changeRules = true;
      state.currentForm.items.push(state.form);
    },
    'ADD_FIELD' (state, fields) {
        state.id++;
        state.fields = fields;
        state.form.push({
            id: state.id,
            fields: state.fields});
        },
    'EDIT_FIELD' (state, fields) {
       for (let i = 0; i < state.form.length; i++) {
           console.log('in the store file',state.form[i].fields.name, fields.name, state.fields.name);
           if (state.form[i].fields.name === state.fields.name) {
               state.editFields = fields;
              state.form[i].fields = state.editFields;
           }
       }
    },
    'CHECKED_FIELD' (state, fieldName) {
        state.editFieldName = fieldName;
        state.checkedField = true;
        console.log('checked stats',fieldName);
    },
    'DELETE_FIELD' (state, fields) {
    },
    'TRANSLATE_FORM' (state, translatedForm) {
        state.translatedForm = translatedForm;
    },
    'SET_TRANSFORM' (state, transform) {
        state.transform = transform;
    }

};

const actions = {
    updateType: ({commit}, type) => {
        commit('UPDATE_TYPE', type);
    },
    addField: ({commit}, addedField) => {
        commit('ADD_FIELD', addedField);
    },
    editField: ({commit}, field) => {
        commit('EDIT_FIELD', field);

    },
    deleteField: ({commit}, field) => {
        commit('DELETE_FIELD',field);
    },
    translateOldForm: ({commit}, form) => {
        commit('TRANSLATE_FORM', form)
    },
    addTypeFields: ({commit}, items) => {
        commit('ADD_TYPE_FIELDS', items)
    },
    checkedField: ({commit}, field) => {
        commit('CHECKED_FIELD', field)
    },
    setTransform: ({commit}, transform) => {
        commit('SET_TRANSFORM', transform)
    }
};

const getters = {
    editedName: state => {
        return state.editFieldName
    },
    storeFields: state => {
       return state.fields
    },
    editFields: state => {
        return state.editFields
    },
    translatedForm: state => {
        return state.translatedForm
    },
    currentFormFields: state => {
        return state.currentForm.items
    },
    currentForm: state => {
        return state.form;
    },
    getTransform: state => {
        return state.transform;
    },
    getRules: state => {
        return state.changeRules
    }

};

export default {
    state,
    mutations,
    actions,
    getters
}