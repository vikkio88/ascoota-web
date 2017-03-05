<style>
  html,
  body,
  .app-viewport {
    height: 100%;
    overflow: hidden;
    text-align: center;
  }
  
  .app-viewport {
    display: flex;
    flex-flow: column;
  }

  .content {
    display: flex;
    justify-content: center;
    align-content: center;
  }
</style>
<template>
  <div id="app" class="app-viewport phone-viewport">
    <main-nav />
    <md-card>
      <md-card-header>
      </md-card-header>
      <md-card-content>
        <div class="content">
          <div>
            <router-view></router-view>
          </div>
          <div v-if="$mq.above(700) && audioSelected">
            <audio-player />
          </div>
        </div>
      </md-card-content>
    </md-card>
    <mini-player-wrapper />
  </div>
</template>

<script>
  import AudioPlayer from './components/main/AudioPlayer'
  import MiniPlayerWrapper from './components/main/MiniPlayerWrapper'
  import MainNav from './components/navbars/MainNav'
  import Dashboard from './components/main/Dashboard'

  export default {
    name: 'app',
    components: {
      AudioPlayer,
      MiniPlayerWrapper,
      MainNav,
      Dashboard
    },
    mounted() {
      this.$stats.push('render_home');
    },
    computed: {
      audioSelected() {
        return this.$store.state.selectedAudio !== undefined;
      }
    }
  }

</script>