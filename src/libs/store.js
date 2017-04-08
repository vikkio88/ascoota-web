import Vue from 'vue'
import Vuex from 'vuex'
import VueAudio from '../VueAudio'

Vue.use(Vuex);

const options = {
    preload: true,
    autoplay: false,
    rate: 1,
    loop: false,
    volume: 0.5
};


const store = new Vuex.Store({
    state: {
        selectedAudio: undefined,
        audio: undefined,
        autoPlay: false,
        startTime: 0,
        isLoggedIn: !!localStorage.getItem("token")
    },
    mutations: {
        select(state, audio) {
            if (state.audio != undefined) {
                state.audio.destroyed();
            }
            state.selectedAudio = audio;
            state.audio = new VueAudio(audio.file_url, options)
        },
        selectAndPlay(state, audioParameters) {
            if (state.audio != undefined) {
                state.audio.pause();
            }
            const { podcast, initialSeek } = audioParameters;
            state.selectedAudio = podcast;
            state.audio = new VueAudio(podcast.file_url, options)
            state.audio.play();
            if (initialSeek) {
                setTimeout(
                    () => {
                        state.audio.setTime(parseInt(initialSeek)); 
                    },
                    1000
                );
            }
        },
        stop(state) {
            state.audio.pause();
            state.selectedAudio = undefined;
            state.audio = undefined;
        },
        play(state) {
            if (state.audio) {
                state.audio.play();
            }
        },
        pause(state) {
            if (state.audio) {
                state.audio.pause();
            }
        },
        seek(time){
            state.audio.setTime(parseInt(time));
        }
    },
    actions: {

    }
});

export default store;

