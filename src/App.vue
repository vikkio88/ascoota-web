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
                title: 'Daft Punk - Too Long',
                src: 'http://cdn.mp3mad.com/48-351081/Too%20Long.mp3',
                poster: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Daft_Punk_-_Discovery.jpg',
                description : 'the coolest song ever',
                options: {
                    preload: true,
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
