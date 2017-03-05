<style>
    .clickable {
        cursor: pointer;
    }
    
    .progress-bar {
        margin-top: 15px;
        height: 20px;
    }
    
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
    
    img.logo-url-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
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
        <div class="logo-url-wrapper">
            <img v-if="audio.show" :src="audio.show.logo_url" style="height:150px" />
        </div>

        <span class="md-subheading">{{audio.description}}</span>
        <div @click="seek" class="progress-bar">
            <md-progress :md-progress="podcast.state.progress"></md-progress>
        </div>
        <div :class="{'clickable': state.playing}" @click="toggleTimeFormat">
            <span class="md-headline">{{podcast.state.lastTimeFormat}} / {{podcast.state.durationParsed}}</span>
        </div>
        <div class="audio-player">
            <md-card>
                <div class="controls-wrapper">
                    <md-button class="md-raised md-accent md-icon-button" @click.native="previous">
                        <md-icon>skip_previous</md-icon>
                    </md-button>
                    <md-button class="md-raised md-icon-button" @click.native="skip(-10)">
                        <md-icon>replay_10</md-icon>
                    </md-button>
                    <md-button class="md-raised" :class="{'md-primary':!state.playing, 'md-warn':state.playing}" @click.native="togglePlay">
                        <md-icon v-if="!state.playing">play_arrow</md-icon>
                        <md-icon v-if="state.playing">pause</md-icon>
                    </md-button>
                    <md-button class="md-raised md-icon-button" @click.native="skip(10)">
                        <md-icon>forward_10</md-icon>
                    </md-button>
                    <md-button class="md-raised md-accent md-icon-button" @click.native="next">
                        <md-icon>skip_next</md-icon>
                    </md-button>
                </div>
                <md-snackbar :md-position="'bottom center'" ref="snackbar" :md-duration="4000">
                    <span>{{snackMessage}}</span>
                    <md-button class="md-accent" @click.native="$refs.snackbar.close()">Close</md-button>
                </md-snackbar>

                <md-dialog ref="shareableLink">
                    <md-dialog-title>{{podcastLink}}</md-dialog-title>
                    <div style="flex: 0">
                        <md-switch v-model="attachTime">Add current time</md-switch>
                    </div>
                    <md-button class="md-primary" v-clipboard="podcastLink" @success="copiedSuccess">
                        <md-icon>content_copy</md-icon>
                    </md-button>
                    <md-dialog-actions>
                        <md-button class="md-primary" @click.native="$refs.shareableLink.close()">Ok</md-button>
                    </md-dialog-actions>
                </md-dialog>

            </md-card>
        </div>
        <md-button class="md-raised" @click.native="shareDialog">
            <md-icon>link</md-icon>
        </md-button>
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
                snackMessage: '',
                attachTime: false,
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
            },
            podcastLink() {
                let currentWebsite = window.location.protocol + "//" + window.location.host;
                let link = `${currentWebsite}/#/podcasts/${this.audio.id}`;
                if (this.attachTime) {
                    let seconds = parseInt(this.podcast.state.currentTime);
                    link = `${link}?t=${seconds}`;
                }
                return link;
            }
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
                        setTimeout(
                            this.play(),
                            500
                        );
                        if (this.state.initialSeek != 0) {
                            setTimeout(
                                () => { this.skip(this.state.initialSeek); this.state.initialSeek = 0; },
                                2000
                            );
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
                let maxOffset = event.target.offsetWidth;
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
                    this.snackMessage = "No more podcasts";
                    this.$refs.snackbar.open();
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
            shareDialog() {
                this.$refs['shareableLink'].open();
            },
            copiedSuccess() {
                this.$refs.shareableLink.close();
                this.snackMessage = "Link copied!";
                this.$refs.snackbar.open();
            }
        }
    }

</script>