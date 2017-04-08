<style></style>
<template>
    <div>
        <md-card>
            <md-card-header>
                <md-card-media>
                    <img class="img"
                         :alt="show.name"
                         :title="show.name"
                         :src="show.logo_url" />
                </md-card-media>
                <md-card-header-text>
                    <div class="md-title">{{show.name}}
                        <flag-icon v-if="language" :language="language" />
                    </div>
                    <div class="md-subhead">{{show.author}}</div>
                </md-card-header-text>
            </md-card-header>
            <md-card-content>
                <div>{{show.description}}</div>
            </md-card-content>
            <div>
                <a :href="show.website"
                   target="_blank">
                    <md-icon>link</md-icon>
                </a>
                <a :href="show.feed_url"
                   target="_blank">
                    <md-icon>rss_feed</md-icon>
                </a>
            </div>
        </md-card>
        <md-card>
            <md-card-content v-if="podcasts.length">
                <md-button v-if="sortable" class="md-raised" @click.native="reverseSort">
                    <md-icon>sort</md-icon>
                    <md-icon v-if="sortOrderRecent">arrow_upward</md-icon>
                    <md-icon v-else>arrow_downward</md-icon>
                </md-button>
                <md-list class="md-double-line">
                    <podcast-list-item :podcast="podcast"
                                       :show="show"
                                       :showimg="false"
                                       :downloadable="downloadable"
                                       v-for="podcast in podcasts" />
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
    data() {
        return {
            sortOrderRecent: true
        }
    },
    props: {
        show: Object,
        downloadable: { type: Boolean, default: false },
        sortable: { type: Boolean, default: false },
        podcasts: { type: Array, default: [] },
        language: { type: String, default: null },
        page: { type: Number, default: 1 }
    },
    methods: {
        reverseSort() {
            this.sortOrderRecent = ! this.sortOrderRecent;
            this.podcasts = this.podcasts.reverse();
        }
    }
}

</script>