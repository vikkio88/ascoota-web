<style></style>
<template>
    <div class="card">
        <img v-if="showimg" alt="Card image cap" src="http://www.vikkio.it/ascootaweb/bazinga/bazinga.jpg"
             class="img card-img-top clickable" @click="toggleMe">
        <div class="card-block">
            <h3 class="card-title">
                {{podcast.name}}
            </h3>
            <p class="card-text">
                {{podcast.date}} {{podcast.description}}
            </p>
            <a class="btn btn-raised" :class="isSelected? 'btn-danger': 'btn-primary'" @click="toggleMe">
                <i v-if="!isSelected" class="material-icons">play_arrow</i>
                <i v-if="isSelected" class="material-icons">stop</i>
            </a>
        </div>
    </div>
</template>
<script>
    export default {
        name: "singlePodcast",
        props: {
            podcast: Object,
            showimg: { type: Boolean, default: true }
        },
        computed: {
            isSelected() {
                let playingAudio = this.$store.state.selectedAudio !== undefined ? this.$store.state.selectedAudio : { id: -1 };
                return playingAudio.id === this.podcast.id;
            }
        },
        methods: {
            toggleMe() {
                if(!this.isSelected){
                    this.$store.state.selectedAudio = this.podcast;
                }else{
                    this.$store.state.selectedAudio = undefined
                }
            }
        }
    }

</script>