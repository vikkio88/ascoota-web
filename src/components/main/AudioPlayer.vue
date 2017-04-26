<style>
div.audio-player {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

div.controls-wrapper {
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
    <div v-if="audio">
        <md-speed-dial md-mode="fling"
                       md-direction="bottom"
                       class="md-fab md-fab-top-right">
            <md-button class="md-fab"
                       md-fab-trigger>
                <img :class="{'rotating-dial-icon': audio.state.playing}"
                     src="../../assets/logo.svg"
                     style="heigh:40px; width:40px" />
            </md-button>
            <md-button @click.native="toggle"
                       class="md-fab md-mini md-clean">
                <md-icon v-if="!audio.state.playing">play_arrow</md-icon>
                <md-icon v-else>pause</md-icon>
            </md-button>
            <md-button @click.native="toggleInfo"
                       class="md-fab md-mini md-clean">
                <md-icon>info_outline</md-icon>
                <md-tooltip v-if="audio.show"
                            md-direction="left">{{podcast.show.name}} - {{audio.state.lastTimeFormat}} / {{podcast.state.durationParsed}}</md-tooltip>
            </md-button>
            <md-button v-if="!podcast.jit_parsed"
                       @click.native="shareDialog"
                       class="md-fab md-mini md-clean">
                <md-icon>link</md-icon>
                <md-tooltip md-direction="left">Share</md-tooltip>
            </md-button>
        </md-speed-dial>
    
        <div id="progress-bar-wrapper"
             class="progress-bar clickable"
             @click="seek">
            <md-progress class="md-warn"
                         v-if="audio.state.buffering"
                         md-indeterminate
                         style="height:10px"></md-progress>
            <md-progress class="md-accent"
                         v-else
                         :md-progress="audio.state.progress"
                         style="height:10px"></md-progress>
        </div>
    
        <md-sidenav class="md-right"
                    ref="rightSidenav">
            <div v-if="audio != undefined">
                <md-toolbar>
                    <div class="md-toolbar-container">
                        <h3 class="md-title">Podcast Info</h3>
                    </div>
                </md-toolbar>
                <h3 class="md-title">{{podcast.name}}</h3>
                <div class="logo-url-wrapper">
                    <img v-if="podcast.show"
                         class="clickable"
                         :src="podcast.show.logo_url"
                         @click="goToShow(podcast.show.slug)"
                         style="height:150px" />
                </div>
                <span class="md-subheading">{{podcast.description}}</span>
                <div @click="toggleTimeFormat">
                    <span class="md-headline clickable">{{audio.state.lastTimeFormat}} / {{audio.state.durationParsed}}</span>
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
                                       :class="{'md-primary':!audio.state.playing, 'md-warn':audio.state.playing}"
                                       @click.native="toggle">
                                <md-icon v-if="!audio.state.playing">play_arrow</md-icon>
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
                <md-button class="md-raised"
                           :href="podcast.file_url"
                           download
                           target="_blank">
                    <md-icon>file_download</md-icon>
                </md-button>
            </div>
        </md-sidenav>
    
        <md-snackbar :md-position="'top left'"
                     ref="timeSkip"
                     :md-duration="1500">
            <span>{{audio.state.lastTimeFormat}} / {{audio.state.durationParsed}}</span>
            <md-button class="md-accent"
                       @click.native="$refs.timeSkip.close()">Close</md-button>
        </md-snackbar>

        <md-snackbar :md-position="'bottom center'"
                     ref="snackbar"
                     :md-duration="4000">
            <span>{{snackMessage}}</span>
            <md-button class="md-accent"
                       @click.native="$refs.snackbar.close()">Close</md-button>
        </md-snackbar>
    </div>
</template>
<script>
import PodcastService from '../../services/ascoota/PodcastService'

const podcastService = new PodcastService();

export default {
    name: 'audioPlayer',
    data() {
        return {
            snackMessage: '',
            attachTime: false,
        }
    },
    computed: {
        audio() {
            return this.$store.state.audio;
        },
        audioEnded() {
            let ended = false;
            if (this.audio != undefined) {
                ended = this.audio.state.ended;
            }
            return ended;
        },
        podcast() {
            return this.$store.state.selectedAudio;
        },
        podcastLink() {
            let currentWebsite = window.location.protocol + "//" + window.location.host;
            let link = `${currentWebsite}/#/podcasts/${this.podcast.id}`;
            if (this.attachTime) {
                let seconds = parseInt(this.audio.state.currentTime);
                link = `${link}?t=${seconds}`;
            }
            return link;
        }
    },
    watch: {
        audioEnded() {
            if (this.audio && this.audio.state.currentTime > 1) {
                this.pause();
            }
        }
    },
    methods: {
        toggle() {
            if (this.$store.state.audio.state.playing) {
                this.pause();
            } else {
                this.play();
            }
        },
        play() {
            this.$store.commit('play');
        },
        pause() {
            this.$store.commit('pause');
        },
        seek() {
            let offset = event.offsetX;
            let maxOffset = document.getElementById("progress-bar-wrapper").offsetWidth;
            let percent = offset / maxOffset;
            let time = percent * this.audio.state.duration;
            this.$store.commit('seek', time);
            console.log("skip");
            this.$refs.timeSkip.open();
        },
        skip(sec) {
            sec = parseInt(sec);
            this.$store.commit('seek', this.audio.state.currentTime + sec);
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
        toggleTimeFormat() {
            if (this.audio.state.playing) {
                this.audio.state.timeFormatRemaining = !this.audio.state.timeFormatRemaining;
            }
        },

        shareDialog() {
            this.$refs['shareableLink'].open();
        },
        copiedSuccess() {
            this.$refs.shareableLink.close();
            this.snackMessage = "Link copied!";
            this.$refs.snackbar.open();
        },
        toggleInfo() {
            this.$refs.rightSidenav.toggle();
        },
        goToShow(slug) {
            this.$router.push({ name: 'show', params: { slug } });
            this.$refs.rightSidenav.toggle();
        },
    }
}

</script>