<style></style>
<template>
    <div class="jumbotron">
        <img class="img" :alt="show.name" :title="show.name" :src="show.logo_url" />
        <h2>{{show.name}}</h2>
        <p>
            <h3>{{show.description}}</h3>
            <button class="btn btn-primary">
                    <i class="material-icons">link</i>
                </button>
            <button class="btn btn-primary">
                    <i class="material-icons">rss_feed</i>
                </button>
        </p>
        <div v-for="podcast in podcasts" class="panel panel-default">
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
import ShowService from '../../services/ascoota/ShowService.js'

export default {
    name: 'show',
    data () {
        return {
            params : this.$route.params,
            show: {},
            podcasts: []
        };
    },
    watch : {
        params() {
            this.init();
        }
    },
    mounted () {
        this.init();
    },
    methods : {
        stuff () {
            console.log("stuff");
        },
        init(){
            let params = this.$route.params;
            let service = new ShowService(params.radioId)
            service.getOne(params.showId).then(
                (data) => {
                    this.show = data.body.payload;
                    this.podcasts = this.show.podcasts;
                }
            ).catch(
                (error) => {
                    console.log("error");
                }
            );
        }
    }
}
</script>