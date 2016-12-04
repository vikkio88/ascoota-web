<style>
    .player-wrapper {
        margin: 5px 5px 10px 10px;
        padding-top: 5px;
    }
    
    div.controls-wrapper {
        margin-top: 10px;
    }
    
    .clickable {
        cursor: pointer;
    }
</style>

<template>
    <div class="podcast panel panel-inverse">
        <div class="clearfix" :class="{'panel-heading':showInfo}">
            <div class="panel-title pull-right">
                <a @click="toggleInfo">
                    <i v-show="showInfo" class="material-icons" title="Hide info">expand_less</i>
                    <i v-show="!showInfo" class="material-icons" title="Show info">expand_more</i>
                </a>
            </div>
        </div>
        <article class="player-wrapper">
            <div class="info-wrapper">
                <div class="content">
                    <div v-show="showInfo" class="podcast-title">
                        <h2><strong>{{audio.title}}</strong></h1>
                    </div>
                    <div v-show="showInfo" class="podcast-description">
                        <h3>{{audio.description}}</h3>
                    </div>
                    <!--
                    <div class="audio-slider">
                        <input class="form-control slider" type="range" :value="mu.state.progress" min="0" max="100" step="0.01" v-model="mu.state.progress"
                            @click="seek">
                    </div>
                    -->
                    <div @click="seek" class="progress clickable" :class="{'progress-striped':state.playing, 'active': state.playing}">
                        <div class="progress-bar" :style="{width: mu.state.progress+'%'}"></div>
                    </div>
                    <div v-show="showInfo" class="audio-time" :class="{'clickable': state.playing}" @click="toggleTimeFormat">
                        <h2>{{mu.state.lastTimeFormat}} / {{mu.state.durationParsed}}</h1>
                    </div>
                </div>
                <div class="controls-wrapper">
                    <button :disabled="!state.playing" @click="skip(-10)" class="btn btn-lg btn-raised" :class="{'disabled': !state.playing}">
                        <i class="material-icons">fast_rewind</i>
                    </button>
                    <button @click="togglePlay" class="btn btn-lg btn-raised btn-primary">
                        <i v-show="!state.playing" class="material-icons">play_arrow</i>
                        <i v-show="state.playing" class="material-icons">pause</i>
                    </button>
                    <button :disabled="!state.playing" @click="skip(10)" class="btn btn-lg btn-raised" :class="{'disabled': !state.playing}">
                        <i class="material-icons">fast_forward</i>
                    </button>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
    import VueAudio from '../VueAudio.js'

    export default {
        props: {
            audio: Object
        },
        data () {
            return {
                mu: {
                    state: {
                        startLoad: false,
                        failed: false,
                        try: 3,
                        tried: 0,
                        playing: false,
                        paused: false,
                        playbackRate: 1.0,
                        progress: 0,
                        currentTime: 0,
                        duration: 0,
                        volume: 0.5,
                        loaded: '0',
                        durationTimerFormat: '00:00',
                        currentTimeFormat: '00:00',
                        lastTimeFormat: '00:00'
                    }
                },
                state: {
                    playing: false
                },
                showInfo : true
            }
        },
        computed : {

        },
        mounted () {
            this.init()
        },
        beforeDestroy () {

        },
        methods: {
            init () {
                this.mu = new VueAudio(this.audio.src, this.audio.options);
            },
            toggleInfo () {
                this.showInfo = ! this.showInfo;
            },
            togglePlay () {
                if (this.state.playing) {
                    this.pause();
                } else {
                    this.play();
                }
            },
            play () {
                if(this.mu)
                this.state.playing = true
                this.mu.play()
            },
            pause () {
                this.state.playing = false
                this.mu.pause()
            },
            volumePlus () {
                this.mu.setVolume(this.mu.state.volume + 0.1)
            },
            volumeMinus () {
                this.mu.setVolume(this.mu.state.volume - 0.1)
            },
            toggleTimeFormat (){
                if(this.state.playing){
                    this.mu.state.timeFormatRemaining = !this.mu.state.timeFormatRemaining;
                }
            },
            skip(sec){
                this.mu.setTime(this.mu.state.currentTime + sec)
            },
            seek(event){
                let offset = event.offsetX;
                let maxOffset = event.toElement.offsetWidth;
                let percent = offset / maxOffset;
                //console.log(offset,maxOffset,percent);
                this.mu.setTime(percent * this.mu.state.duration);
            }

        }
    }
</script>