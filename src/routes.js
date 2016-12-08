import Vue from 'vue'
import VueRouter from 'vue-router'

//components
import Dashboard from './components/Dashboard'
import SingleRadio from './components/podcast/SingleRadio'

Vue.use(VueRouter);

var router = new VueRouter({
    redirect: '/dashboard',
    routes: [
        {
            path: '/dashboard',
            component: Dashboard
        },
        {
            path: '/radio',
            component: SingleRadio
        },
        {
            path: '*',
            // Probably would be better to create an Error component?
            redirect: '/dashboard'
        }
    ]
});


export default router;