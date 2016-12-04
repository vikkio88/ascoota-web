<template>
  <div id="app">
    <main-nav />
    <div class="container container-fluid">
      <audio-player :audio="audio" />
      <button @click=test(1)>Test 1</button>
      <button @click=test(2)>Test 2</button>
    </div>
  </div>
</template>

<script>
import AudioPlayer from './components/AudioPlayer'
import MainNav from './components/MainNav'

export default {
  name: 'app',
  data () {
        return {
            audio: null
        }
    },
  components: {
    AudioPlayer,
    MainNav
  },
  methods: {
    test(number){
      if(number == 1){
        this.audio = {
                title: '2024 del giorno 02\/12\/2016: Intelligenza artificiale, pubblicit\u00e0 digitale e cavi sottomarini',
                src: 'http:\/\/audio.radio24.ilsole24ore.com\/radio24_audio\/2016\/161202-2024-s.mp3',
                description : 'Per chi ancora pensa che i software di intelligenza artificiale non riescano a sostituire anche le attivit\u00e0 pi\u00f9 creative dell\'uomo \u00e8 utile ascoltare cosa gi\u00e0 oggi si sta facendo nel mercato editoriale...',
                options: {
                    preload: true,
                    autoplay: false,
                    rate: 1,
                    loop: false,
                    volume: 0.5
                }
            } 
      }else{
        this.audio ={
                title: 'La Zanzara del giorno 29\/11\/2016: Quei bravi ragazzi',
                src: 'http:\/\/audio.radio24.ilsole24ore.com\/radio24_audio\/2016\/161129-lazanzara-s.mp3',
                description : '"Lapo Elkann simula un rapimento negli Stati Uniti... ',
                options: {
                    preload: true,
                    autoplay: false,
                    rate: 1,
                    loop: false,
                    volume: 0.5
                }
            }
      }
    }
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
  }
</style>