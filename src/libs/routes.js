import Vue from 'vue'
import VueRouter from 'vue-router'

//components
import Dashboard from '../components/main/Dashboard'
import FeedParser from '../components/main/FeedParser'
import About from '../components/main/About'
import SingleRadio from '../components/podcast/SingleRadio'
import PodcastTrigger from '../components/podcast/PodcastTrigger'
import Show from '../components/podcast/Show'
import Auth from '../components/auth/Auth'
import Me from '../components/user/Me'

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
            path: '/feeds/parser',
            name: 'feedParser',
            component: FeedParser
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
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/me',
            name: 'me',
            component: Me
        },
        {
            path: '*',
            // Probably would be better to create an Error component?
            redirect: '/dashboard'
        }
    ]
});


export default router;