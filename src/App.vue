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
      <button class="btn btn-raised btn-xs" @click=test(1)>2024 02/12/2016</button>
      <button class="btn btn-raised btn-xs" @click=test(2)>La Zanzara 29/11/2016</button>
      <button class="btn btn-raised btn-xs" @click=test(3)>Too Long - Daft Punk</button>
      <audio-player :audio="audio" />
      <dashboard />
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
      }else if (number == 2){
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
      } else {
        this.audio ={
                title: 'Daft Punk - Too Long',
                src: 'http://cdn.mp3mad.com/48-351081/Too%20Long.mp3',
                description : 'A song, quite a long one',
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