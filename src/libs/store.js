import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";


const store = new Vuex.Store({
    state: {
        selectedAudio: undefined,
        autoPlay: false,
        showMainDialog: false,
        startTime: 0,
        isLoggedIn: !!localStorage.getItem("token")
    },
    mutations: {
        [LOGIN](state) {
            state.pending = true;
        },
        [LOGIN_SUCCESS](state) {
            state.isLoggedIn = true;
            state.pending = false;
        },
        [LOGOUT](state) {
            state.isLoggedIn = false;
        }
    },
    actions: {
        login({ commit }, token) {
            commit(LOGIN);
            localStorage.setItem("token", token);
            commit(LOGIN_SUCCESS);
        },
        logout({ commit }) {
            localStorage.removeItem("token");
            commit(LOGOUT);
        }
    }
});

export default store;

