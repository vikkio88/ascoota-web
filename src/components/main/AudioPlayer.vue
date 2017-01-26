<style>
    .player-wrapper {
        margin: 5px 5px 10px 10px;
        padding-top: 5px;
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

    .stick {
        width: 100%;
        margin: auto;
        position: fixed;
        top: 0px;
        z-index: 10000;
    }

</style>
<template>
    <transition name="fade">
        <div id="podcast-player" class="podcast panel panel-primary" v-if="audio != undefined" :class="{'stick':stick}">
            <div v-show="!stick" class="clearfix panel-heading">
                <div class="panel-title">
                    <a class="close" @click="close" aria-hidden="true">
                        <i class="material-icons">close</i>
                    </a>
                </div>
            </div>
            <article class="player-wrapper">
                <div class="info-wrapper">
                    <div class="content">
                        <div  v-show="!stick" class="podcast-title">
                            <h2><strong>{{audio.name}}</strong></h2>
                        </div>
                        <div  v-show="!stick" class="podcast-description">
                            <h3>{{audio.description}}</h3>
                        </div>
                        <div v-show="!stick" id="slider-control" @click="seek" class="progress clickable"
                             :class="{'progress-striped':state.playing, 'active': state.playing}"
                             style="height: 15px">
                            <div class="progress-bar" :style="{width: podcast.state.progress+'%'}"></div>
                        </div>
                        <div  v-show="!stick" class="audio-time" :class="{'clickable': state.playing}"
                             @click="toggleTimeFormat">
                            <h2>{{podcast.state.lastTimeFormat}} / {{podcast.state.durationParsed}}</h2>
                        </div>
                    </div>
                    <div class="controls-wrapper">
                        <button :disabled="audio.previous == undefined" @click="skip(10)" class="btn btn-lg hidden-xs"
                                :class="{'disabled': !audio.previous}">
                            <i class="material-icons">skip_previous</i>
                            <div class="ripple-container"></div>
                        </button>

                        <button :disabled="!state.playing" @click="skip(-10)" class="btn btn-lg btn-raised"
                                :class="{'disabled': !state.playing}">
                            <i class="material-icons">fast_rewind</i>
                        </button>
                        <button @click="togglePlay" class="btn btn-lg btn-raised btn-primary">
                            <i v-show="!state.playing" class="material-icons">play_arrow</i>
                            <i v-show="state.playing" class="material-icons">pause</i>
                            <div class="ripple-container"></div>
                        </button>
                        <button :disabled="!state.playing" @click="skip(10)" class="btn btn-lg btn-raised"
                                :class="{'disabled': !state.playing}">
                            <i class="material-icons">fast_forward</i>
                            <div class="ripple-container"></div>
                        </button>

                        <button :disabled="audio.next == undefined" @click="skip(10)" class="btn btn-lg hidden-xs"
                                :class="{'disabled': !audio.next}">
                            <i class="material-icons">skip_next</i>
                            <div class="ripple-container"></div>
                        </button>
                    </div>
                </div>
            </article>
        </div>
    </transition>
</template>
<script>
    import VueAudio from '../../VueAudio.js'

    export default {
        name: 'audio-player',
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
                stick: false
            }
        },
        computed: {
            audio() {
                return this.$store.state.selectedAudio;
            }
        },
        mounted() {
            window.addEventListener('scroll', this.scrollHandler);
        },
        beforeDestroy() {

        },
        methods: {
            init() {
                if (this.audio !== undefined) {
                    let options = this.audio.options === undefined ? this.defaultOptions : this.audio.options;
                    this.podcast = new VueAudio(this.audio.file_url, options);
                }
            },
            destroy() {
                if (this.podcast !== null && this.podcast.destroyed !== undefined) {
                    this.state.playing = false;
                    this.podcast.destroyed();
                    this.podcast = null;
                }
            },
            togglePlay() {
                if (this.state.playing) {
                    this.pause();
                } else {
                    this.play();
                }
            },
            play() {
                if (this.podcast) {
                    this.state.playing = true
                    this.$stats.push('play_' + this.audio.id);
                }
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
            },
            close () {
                this.pause();
                this.$store.state.selectedAudio = undefined;
            },
            scrollHandler () {
                let player = document.getElementById('podcast-player');
                if(player){
                    this.stick = (window.scrollY > player.offsetHeight);
                }
            }
        }
    }
</script>