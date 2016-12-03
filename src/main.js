import Vue from 'vue'
import App from './App'
import JQuery from 'jquery/src/jquery'
import 'semantic-ui-css/semantic.css';
import 'semantic-ui-css/components/dimmer';
import 'semantic-ui-css/components/transition';
import 'semantic-ui-css/components/dropdown';
import 'semantic-ui-css/components/modal';
import 'semantic-ui-css/components/rating';
import 'semantic-ui-css/components/tab';
import 'semantic-ui-css/components/popup';
import 'semantic-ui-css/components/sticky';

new Vue({
    el: '#app',
    template: '<App/>',
    components: {App}
})
