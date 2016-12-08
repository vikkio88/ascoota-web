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
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AudioPlayer from './components/AudioPlayer'
import MainNav from './components/MainNav'
import Dashboard from './components/Dashboard'

// mocks 
import audioMocks from './mocks/audioMocks'

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
      this.audio = audioMocks[number];
    }
  }
}
</script>