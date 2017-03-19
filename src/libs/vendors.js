import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.use(VueMaterial)

Vue.material.inkRipple = false;

Vue.material.registerTheme('default', {
    primary: 'white',
    accent: 'black',
    warn: 'red'
});

import flagIconCss from 'flag-icon-css/css/flag-icon.css'