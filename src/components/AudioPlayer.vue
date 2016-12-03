<style>
    div.player-container {
        position: relative;
    }
    div.controls-wrapper {
        margin-top: 10px;
    }
    
    .clickable {
        cursor: pointer;
    }
</style>

<template>
    <div class="box player-container">
        <article class="player-wrapper media is-flex-mobile">

            <div class="info-wrapper media-content has-text-centered">
                <div class="content has-text-centered">
                    <div v-show="showInfo" class="podcast-title">
                        <h1 class="title is-2"><strong>{{audio.title}}</strong></h1>
                    </div>
                    <div v-show="showInfo" class="podcast-description">
                        <h2 class="subtitle is-3">{{audio.description}}</h2>
                    </div>
                    <div class="audio-slider">
                        <progress @click="seek" class="progress is-success" :value="mu.state.progress" max="100">60%</progress>
                        <div v-show="showInfo" class="audio-time subtitle is-2" :class="{'clickable': state.playing}" @click="toggleTimeFormat">
                            {{mu.state.lastTimeFormat}} / {{mu.state.durationParsed}}
                        </div>
                    </div>
                </div>
                <div class="controls-wrapper has-text-centered">
                    <button :disabled="!state.playing" @click="skip(-10)" class="button is-large" :class="{'is-disabled': !state.playing}">
                        <i class="material-icons">fast_rewind</i>
                    </button>
                    <button @click="togglePlay" class="button is-large">
                        <p v-show="!state.playing"><i class="material-icons">play_arrow</i></p>
                        <p v-show="state.playing"><i class="material-icons">pause</i></p>
                    </button>
                    <button :disabled="!state.playing" @click="skip(10)" class="button is-large" :class="{'is-disabled': !state.playing}">
                        <i class="material-icons">fast_forward</i>
                    </button>
                </div>
                <nav class="level">
                    <div class="level-left">
                        <a class="level-item" title="add to the Library">
                            <i class="material-icons">library_add</i>
                        </a>
                        <a class="level-item" title="copy link">
                            <i class="material-icons">link</i>
                        </a>
                        <a class="level-item" title="share">
                            <i class="material-icons">forward</i>
                        </a>
                    </div>
                    <div class="level-right">
                        <a @click="toggleInfo" class="level-item">
                            <i v-show="showInfo" class="material-icons" title="Hide info">expand_less</i>
                            <i v-show="!showInfo" class="material-icons" title="Show info">expand_more</i>
                        </a>
                    </div>
                </nav>
            </div>
        </article>
    </div>
</template>

<script>
    import VueAudio from '../VueAudio.js'

    export default {
        props: {
            audio: Object
        },
        data () {
            return {
                mu: {
                    state: {
                        startLoad: false,
                        failed: false,
                        try: 3,
                        tried: 0,
                        playing: false,
                        paused: false,
                        playbackRate: 1.0,
                        progress: 0,
                        currentTime: 0,
                        duration: 0,
                        volume: 0.5,
                        loaded: '0',
                        durationTimerFormat: '00:00',
                        currentTimeFormat: '00:00',
                        lastTimeFormat: '00:00'
                    }
                },
                state: {
                    playing: false
                },
                showInfo : true
            }
        },
        computed : {

        },
        mounted () {
            this.init()
        },
        beforeDestroy () {

        },
        methods: {
            init () {
                this.mu = new VueAudio(this.audio.src, this.audio.options);
            },
            toggleInfo () {
                this.showInfo = ! this.showInfo;
            },
            togglePlay () {
                if (this.state.playing) {
                    this.pause();
                } else {
                    this.play();
                }
            },
            play () {
                if(this.mu)
                this.state.playing = true
                this.mu.play()
            },
            pause () {
                this.state.playing = false
                this.mu.pause()
            },
            volumePlus () {
                this.mu.setVolume(this.mu.state.volume + 0.1)
            },
            volumeMinus () {
                this.mu.setVolume(this.mu.state.volume - 0.1)
            },
            toggleTimeFormat (){
                if(this.state.playing){
                    this.mu.state.timeFormatRemaining = !this.mu.state.timeFormatRemaining;
                }
            },
            skip(sec){
                this.mu.setTime(this.mu.state.currentTime + sec)
            },
            seek(event){
                let offset = event.offsetX;
                let maxOffset = event.toElement.offsetWidth;
                let percent = offset / maxOffset;
                this.mu.setTime(percent * this.mu.state.duration);
            }

        }
    }
</script>