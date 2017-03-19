import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.use(VueMaterial)

Vue.material.inkRipple = false;

Vue.material.registerTheme('default', {
    primary: {
        color: 'grey',
        hue: 200
    },
    accent: {
        color: 'deep-orange',
        hue: 600
    },
    warn: {
        color: 'red',
        hue: 600
    }
});

import flagIconCss from 'flag-icon-css/css/flag-icon.css'