import Vue from 'vue'
import App from './App'
import Router from './routes'
import Resource from 'vue-resource'

// Vendors
import vendors from './vendors'

Vue.use(Resource);

$.material.init();

var app = new Vue({
    el: '#app',
    router: Router,
    template: '<App/>',
    components: { App }
})
