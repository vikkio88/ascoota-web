<style>
.clickable {
    cursor: pointer;
}

.progress-bar {
    margin-top: 15px;
    height: 10px;
}

.md-progress {
    height: 15px;
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

.rotating-dial-icon {
    animation-name: ckw;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    transform-origin: 50% 50%;
    display: inline-block;
}

@keyframes ckw {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
<template>
    <div>
        <md-speed-dial v-if="audioSelected"
                       md-mode="fling"
                       md-direction="bottom"
                       class="md-fab md-fab-top-right">
            <md-button class="md-fab"
                       md-fab-trigger>
                <img :class="{'rotating-dial-icon': podcast.state.playing}"
                     src="../../assets/logo.svg"
                     style="heigh:40px; width:40px" />
            </md-button>
            <md-button @click.native="togglePlay"
                       class="md-fab md-mini md-clean">
                <md-icon v-if="!podcast.state.playing">play_arrow</md-icon>
                <md-icon v-else>pause</md-icon>
            </md-button>
            <md-button @click.native="togglePlayer"
                       class="md-fab md-mini md-clean">
                <md-icon>info_outline</md-icon>
                <md-tooltip v-if="audio.show"
                            md-direction="left">{{audio.show.name}} - {{podcast.state.lastTimeFormat}} / {{podcast.state.durationParsed}}</md-tooltip>
            </md-button>
            <md-button v-if="!audio.jit_parsed" @click.native="shareDialog"
                       class="md-fab md-mini md-clean">
                <md-icon>link</md-icon>
                <md-tooltip md-direction="left">Share</md-tooltip>
            </md-button>
        </md-speed-dial>
        <md-sidenav class="md-right"
                    ref="rightSidenav">
            <div v-if="audio != undefined">
                <md-toolbar>
                    <div class="md-toolbar-container">
                        <h3 class="md-title">Player</h3>
                    </div>
                </md-toolbar>
                <h3 class="md-title">{{audio.name}}</h3>
                <div class="logo-url-wrapper">
                    <img v-if="audio.show"
                         class="clickable"
                         :src="audio.show.logo_url"
                         @click="goToShow(audio.show.slug)"
                         style="height:150px" />
                </div>

                <span class="md-subheading">{{audio.description}}</span>
                <div id="progress-bar-wrapper"
                     class="progress-bar"
                     @click="seek">
                    <md-progress class="md-warn"
                                 v-if="podcast.state.buffering"
                                 md-indeterminate
                                 style="height:10px"></md-progress>
                    <md-progress class="md-accent"
                                 v-else
                                 :md-progress="podcast.state.progress"
                                 style="height:10px"></md-progress>
                </div>
                <div :class="{'clickable': podcast.state.playing}"
                     @click="toggleTimeFormat">
                    <span class="md-headline">{{podcast.state.lastTimeFormat}} / {{podcast.state.durationParsed}}</span>
                </div>
                <div class="audio-player">
                    <md-card>
                        <div class="controls-wrapper">
                            <md-button class="md-raised md-accent md-icon-button"
                                       @click.native="previous">
                                <md-icon>skip_previous</md-icon>
                            </md-button>
                            <md-button class="md-raised md-icon-button"
                                       @click.native="skip(-10)">
                                <md-icon>replay_10</md-icon>
                            </md-button>
                            <md-button class="md-raised"
                                       :class="{'md-primary':!podcast.state.playing, 'md-warn':podcast.state.playing}"
                                       @click.native="togglePlay">
                                <md-icon v-if="!podcast.state.playing">play_arrow</md-icon>
                                <md-icon v-else>pause</md-icon>
                            </md-button>
                            <md-button class="md-raised md-icon-button"
                                       @click.native="skip(10)">
                                <md-icon>forward_10</md-icon>
                            </md-button>
                            <md-button class="md-raised md-accent md-icon-button"
                                       @click.native="next">
                                <md-icon>skip_next</md-icon>
                            </md-button>
                        </div>
                        <md-snackbar :md-position="'bottom center'"
                                     ref="snackbar"
                                     :md-duration="4000">
                            <span>{{snackMessage}}</span>
                            <md-button class="md-accent"
                                       @click.native="$refs.snackbar.close()">Close</md-button>
                        </md-snackbar>
    
                        <md-dialog ref="shareableLink">
                            <md-dialog-title>{{podcastLink}}</md-dialog-title>
                            <div style="flex: 0">
                                <md-switch v-model="attachTime">Add current time</md-switch>
                            </div>
                            <md-button class="md-warn"
                                       v-clipboard="podcastLink"
                                       @success="copiedSuccess">
                                <md-icon>content_copy</md-icon>
                            </md-button>
                            <md-dialog-actions>
                                <md-button class="md-warn md-raised"
                                           @click.native="$refs.shareableLink.close()">Cancel</md-button>
                            </md-dialog-actions>
                        </md-dialog>
    
                    </md-card>
                </div>
                <md-button class="md-raised" :href="audio.file_url" download target="_blank"><md-icon>file_download</md-icon></md-button>
            </div>
        </md-sidenav>
    </div>
</template>
<script>
import VueAudio from '../../VueAudio.js'
import PodcastService from '../../services/ascoota/PodcastService'
import UserService from '../../services/ascoota/UserService'

const podcastService = new PodcastService();
const userService = new UserService();


export default {
    name: 'audio-player',
    watch: {
        audio() {
            this.destroy();
            this.init();
        },
        audioEnded() {
            if (this.audioSelected && this.podcast.currentTime > 1) {
                this.pause();
            }
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
            positionSaver: null,
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
                initialSeek: 0,
            },
            alert: {
                content: 'No more podcasts :(',
                ok: 'Ok'
            },
            tempTitle: null
        }
    },
    computed: {
        audio() {
            return this.$store.state.selectedAudio;
        },
        audioSelected() {
            return this.$store.state.selectedAudio !== undefined;
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
        },
        audioEnded() {
            let ended = false;
            if (this.podcast != undefined) {
                ended = this.podcast.state.ended;
            }
            return ended;
        }
    },
    methods: {
        init() {
            if (this.audio != undefined) {
                this.$stats.push('play_' + this.audio.id);
                let options = this.audio.options === undefined ? this.defaultOptions : this.audio.options;
                this.podcast = new VueAudio(this.audio.file_url, options);
                this.state.initialSeek = this.$store.state.startTime;
                this.$store.state.startTime = 0;
                this.setTitle();
                if (this.$store.state.autoPlay) {
                    this.$store.state.autoPlay = false;
                    this.play()
                    if (this.state.initialSeek != 0) {
                        setTimeout(
                            () => { this.skip(this.state.initialSeek); this.state.initialSeek = 0; },
                            1000
                        );
                    }
                }
            }
        },
        destroy() {
            if (this.podcast != null && this.podcast.destroyed != undefined) {
                this.podcast.destroyed();
                this.podcast = null;
                document.title = this.tempTitle;
            }
        },
        togglePlay() {
            if (this.podcast.state.playing) {
                this.pause();
            } else {
                this.play();
            }
        },
        play() {
            if (this.podcast) {
                this.podcast.play();
                this.setTitle();
                this.startPositionSaver()
            }
        },
        pause() {
            console.log("pause");
            if (this.podcast) {
                this.podcast.pause()
                this.setTitle();
                this.stopPositionSaver()
            }
        },
        volumePlus() {
            this.podcast.setVolume(this.podcast.state.volume + 0.1)
        },
        volumeMinus() {
            this.podcast.setVolume(this.podcast.state.volume - 0.1)
        },
        toggleTimeFormat() {
            if (this.podcast.state.playing) {
                this.podcast.state.timeFormatRemaining = !this.podcast.state.timeFormatRemaining;
            }
        },
        skip(sec) {
            sec = parseInt(sec);
            this.podcast.setTime(this.podcast.state.currentTime + sec);
        },
        seek() {
            let offset = event.offsetX;
            let maxOffset = document.getElementById("progress-bar-wrapper").offsetWidth;
            let percent = offset / maxOffset;
            this.podcast.setTime(percent * this.podcast.state.duration);
            this.positionSave();
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
            let playChar = this.podcast.state.playing ? '►' : '■'
            document.title = `${playChar} ${this.audio.name}`;
        },
        shareDialog() {
            this.$refs['shareableLink'].open();
        },
        copiedSuccess() {
            this.$refs.shareableLink.close();
            this.snackMessage = "Link copied!";
            this.$refs.snackbar.open();
        },
        togglePlayer() {
            this.$refs.rightSidenav.toggle();
        },
        goToShow(slug) {
            this.$router.push({ name: 'show', params: { slug } });
            this.$refs.rightSidenav.toggle();
        },
        startPositionSaver() {
            return;
            if (!this.positionSaver) {
                this.positionSaver = setInterval(
                    this.positionSave(),
                    1000 * 30
                )
            }
        },
        stopPositionSaver() {
            return;
            clearInterval(this.positionSaver);
        },
        positionSave() {
            return;
            if (this.$store.state.isLoggedIn) {
                userService.positionSave({ podcast_id: this.audio.id, position: this.podcast.state.currentTime })
            }
        }
    }
}

</script>