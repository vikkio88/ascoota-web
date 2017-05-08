import Vue from 'vue'
import Resource from 'vue-resource'
Vue.use(Resource);

Vue.http.interceptors.push(
    (request, next) => {
        request.headers.set('ASCOOTA-TOKEN', localStorage.getItem('token'));
        next();
    }
);

import VueClipboard from 'vue-clipboards'
Vue.use(VueClipboard);

//plugins
import Stats from './plugins/Stats'
import Auth from './plugins/Auth'
Vue.use(Stats);
Vue.use(Auth);

import App from './App'
import Router from './libs/routes'
import Store from './libs/store'
import './libs/interceptors'

// Vendors
import vendors from './libs/vendors'

var app = new Vue({
    el: '#app',
    router: Router,
    store: Store,
    template: '<App/>',
    components: { App }
})
