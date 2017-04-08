<style>

</style>
<template>
    <div v-if="audio">
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
        <md-button @click.native="toggle">Toggle</md-button>
    </div>
</template>
<script>
export default {
    name: 'audioPlayer2',
    data() {
        return {

        }
    },
    computed: {
        audio() {
            return this.$store.state.audio;
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
            this.$store.commit('seek', time);
        }
    }
}

</script>