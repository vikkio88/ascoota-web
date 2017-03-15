import Vue from 'vue'
import VueRouter from 'vue-router'

//components
import Dashboard from '../components/main/Dashboard'
import About from '../components/main/About'
import SingleRadio from '../components/podcast/SingleRadio'
import PodcastTrigger from '../components/podcast/PodcastTrigger'
import Show from '../components/podcast/Show'
import Auth from '../components/auth/Auth'
import Callback from '../components/auth/Callback'
import InterceptCallback from '../components/auth/InterceptCallback'

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
            path: '/shows/:slug',
            name: 'show',
            component: Show
        },
        {
            path: '/podcasts/:podcastId',
            name: 'podcast',
            component: PodcastTrigger
        },
        {
            path: '/auth',
            name: 'auth',
            component: Auth
        },
        {
            path: '/callback',
            name: 'callback',
            component: Callback
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/',
            name: 'interceptCallback',
            component: InterceptCallback
        },
        {
            path: '*',
            // Probably would be better to create an Error component?
            redirect: '/dashboard'
        }
    ]
});


export default router;