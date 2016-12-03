<style>
</style>

<template>
    <div class="player-container">
        <div class="player-wrapper">
            <div class="logo">
                <img :src="audio.poster"/>
            </div>
            <div class="controls-wrapper">
                <div class="podcast-title">
                    <span>{{audio.title}}</span>
                </div>
                <div class="podcast-description">
                    <span>{{audio.description}}</span>
                </div>
                <div class="audio-slider">
                    <!--
                    <div class="rd-audio-slider-rail">
                        <div class="rd-audio-slider-dot" @mousedown="touchDot"
                             :style="{ 'left': mu.state.progress + '%' }"></div>
                    </div>
                    -->
                    <div class="audio-time" @click="toggleTimeFormat">{{mu.state.lastTimeFormat}} /
                        {{mu.state.durationParsed}}
                    </div>
                </div>
                <button v-show="state.playing" @click="skip(-10)" class="rd-audio-play-btn">
                    <p>Back 10s</p>
                </button>
                <button @click="togglePlay" class="rd-audio-play-btn">
                    <p v-show="!state.playing">Play</p>
                    <p v-show="state.playing">Pause</p>
                </button>
                <button v-show="state.playing" @click="skip(10)" class="rd-audio-play-btn">
                    <p>Skip 10s</p>
                </button>
            </div>
        </div>
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
                }
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
            progress (count) {

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
                this.mu.state.timeFormatRemaining = !this.mu.state.timeFormatRemaining;
            },
            skip(sec){
                this.mu.setTime(this.mu.state.currentTime + sec)
            }
        }
    }



</script>