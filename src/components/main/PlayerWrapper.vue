<style>

</style>
<template>
    <div>
        <md-speed-dial v-if="audioSelected" md-mode="fling" md-direction="top" class="md-fab md-fab-bottom-right" md-theme="speedDial">
            <md-button class="md-fab" md-fab-trigger>
                <md-icon md-icon-morph>close</md-icon>
                <md-icon>audiotrack</md-icon>
            </md-button>
            <md-button @click.native="togglePlayer" class="md-fab md-mini md-clean">
                <md-icon>info_outline</md-icon>
            </md-button>
            <md-button class="md-fab md-mini md-clean">
                <md-icon>play_arrow</md-icon>
            </md-button>
        </md-speed-dial>

        <md-sidenav class="md-right" ref="rightSidenav">
            <audio-player />
        </md-sidenav>
    </div>

</template>
<script>
    import AudioPlayer from './AudioPlayer';

    export default {
        name: 'PlayerWrapper',
        components: {
            AudioPlayer
        },
        computed: {
            audioSelected() {
                return this.$store.state.selectedAudio !== undefined;
            }
        },
        methods: {
            togglePlayer() {
                this.$refs.rightSidenav.toggle();
            }
        }
    }

</script>