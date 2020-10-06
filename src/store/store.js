import Vue from 'vue'
import Vuex from 'vuex'

import fields from './modules/fields'
import user from './modules/user'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        fields,
        user
    }

});
