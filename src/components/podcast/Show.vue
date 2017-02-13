<style></style>
<template>
    <div>
        <md-card>
            <router-link :to="{ name: 'singleRadioView', params: { radioId: radioId }}" tag="md-button">
                <md-icon>arrow_back</md-icon>
            </router-link>
            <md-card-header>
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
                    <podcast-list-item :podcast="podcast" :show="show" :showimg="false" v-for="podcast in podcasts" />
                </md-list>
                <md-button @click="more">More</md-button>
            </md-card-content>
        </md-card>
    </div>
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
                service: null,
                params: this.$route.params,
                radioId: this.$route.params.radioId,
                show: {},
                language: 'it',
                podcasts: [],
                page:1
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
                this.service = new ShowService(params.radioId)
                this.service.getOne(params.showId).then(
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
            },
            more(){
                this.page += 1;
                this.service.getMorePodcasts(this.show.id, this.page).then(
                    (data) => {
                        this.podcasts = this.podcasts.concat(data.body.payload);
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