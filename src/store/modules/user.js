const state = {
    user: {
        loggedId: false,
        data:null,
        token: null,
        role: {
            admin: false,
            guest: false
        }
    }
}
const mutations = {
    'SET_LOGGED_IN' (state, value) {
        state.user.loggedId = value;
    },
    'SET_USER' (state,data) {
        state.user.data = data;
    }
}

const actions = {
    fetchUser({commit}, user) {
        commit("SET_LOGGED_IN", user !== null);
        if (user) {
            commit("SET_USER", {
                displayName: user.displayName,
                email: user.email,
                token: user.uid,
                role: user.role
            });
        } else {
            commit("SET_USER", null);
        }
    },

}
const getters = {
    user: state => {
        return state.user;
    },
}
export default {
    state,
    mutations,
    actions,
    getters
}