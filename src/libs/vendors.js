import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.use(VueMaterial)
Vue.material.registerTheme('default', {
    primary: 'teal',
    accent: 'light-blue'
})

Vue.material.registerTheme({
    navBar: {
        primary: 'teal',
        accent: 'white'
    },
    speedDial: {
        accent: 'red',
        background: 'indigo'
    },
})

import flagIconCss from 'flag-icon-css/css/flag-icon.css'