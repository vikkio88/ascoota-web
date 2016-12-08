import Vue from 'vue'
import App from './App'
import Router from './routes'

// Vendors
import vendors from './vendors'

$.material.init();

new Vue({
    el: '#app',
    router: Router,
    template: '<App/>',
    components: {App}
})
