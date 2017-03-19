<style>
    div.podcast-list-item {
        margin: 10px;
    }
    
    .selected {
        background-color: #E8E8E8;
        color: #009688;
    }
</style>
<template>
    <div class="podcast-list-item" :class="{ 'selected': isSelected}">
        <md-list-item @click.native="toggleMe">
            <md-button class="md-raised md-icon-button md-list-action" :class="{ 'md-warn': isSelected, 'md-primary': !isSelected }"v-if="!showimg">
                <md-icon v-if="!isSelected">play_arrow</md-icon>
                <md-icon v-if="isSelected">stop</md-icon>
            </md-button>
            <md-avatar class="md-avatar-icon" v-else>
                <img alt="podcast.name" :src="podcast.show.logo_url">
            </md-avatar>
            <div class="md-list-text-container">
                <span v-if="showimg">{{show.name}}</span>
                <span>{{podcast.name}} - {{podcast.description}}</span>
                <p>{{podcast.date}}</p>
            </div>
            <md-divider class="md-inset"></md-divider>
        </md-list-item>
    </div>
</template>
<script>
    export default {
        name: "podcast-list-item",
        props: {
            podcast: Object,
            show: { type: Object, default: undefined },
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
                    if (this.show !== undefined) {
                        this.podcast.show = {
                            name: this.show.name,
                            logo_url: this.show.logo_url,
                            slug: this.show.slug
                        }
                    }
                    this.$store.state.selectedAudio = this.podcast;
                    this.$store.state.autoPlay = true;
                } else {
                    this.$store.state.selectedAudio = undefined
                }
            }
        }
    }

</script>