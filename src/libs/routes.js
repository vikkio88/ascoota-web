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
            component: Auth,
            meta: {
                requiresGuest: true
            }
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/me',
            name: 'me',
            component: Me,
            meta: {
                requiresLogin: true
            }
        },
        {
            path: '*',
            // Probably would be better to create an Error component?
            redirect: '/dashboard'
        }
    ]
});

router.beforeEach((to, from, next) => {
    let loggedIn = Vue.auth.loggedIn();
    if (to.matched.some((record) => record.meta.requiresGuest) && loggedIn) {
        next({ path: '/me' });
    } else if (to.matched.some((record) => record.meta.requiresLogin) && !loggedIn) {
        next({ path: '/auth' });
    } else {
        next();
    }
});


export default router;