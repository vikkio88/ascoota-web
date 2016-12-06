import Vue from 'vue'
import App from './App'
import JQuery from 'jquery/src/jquery'
import bootstrapjs from 'bootstrap/dist/js/bootstrap.js' 
import bootstrap from 'bootstrap/dist/css/bootstrap.css'
import bootstrapMaterial from 'bootstrap-material-design/dist/css/bootstrap-material-design.css'
import bootstrapMaterialJs from 'bootstrap-material-design/dist/js/material.js'
import flagIconCss from 'flag-icon-css/css/flag-icon.css'

$.material.init();

new Vue({
    el: '#app',
    template: '<App/>',
    components: {App}
})
