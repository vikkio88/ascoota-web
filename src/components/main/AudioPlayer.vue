<style>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .3s
    }
    
    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }
    
    .bottom {
        min-height: 56px;
    }
</style>
<template>
    <div class="bottom-player" v-if="audio != undefined">
        <div @click="seek">
        <md-progress :md-progress="podcast.state.progress"></md-progress>
        </div>
        <md-bottom-bar>
            <div @click="previous">
                <md-bottom-bar-item md-icon="skip_previous"></md-bottom-bar-item>
            </div>
            <div @click="skip(-10)">
                <md-bottom-bar-item v-if="state.playing" md-icon="fast_rewind"></md-bottom-bar-item>
            </div>
            <div @click="togglePlay">
                <md-bottom-bar-item v-if="!state.playing" @click="togglePlay" md-icon="play_arrow"></md-bottom-bar-item>
                <md-bottom-bar-item v-if="state.playing" @click="togglePlay" md-icon="pause"></md-bottom-bar-item>
            </div>
            <div @click="skip(10)">
                <md-bottom-bar-item v-if="state.playing" md-icon="fast_forward"></md-bottom-bar-item>
            </div>
            
            <div @click="next">
                <md-bottom-bar-item md-icon="skip_next"></md-bottom-bar-item>
            </div>
            
        </md-bottom-bar>
    </div>
    <!--
        <div id="podcast-player" class="podcast panel panel-primary" v-if="audio != undefined" :class="{'minimized':minimized}">
            <article class="player-wrapper">
                <div class="info-wrapper">
                    <div class="content">
                        <div v-show="!minimized" class="podcast-title">
                            <h2><strong>{{audio.name}}</strong></h2>
                        </div>
                        <div v-show="!minimized" class="podcast-description">
                            <h3>{{audio.description}}</h3>
                        </div>
                        <div id="slider-control" @click="seek" class="progress clickable" :class="{'progress-striped':state.playing, 'active': state.playing}"
                            style="height: 15px;margin-bottom: 0">
                            <div class="progress-bar" :style="{width: podcast.state.progress+'%'}"></div>
                    </div>
                    <div v-show="minimized">{{shortDescription}}</div>
                    <div v-show="!minimized" class="audio-time" :class="{'clickable': state.playing}" @click="toggleTimeFormat">
                        <h2>{{podcast.state.lastTimeFormat}} / {{podcast.state.durationParsed}}</h2>
                    </div>
                </div>
                <div class="controls-wrapper">
                    <button :disabled="audio.previous_podcast_id == undefined" @click="previous" class="btn btn-xs hidden-xs" :class="{'disabled': !audio.previous_podcast_id}">
                            <i class="material-icons">skip_previous</i>
                            <div class="ripple-container"></div>
                        </button>

                    <button :disabled="!state.playing" @click="skip(-10)" class="btn btn-xs btn-raised" :class="{'disabled': !state.playing}">
                            <i class="material-icons">fast_rewind</i>
                        </button>
                    <button @click="togglePlay" class="btn btn-lg btn-raised btn-primary">
                            <i v-show="!state.playing" class="material-icons">play_arrow</i>
                            <i v-show="state.playing" class="material-icons">pause</i>
                            <div class="ripple-container"></div>
                        </button>
                    <button :disabled="!state.playing" @click="skip(10)" class="btn btn-xs btn-raised" :class="{'disabled': !state.playing}">
                            <i class="material-icons">fast_forward</i>
                            <div class="ripple-container"></div>
                        </button>

                    <button :disabled="audio.next_podcast_id == undefined" @click="next" class="btn btn-xs hidden-xs" :class="{'disabled': !audio.next_podcast_id}">
                            <i class="material-icons">skip_next</i>
                            <div class="ripple-container"></div>
                        </button>
                </div>
        </div>
        </article>
        </div>-->
</template>
<script>
    import VueAudio from '../../VueAudio.js'
    import PodcastService from '../../services/ascoota/PodcastService'

    const podcastService = new PodcastService();


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
                    playing: false,
                    initialSeek: 0,
                },
                tempTitle: null,
                minimized: true
            }
        },
        computed: {
            audio() {
                return this.$store.state.selectedAudio;
            },
            shortDescription() {
                let description = this.audio.description.substring(0, 13) + '...'
                return `${this.audio.name} - ${description}`;
            }
        },
        mounted() {
            window.addEventListener('scroll', this.scrollHandler);
        },
        methods: {
            init() {
                if (this.audio !== undefined) {
                    let options = this.audio.options === undefined ? this.defaultOptions : this.audio.options;
                    this.podcast = new VueAudio(this.audio.file_url, options);
                    this.state.initialSeek = this.$store.state.startTime;
                    this.$store.state.startTime = 0;
                    this.setTitle();
                    if (this.$store.state.autoPlay) {
                        this.$store.state.autoPlay = false;
                        this.play();
                        if(this.state.initialSeek != 0){
                            setTimeout(() => { this.skip(this.state.initialSeek); this.state.initialSeek = 0; }, 1000);
                        }
                    }
                }
            },
            destroy() {
                if (this.podcast !== null && this.podcast.destroyed !== undefined) {
                    this.state.playing = false;
                    this.podcast.destroyed();
                    this.podcast = null;
                    document.title = this.tempTitle;
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
                this.podcast.play();
                this.setTitle();
            },
            pause() {
                this.state.playing = false
                this.podcast.pause()
                this.setTitle();
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
                sec = parseInt(sec);
                this.podcast.setTime(this.podcast.state.currentTime + sec);
            },
            seek(event) {
                let offset = event.offsetX;
                let maxOffset = document.body.offsetWidth;
                let percent = offset / maxOffset;
                this.podcast.setTime(percent * this.podcast.state.duration);
            },
            next() {
                this.changePodcast(this.audio.next_podcast_id);
            },
            previous() {
                this.changePodcast(this.audio.previous_podcast_id);
            },
            changePodcast(podcastId) {
                this.pause();
                podcastService.getOne(podcastId).then(
                    (data) => {
                        if (data.body.payload !== null) {
                            this.$store.state.selectedAudio = data.body.payload;
                            this.$store.state.autoPlay = true;
                        }
                    }
                ).catch(
                    (error) => {
                        console.log(error);
                    });
            },
            close() {
                this.pause();
                this.$store.state.selectedAudio = undefined;
            },
            setTitle() {
                if (this.tempTitle == undefined) {
                    this.tempTitle = document.title;
                }
                let playChar = this.state.playing ? '►' : '■'
                document.title = playChar + ' ' + this.audio.name;
            },
            scrollHandler() {
                if (this.getOffset() >= document.body.offsetHeight) {
                    this.minimized = false;
                } else {
                    this.minimized = true;
                }
            },
            getOffset() {
                let wH = window.innerHeight;
                let sH = window.scrollY;
                let player = document.getElementById('podcast-player');
                let pH = 0;
                if (player != undefined) {
                    pH = player.offsetHeight;
                }
                return this.minimized ? (wH + sH) : (wH + sH + pH);
            }
        }
    }

</script>