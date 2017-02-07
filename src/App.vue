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
    <md-button @click="toggleRightSidenav" class="md-fab md-wanr md-fab-bottom-right">
      <md-icon>play_arrow</md-icon>
    </md-button>
    <md-sidenav class="md-right" ref="rightSidenav">
      <md-toolbar>
        <div class="md-toolbar-container">
          <h3 class="md-title">Sidenav content</h3>
        </div>
      </md-toolbar>
      <audio-player :audio="audio" />
    </md-sidenav>
  </div>
</template>

<script>
  import AudioPlayer from './components/main/AudioPlayer'
  import MainNav from './components/navbars/MainNav'
  import Dashboard from './components/main/Dashboard'

  export default {
    name: 'app',
    data() {
      return {
        audio: null
      }
    },
    components: {
      AudioPlayer,
      MainNav,
      Dashboard
    },
    mounted() {
      this.$stats.push('render_home');
    },
    methods: {
      toggleRightSidenav() {
        this.$refs.rightSidenav.toggle();
      },
      closeRightSidenav() {
        this.$refs.rightSidenav.close();
      }
    }
  }

</script>