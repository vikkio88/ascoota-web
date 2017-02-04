<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
<template>
  <div id="app">
    <main-nav />
    <md-card>
      <md-card-header>
      </md-card-header>
      <md-card-content>
        <router-view></router-view>
        <audio-player :audio="audio" />
      </md-card-content>
    </md-card>
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
    }
  }

</script>