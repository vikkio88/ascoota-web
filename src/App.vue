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
    <main-dialog />
    <main-nav />
    <div class="container container-fluid">
      <audio-player :audio="audio" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import AudioPlayer from './components/main/AudioPlayer'
  import MainNav from './components/navbars/MainNav'
  import Dashboard from './components/main/Dashboard'
  import MainDialog from './components/main/MainDialog'

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
      Dashboard,
      MainDialog
    },
    mounted() {
      this.$stats.push('render_home');
    }
  }
</script>