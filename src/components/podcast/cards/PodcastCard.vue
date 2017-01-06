<style></style>
<template>
    <div class="card">
        <img alt="Card image cap" src="http://lorempixel.com/200/200/?32212" class="img card-img-top">
        <div class="card-block">
            <h4 class="card-title">
                <h3>{{podcast.name}}</h3>
            </h4>
            <p class="card-text">
                {{podcast.date}} {{podcast.description}}
            </p>
            <a class="btn btn-raised btn-primary">
                <i class="material-icons">play_arrow</i>
            </a>
        </div>
    </div>
</template>
<script>
    export default {
        name: "singlePodcast",
        props: {
            podcast: Object
        }
    }
</script>