<template>
  <div id="app">
    <audio-player :audio="audio" />
  </div>
</template>

<script>
import AudioPlayer from './components/AudioPlayer'

export default {
  name: 'app',
  data () {
        return {
            audio: {
                title: 'ninelie-Aimer',
                src: 'http://covteam.u.qiniudn.com/test2.mp3',
                poster: 'http://covteam.u.qiniudn.com/ka2.jpg',
                options: {
                    preload: false,
                    autoplay: false,
                    rate: 1,
                    loop: false,
                    volume: 0.5
                }
            }
        }
    },
  components: {
    AudioPlayer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
