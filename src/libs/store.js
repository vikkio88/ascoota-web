import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


const store = new Vuex.Store({
    state:{
        selectedAudio: undefined,
        autoPlay: false,
        showMainDialog: false,
        startTime: 0
    }
});

export default store;

