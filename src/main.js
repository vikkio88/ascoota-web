import Vue from 'vue'
import Resource from 'vue-resource'
Vue.use(Resource);

//plugins
import Stats from './plugins/Stats'
Vue.use(Stats);

import App from './App'
import Router from './libs/routes'
import Store from './libs/store'

// Vendors
import vendors from './libs/vendors'



var app = new Vue({
    el: '#app',
    router: Router,
    store: Store,
    template: '<App/>',
    components: { App }
})

$.material.init();
