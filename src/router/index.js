import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import homeRouter from './home-router'
import categoryRouter from './category-router'
import topicRouter from './topic-router'
import cartRouter from './cart-router'
import personalRouter from './personal-router'

const router = new VueRouter({
    mode: 'history',
    routes: [
        homeRouter,
        categoryRouter,
        topicRouter,
        cartRouter,
        personalRouter,
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '**',
            redirect: '/home'
        }

    ]
});

export default router;