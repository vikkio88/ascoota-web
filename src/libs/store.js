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

const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

var originalTitle = 'aScoota - the opensource cloud podcast manager';

const setTitle = (podcast, playing) => {
    if (podcast == undefined) {
        document.title = originalTitle;
        return;
    }
    let playChar = playing ? '►' : '■';
    document.title = `${playChar} ${podcast.name}`;
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
            setTitle(state.selectedAudio, false);
        },
        selectAndPlay(state, audioParameters) {
            if (state.audio != undefined) {
                state.audio.pause();
            }
            const { podcast, initialSeek } = audioParameters;
            state.selectedAudio = podcast;
            if (!isMobile()) {
                options.autoplay = true;
            }
            state.audio = new VueAudio(podcast.file_url, options)
            setTitle(state.selectedAudio, true);
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
            setTitle(state.audio);
        },
        play(state) {
            if (state.audio) {
                state.audio.play();
                setTitle(state.selectedAudio, true);
            }
        },
        pause(state) {
            if (state.audio) {
                state.audio.pause();
                setTitle(state.selectedAudio, false);
            }
        },
        seek(state, time) {
            state.audio.setTime(parseInt(time));
        }
    }
});

export default store;

