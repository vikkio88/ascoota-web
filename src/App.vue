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
    <router-view></router-view>
    <audio-player />
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
  }
}

</script>