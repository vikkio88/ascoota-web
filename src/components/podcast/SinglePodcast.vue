<style></style>
<template>
    <div>
        <div class="panel panel-default">
            <div class="panel-body">
                <h4>{{podcast.date}}</h4>
                <h3>{{podcast.name}}</h3>
                <h4>{{podcast.description}}</h4>
                <h3>{{podcast.duration}}</h3>
            </div>
        </div>
    </div>
</template>
<script>
     export default {
        name: "singlePodcast",
        props : {
            podcast: Object
        }
    }
</script>