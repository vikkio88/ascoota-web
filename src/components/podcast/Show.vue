<style></style>
<template>
    <div class="panel panel-primary">
        <img class="img" :alt="show.name" :title="show.name" :src="show.logo_url" />
        <div class="panel-heading">
            <h2>
                {{show.name}}
                <flag-icon :language="language" />
            </h2>
        </div>
        <div class="panel-body">
            <p>
                <h3 v-if="show.author">{{show.author}}</h3>
                <h3>{{show.description}}</h3>
                <a class="btn btn-primary" :href="show.website" target="_blank">
                    <i class="material-icons">link</i>
                </a>
                <a class="btn btn-primary" :href="show.feed_url" target="_blank">
                    <i class="material-icons">rss_feed</i>
                </a>
            </p>
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3>Podcasts</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div v-for="podcast in podcasts" class="col-sm-4">
                            <podcast-card :podcast="podcast" :showimg="false" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import PodcastCard from './cards/PodcastCard'
    import ShowService from '../../services/ascoota/ShowService.js'
    import FlagIcon from '../common/FlagIcon'

    export default {
        name: 'show',
        components: {
            FlagIcon,
            PodcastCard
        },
        data() {
            return {
                params: this.$route.params,
                show: {},
                language: 'it',
                podcasts: []
            };
        },
        watch: {
            params() {
                this.init();
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                let params = this.$route.params;
                let service = new ShowService(params.radioId)
                service.getOne(params.showId).then(
                    (data) => {
                        this.show = data.body.payload;
                        if (this.show.language !== undefined) {
                            this.language = this.show.language.iso;
                        }
                        this.podcasts = this.show.podcasts;
                    }
                ).catch(
                    (error) => {
                        console.log(error);
                    }
                    );
            }
        }
    }
</script>