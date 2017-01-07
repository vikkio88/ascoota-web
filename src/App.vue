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
    <div class="container container-fluid">
      <audio-player :audio="audio" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AudioPlayer from './components/AudioPlayer'
import MainNav from './components/MainNav'
import Dashboard from './components/Dashboard'

export default {
  name: 'app',
  data () {
        return {
            audio: null
        }
    },
  components: {
    AudioPlayer,
    MainNav,
    Dashboard
  }
}
</script>