<style>
#feedparser {
    text-align: center;
    width: 90%;
    margin: auto;
}
</style>
<template>
    <div id="feedparser">
        <h1>Feed Parser</h1>
        <md-input-container>
            <md-input v-model="feedUrl"
                      placeholder="http://thewebsite.com/the/feed.xml"></md-input>
        </md-input-container>
        <md-button class="md-raised" v-if="readyToSend" @click.native="parse">Parse</md-button>
    </div>
</template>
<script>
import isURL from 'validator/lib/isURL';

export default {
    name: "feedParser",
    computed: {
        isValidUrl() {
            if (this.feedUrl) {
                this.validFeedUrl(this.feedUrl);
            }
            return true;
        },
        readyToSend(){
            return this.feedUrl && this.validFeedURL(this.feedUrl);
        }

    },
    data() {
        return {
            feedUrl: null
        }
    },
    methods: {
        validFeedURL(website) {
            return isURL(website);
        },
        parse(){
            console.log(this.feedUrl);
        }
    }
}
</script>