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
                title: 'La Zanzara del giorno 01\/12\/2016: Fighe bianke',
                src: 'http:\/\/audio.radio24.ilsole24ore.com\/radio24_audio\/2016\/161202-lazanzara-s.mp3',
                description : 'Lui \u00e8 Paul Yeboah, ma tutti lo conoscono come Bello Figo...',
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
