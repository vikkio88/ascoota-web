<style>
    div.audio-player {
        margin-top: 20px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    
    div.controls-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    div.controls-wrapper.bottom {
        justify-content: space-around;
    }
</style>
<template>
    <div v-if="audio != undefined">
        <md-toolbar>
            <div class="md-toolbar-container">
                <h3 class="md-title">Player</h3>
            </div>
        </md-toolbar>
        <h3 class="md-title">{{audio.name}}</h3>
        <span class="md-subheading">{{audio.description}}</span>
        <div @click="seek">
            <md-progress :md-progress="podcast.state.progress"></md-progress>
        </div>
        <div :class="{'clickable': state.playing}" @click="toggleTimeFormat">
                    <span class="md-headline">{{podcast.state.lastTimeFormat}} / {{podcast.state.durationParsed}}</span>
                </div>
        <div class="audio-player">
            <md-card>
                <div class="controls-wrapper">
                    <md-button class="md-raised md-accent md-icon-button" @click="previous">
                        <md-icon>skip_previous</md-icon>
                    </md-button>
                    <md-button class="md-raised md-icon-button" @click="skip(-10)">
                        <md-icon>fast_rewind</md-icon>
                    </md-button>
                    <md-button class="md-raised" :class="{'md-primary':!state.playing, 'md-warn':state.playing}" @click="togglePlay">
                        <md-icon v-if="!state.playing">play_arrow</md-icon>
                        <md-icon v-if="state.playing">pause</md-icon>
                    </md-button>
                    <md-button class="md-raised md-icon-button" @click="skip(10)">
                        <md-icon>fast_forward</md-icon>
                    </md-button>
                    <md-button class="md-raised md-accent md-icon-button" @click="next">
                        <md-icon>skip_next</md-icon>
                    </md-button>
                </div>
                <md-dialog-alert :md-content="alert.content" :md-ok-text="alert.ok" ref="errorMessage">
                </md-dialog-alert>
            </md-card>
        </div>
    </div>
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
                alert: {
                    content: 'No more podcasts :(',
                    ok: 'Ok'
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
                return `${this.audio.name} - ${this.audio.description}`.substring(0, 60) + '...';
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
                        if (this.state.initialSeek != 0) {
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
                let maxOffset = document.body.offsetWidth; //todo: change with element offset
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
                if (podcastId == undefined) {
                    this.$refs['errorMessage'].open()
                    return;
                }
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
                //Here I will transform the audio-player
                //in a floating button
            }
        }
    }

</script>