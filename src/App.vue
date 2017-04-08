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
    <audio-player2 />
    <md-card>
      <router-view></router-view>
    </md-card>
  </div>
</template>

<script>
import AudioPlayer2 from './components/main/AudioPlayer2'
import MainNav from './components/navbars/MainNav'
import Dashboard from './components/main/Dashboard'

export default {
  name: 'app',
  components: {
    AudioPlayer2,
    MainNav,
    Dashboard
  },
  mounted() {
    this.$stats.push('render_home');
  }
}

</script>