import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { Icon, Lazyload, Loading } from 'vant';

// 声明公共组件
import AppScroll from './components/AppScroll'
import AppHeader from './components/AppHeader'
Vue.component(AppScroll.name, AppScroll);
Vue.component(AppHeader.name, AppHeader);


Vue.use(Icon).use(Lazyload).use(Loading);

new Vue({
    el: '#app',
    router,
    store,
    render: h=>h(App)
})