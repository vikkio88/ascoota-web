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
    <md-button @click="toggleRightSidenav" class="md-fab md-fab-bottom-right">
      <md-icon>audiotrack</md-icon>
    </md-button>
    <md-sidenav class="md-right" ref="rightSidenav">
      <md-toolbar>
        <div class="md-toolbar-container">
          <h3 class="md-title">Podcast Player</h3>
        </div>
      </md-toolbar>
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