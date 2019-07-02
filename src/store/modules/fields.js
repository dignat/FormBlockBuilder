const state = {
    fields:{},
    formFieldType: ''
};

const mutations = {
    'ADD_FIELD' (state, fields) {
       state.fields = fields;
       console.log(fields, 'mutations')
    },
    'EDIT_FIELD' (state, payload) {
        console.log(payload);
        state.fields = payload;
    },
    'DELETE_FIELD' (state, fields) {

    }

};

const actions = {
    addField: ({commit}, addedField) => {
        commit('ADD_FIELD', addedField);
    },
    editField: ({commit}, field) => {
        commit('EDIT_FIELD', field);

    },
    deleteField: ({commit}, field) => {
        commit('DELETE_FIELD',field);
    }

};

const getters = {
    fields: state => {
        return state.fields;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}