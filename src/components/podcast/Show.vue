<style></style>
<template>
    <div>
        <show-details :show="show"
                      :podcasts="podcasts"
                      :language="language"
                      :page="page" />
        <div v-if="podcasts.length && page > 0">
            <md-button class="md-raised"
                       @click.native="more">More</md-button>
        </div>
    </div>
</template>
<script>
import ShowDetails from './cards/ShowDetails'

export default {
    name: 'show',
    components: {
        ShowDetails
    },
    data() {
        return {
            params: this.$route.params,
            show: {},
            language: 'it',
            podcasts: [],
            page: 1
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
            this.$services.show.getOne(params.slug).then(
                (data) => {
                    this.show = data.body.payload;
                    if (this.show.language !== undefined) {
                        this.language = this.show.language.iso;
                    }
                    this.podcasts = this.show.podcasts;
                }
            ).catch(error => { console.log(error); });
        },
        more() {
            this.page += 1;
            this.$services.show.getMorePodcasts(this.show.id, this.page).then(
                data => {
                    let newPodcasts = data.body.payload;
                    if (newPodcasts.length == 0) {
                        this.page = 0;
                        return;
                    }
                    this.podcasts = this.podcasts.concat(newPodcasts);
                }
            ).catch(error => { console.log(error); });
        }
    }
}

</script>