<style></style>
<template>
    <div>
        <md-card>
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
            </md-card-content>
        </md-card>
    </div>
</template>
<script>
    import PodcastListItem from '../listItems/Podcast'
    import FlagIcon from '../../common/FlagIcon'

    export default {
        name: "showDetails",
        components: {
            PodcastListItem,
            FlagIcon
        },
        props: {
            show: Object,
            podcasts: { type: Array, default: [] },
            language: { type: String, default: "it" },
            page: { type: Number, default: 1 }
        },
        methods: {

        }
    }

</script>