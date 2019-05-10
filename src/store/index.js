import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import home from './modules/home'
import category from './modules/category'
import topic from './modules/topic'

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
        home,
        category,
        topic
    }
});

export default store;