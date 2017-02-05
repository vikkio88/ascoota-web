<style></style>
<template>
    <div>
        <md-card>
            <md-card-header>
                <router-link :to="{ name: 'singleRadioView', params: { radioId: radioId }}">
                    <md-icon>arrow_back</md-icon>
                </router-link>
                <md-card-media>
                    <img class="img" :alt="show.name" :title="show.name" :src="show.logo_url" />
                </md-card-media>
                <md-card-header-text>
                    <div class="md-title">{{show.name}}
                        <flag-icon :language="language" />
                    </div>
                </md-card-header-text>
            </md-card-header>
            <md-card-content>
                {{show.description}}
            </md-card-content>
            <md-card-actions>
                <a :href="show.website" target="_blank">
                    <md-icon>link</md-icon>
                </a>
                <a :href="show.feed_url" target="_blank">
                    <md-icon>rss_feed</md-icon>
                </a>
            </md-card-actions>
        </md-card>
        <md-card>
            <md-card-content v-if="podcasts.length">
                <md-list class="md-double-line">
                    <podcast-list-item :podcast="podcast" :showimg="false" v-for="podcast in podcasts" />
                </md-list>
            </md-card-content>
        </md-card>
    </div>
    <!--
    <div class="panel panel-primary">
        <img class="img" :alt="show.name" :title="show.name" :src="show.logo_url" />
        <div class="panel-heading">
            <div class="panel-title pull-left">
                <router-link :to="{ name: 'singleRadioView', params: { radioId: radioId }}" class="btn btn-primary">
                    <i class="material-icons" style="color: white">arrow_back</i>
                </router-link>
            </div>
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
    -->
</template>
<script>
    import PodcastListItem from './listItems/Podcast'
    import ShowService from '../../services/ascoota/ShowService.js'
    import FlagIcon from '../common/FlagIcon'

    export default {
        name: 'show',
        components: {
            FlagIcon,
            PodcastListItem
        },
        data() {
            return {
                params: this.$route.params,
                radioId: this.$route.params.radioId,
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