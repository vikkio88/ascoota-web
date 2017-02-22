<style>
</style>
<template>
    <md-card>
        <md-card-media v-if="showimg">
                <img alt="podcast.name" :src="podcast.show.logo_url" @click.native="toggleMe">
        </md-card-media>
        <md-card-header>
            <div class="md-title">{{podcast.name}}</div>
            <div class="md-subhead">{{podcast.date}}</div>
        </md-card-header>
        <md-card-content>
            {{podcast.description}}
        </md-card-content>
        <md-card-actions>
            <md-button class="md-raised" :class="{ 'md-warn': isSelected, 'md-primary':!isSelected }" @click.native="toggleMe">
                <md-icon v-if="!isSelected">play_arrow</md-icon>
                <md-icon v-if="isSelected">stop</md-icon>
            </md-button>
        </md-card-actions>
    </md-card>
</template>
<script>
    export default {
        name: "singlePodcast",
        props: {
            podcast: Object,
            showimg: { type: Boolean, default: true }
        },
        computed: {
            isSelected() {
                let playingAudio = this.$store.state.selectedAudio !== undefined ? this.$store.state.selectedAudio : { id: -1 };
                return playingAudio.id === this.podcast.id;
            }
        },
        methods: {
            toggleMe() {
                if (!this.isSelected) {
                    this.$store.state.selectedAudio = this.podcast;
                    this.$store.state.autoPlay = true;
                } else {
                    this.$store.state.selectedAudio = undefined
                }
            }
        }
    }
</script>