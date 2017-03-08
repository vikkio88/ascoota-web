<style>

</style>
<template>
    <div v-if="$mq.below(700)">
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
            <md-toolbar>
                <div class="md-toolbar-container">
                    <h3 class="md-title">Player</h3>
                </div>
            </md-toolbar>
            <side-audio-player />
        </md-sidenav>
    </div>
</template>
<script>
    import SideAudioPlayer from './SideAudioPlayer';

    export default {
        name: 'miniPlayerWrapper',
        components: {
            SideAudioPlayer
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