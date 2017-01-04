<style>
    .player-wrapper {
        margin: 5px 5px 10px 10px;
        padding-top: 5px;
    }
    
    div.controls-wrapper {
        margin-top: 10px;
    }
    
    .clickable {
        cursor: pointer;
    }
    
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .3s
    }
    
    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }
</style>

<template>
    <transition name="fade">
        <div class="podcast panel panel-inverse" v-if="audio != undefined">
            <div class="clearfix" :class="{'panel-heading':showInfo}">
                <div class="panel-title pull-right">
                    <a @click="toggleInfo" class="clickable">
                        <i v-show="showInfo" class="material-icons" title="Hide info">expand_less</i>
                        <i v-show="!showInfo" class="material-icons" title="Show info">expand_more</i>
                    </a>
                </div>
            </div>
            <article class="player-wrapper">
                <div class="info-wrapper">
                    <div class="content">
                        <div v-show="showInfo" class="podcast-title">
                            <h2><strong>{{audio.name}}</strong></h1>
                        </div>
                        <div v-show="showInfo" class="podcast-description">
                            <h3>{{audio.description}}</h3>
                        </div>
                        <!--
                    <div class="audio-slider">
                        <input class="form-control slider" type="range" :value="podcast.state.progress" min="0" max="100" step="0.01" v-model="podcast.state.progress"
                            @click="seek">
                    </div>
                    -->
                        <div id="slider-control" @click="seek" class="progress clickable" :class="{'progress-striped':state.playing, 'active': state.playing}"
                            :style="{ height: showInfo? '10px':'30px'}">
                            <!--<div v-if="!showInfo" style="width: 100%; z-index:1"><strong>{{audio.title}}</strong> {{podcast.state.lastTimeFormat}} / {{podcast.state.durationParsed}}</div>-->
                            <div class="progress-bar" :style="{width: podcast.state.progress+'%'}"></div>
                        </div>
                        <div v-show="showInfo" class="audio-time" :class="{'clickable': state.playing}" @click="toggleTimeFormat">
                            <h2>{{podcast.state.lastTimeFormat}} / {{podcast.state.durationParsed}}</h2>
                        </div>
                    </div>
                    <div class="controls-wrapper">
                        <button :disabled="!state.playing" @click="skip(-10)" class="btn btn-lg btn-raised" :class="{'disabled': !state.playing}">
                        <i class="material-icons">fast_rewind</i>
                    </button>
                        <button @click="togglePlay" class="btn btn-lg btn-raised btn-primary">
                        <i v-show="!state.playing" class="material-icons">play_arrow</i>
                        <i v-show="state.playing" class="material-icons">pause</i>
                    </button>
                        <button :disabled="!state.playing" @click="skip(10)" class="btn btn-lg btn-raised" :class="{'disabled': !state.playing}">
                        <i class="material-icons">fast_forward</i>
                    </button>
                    </div>
                </div>
            </article>
        </div>
    </transition>
</template>

<script>
    import VueAudio from '../VueAudio.js'

    export default {
        name: 'audio-player',
        props: {
            audio: Object
        },
        watch: {
            audio() {
                this.destroy();
                this.init();
            }
        },
        data() {
            return {
                defaultOptions: {
                    preload: true,
                    autoplay: false,
                    rate: 1,
                    loop: false,
                    volume: 0.5
                },
                podcast: {
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
                showInfo: true
            }
        },
        computed: {

        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            init() {
                let options = this.audio.options === undefined ? this.defaultOptions : this.audio.options;
                this.podcast = new VueAudio(this.audio.file_url, options);
            },
            destroy() {
                if (this.podcast.destroyed !== undefined) {
                    this.state.playing = false;
                    this.podcast.destroyed();
                    this.podcast = null;
                }
            },
            toggleInfo() {
                this.showInfo = !this.showInfo;
            },
            togglePlay() {
                if (this.state.playing) {
                    this.pause();
                } else {
                    this.play();
                }
            },
            play() {
                if (this.podcast)
                    this.state.playing = true
                this.podcast.play()
            },
            pause() {
                this.state.playing = false
                this.podcast.pause()
            },
            volumePlus() {
                this.podcast.setVolume(this.podcast.state.volume + 0.1)
            },
            volumeMinus() {
                this.podcast.setVolume(this.podcast.state.volume - 0.1)
            },
            toggleTimeFormat() {
                if (this.state.playing) {
                    this.podcast.state.timeFormatRemaining = !this.podcast.state.timeFormatRemaining;
                }
            },
            skip(sec) {
                this.podcast.setTime(this.podcast.state.currentTime + sec)
            },
            seek(event) {
                let offset = event.offsetX;
                let maxOffset = document.getElementById('slider-control').offsetWidth;
                let percent = offset / maxOffset;
                this.podcast.setTime(percent * this.podcast.state.duration);
            }

        }
    }
</script>