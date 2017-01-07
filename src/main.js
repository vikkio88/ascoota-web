import Vue from 'vue'
import Resource from 'vue-resource'

import App from './App'
import Router from './libs/routes'
import Store from './libs/store'


// Vendors
import vendors from './libs/vendors'

Vue.use(Resource);

$.material.init();

var app = new Vue({
    el: '#app',
    router: Router,
    template: '<App/>',
    components: { App }
})
