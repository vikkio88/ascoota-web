import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


const store = new Vuex.Store({
    state:{
        selectedAudio: undefined,
        showMainDialog: false,
        startTime: undefined
    }
});

export default store;

