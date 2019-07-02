import Vue from 'vue'
import Vuex from 'vuex'

import fields from './modules/fields'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        fields
    }

});
