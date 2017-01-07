<style></style>
<template>
    <div class="card">
        <img alt="Card image cap" src="http://www.vikkio.it/ascootaweb/bazinga/bazinga.jpg" class="img card-img-top">
        <div class="card-block">
            <h4 class="card-title">
                <h3>{{podcast.name}}</h3>
            </h4>
            <p class="card-text">
                {{podcast.date}} {{podcast.description}}
            </p>
            <a class="btn btn-primary btn-raised" :disabled="isSelected" @click="playMe">
                <i v-if="!isSelected" class="material-icons">play_arrow</i>
                <i v-if="isSelected" class="material-icons">play_circle_outline</i>
            </a>
        </div>
    </div>
</template>
<script>
    export default {
        name: "singlePodcast",
        props: {
            podcast: Object
        },
        computed: {
            isSelected() {
                let playingAudio = this.$store.state.selectedAudio !== undefined ? this.$store.state.selectedAudio : { id: -1 };
                return playingAudio.id === this.podcast.id;
            }
        },
        methods: {
            playMe() {
                this.$store.state.selectedAudio = this.podcast;
            }
        }
    }
</script>