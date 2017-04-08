<style>
#feedparser {
    text-align: center;
}
</style>
<template>
    <div id="feedparser">
        <md-card>
            <div v-if="!isParsed">
                <md-card-header>
                    <div class="md-title">JIT - Podcast Feed Parser</div>
                    <span class="md-subheading narrow">Paste the podcast rss feed url, and <strong>aScoota</strong> will show them out in a more user friendly way, for you to play or download them.</span>
                </md-card-header>
                <md-card-content>
                    <md-input-container>
                        <md-input v-model="feedUrl" placeholder="http://thewebsite.com/the/feed.xml"></md-input>
                    </md-input-container>
                    <md-button class="md-raised"
                               v-if="readyToSend"
                               @click.native="parse"
                               :disable="parsing">
                        <md-spinner v-if="parsing" md-indeterminate class="md-warn"></md-spinner>
                        <span v-else>
                            <md-icon>send</md-icon>
                        </span>
                    </md-button>
                </md-card-content>
            </div>
            <div v-else>
                <md-card-content>
                    <show-details :show="show"
                                  :podcasts="podcasts"
                                  downloadable/>
                </md-card-content>
            </div>
        </md-card>
        <md-snackbar :md-position="'bottom center'"
                     ref="snackbar"
                     :md-duration="4000">
            <span>I can't see any podcasts in there... :(</span>
            <md-button class="md-accent"
                       md-theme="light-blue"
                       @click.native="$refs.snackbar.close()">OK</md-button>
        </md-snackbar>
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
        fixAndAssignPodcasts(podcasts) {
            this.podcasts = podcasts.map((podcast, index) => {
                podcast.id = `PARSED_${index + 1}`;
                podcast.date = podcast.date.date;
                podcast.jit_parsed = true;
                return podcast;
            });
        },
        parse() {
            this.$stats.push(`PARSE_REQUEST_${this.feedUrl}`);
            this.parsing = true;
            service.parse(this.feedUrl).then(
                data => {
                    this.isParsed = true;
                    this.parsing = false;
                    this.show = data.body.payload;
                    this.fixAndAssignPodcasts(this.show.podcasts);
                },
                error => {
                    this.$refs.snackbar.open();
                    this.isParsed = false;
                    this.parsing = false;
                    this.feedUrl = null;
                }
            );
        }
    }
}
</script>