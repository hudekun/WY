import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import home from './modules/home'

const store = new Vuex.Store({
    state: {
        loading: false
    },
    mutations: {
        setLoading(state, param){
            state.loading = param;
        }
    },
    modules: {
        home
    }
});

export default store;