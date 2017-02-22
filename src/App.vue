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
</style>
<template>
  <div id="app" class="app-viewport phone-viewport">
    <main-nav />
    <md-card>
      <md-card-header>
      </md-card-header>
      <md-card-content>
        <router-view></router-view>
      </md-card-content>
    </md-card>

    <md-speed-dial v-if="audioSelected" md-mode="scale" class="md-fab md-fab-bottom-right">
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
      <audio-player/>
    </md-sidenav>
  </div>
</template>

<script>
  import AudioPlayer from './components/main/AudioPlayer'
  import MainNav from './components/navbars/MainNav'
  import Dashboard from './components/main/Dashboard'

  export default {
    name: 'app',
    components: {
      AudioPlayer,
      MainNav,
      Dashboard
    },
    computed: {
      audioSelected() {
        return this.$store.state.selectedAudio !== undefined;
      }
    },
    mounted() {
      this.$stats.push('render_home');
    },
    methods: {
      togglePlayer() {
        this.$refs.rightSidenav.toggle();
      }
    }
  }

</script>