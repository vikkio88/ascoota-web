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
    <mini-player-wrapper />
  </div>
</template>

<script>
  import MiniPlayerWrapper from './components/main/MiniPlayerWrapper'
  import MainNav from './components/navbars/MainNav'
  import Dashboard from './components/main/Dashboard'

  export default {
    name: 'app',
    components: {
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