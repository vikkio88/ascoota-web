import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'

// Vendors
import vendors from './vendors'

$.material.init();


Vue.use(VueRouter);

new Vue({
    el: '#app',
    template: '<App/>',
    components: {App}
})
