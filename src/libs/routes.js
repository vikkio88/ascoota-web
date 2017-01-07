import Vue from 'vue'
import VueRouter from 'vue-router'

//components
import Dashboard from '../components/Dashboard'
import SingleRadio from '../components/podcast/SingleRadio'
import Show from '../components/podcast/Show'

Vue.use(VueRouter);

var router = new VueRouter({
    redirect: '/dashboard',
    routes: [
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/radio/:radioId',
            name: 'singleRadioView',
            component: SingleRadio
        },
        {
            path: '/radio/:radioId/show/:showId',
            name: 'singleShowView',
            component: Show
        },
        {
            path: '*',
            // Probably would be better to create an Error component?
            redirect: '/dashboard'
        }
    ]
});


export default router;