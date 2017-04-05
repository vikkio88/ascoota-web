<style>
#feedparser {
    text-align: center;
    width: 90%;
    margin: auto;
}
</style>
<template>
    <div id="feedparser">
        <div v-if="!isParsed">
            <h1>JIT - Feed Parser</h1>
            <md-input-container>
                <md-input v-model="feedUrl"
                          placeholder="http://thewebsite.com/the/feed.xml"></md-input>
            </md-input-container>
            <md-button class="md-raised" v-if="readyToSend" @click.native="parse" :disable="parsing">
                <span v-if="parsing">
                    <md-spinner md-indeterminate class="md-warn"></md-spinner>
                </span>
                <span v-else>
                    Parse
                </span>
            </md-button>
        </div>
        <div v-else>
            <show-details :show="show" :podcasts="podcasts" />
        </div>
    </div>
</template>
<script>
import ShowService from '../../services/ascoota/ShowService.js';
import isURL from 'validator/lib/isURL';
import ShowDetails from '../podcast/cards/ShowDetails';

const service = new ShowService();

export default {
    name: "feedParser",
    components: {
        ShowDetails
    },
    computed: {
        isValidUrl() {
            if (this.feedUrl) {
                this.validFeedUrl(this.feedUrl);
            }
            return true;
        },
        readyToSend() {
            return this.feedUrl && this.validFeedURL(this.feedUrl);
        }

    },
    data() {
        return {
            feedUrl: null,
            show: {},
            podcasts: [],
            isParsed: false,
            parsing: false,
        }
    },
    methods: {
        validFeedURL(website) {
            return isURL(website);
        },
        fixAndAssignPodcasts(podcasts){
            this.podcasts = podcasts.map( (podcast,index) =>{
                podcast.id = `PARSED_${index + 1}`;
                podcast.date = podcast.date.date;
                return podcast;
            });
        },
        parse() {
            this.parsing = true;
            service.parse(this.feedUrl).then(
                data => {
                    this.isParsed = true;
                    this.parsing = false;
                    this.show = data.body.payload;
                    this.fixAndAssignPodcasts(this.show.podcasts);
                },
                error => {
                    console.log(error);
                }
            );
        }
    }
}
</script>