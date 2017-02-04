<style>

</style>
<template>
    <md-card>
        <md-card-header>
            <md-card-header-text>
                <md-icon>trending_up</md-icon>
                <md-icon>audiotrack</md-icon>
            </md-card-header-text>
        </md-card-header>
        <md-card-content>
            <md-list class="md-double-line">
                <podcast-list-item :podcast="podcast" v-for="podcast in podcasts" />
            </md-list>
        </md-card-content>
    </md-card>
</template>
<script>
    import PodcastListItem from '../../podcast/listItems/Podcast'
    import bazingas from '../../../mocks/bazingas'

    export default {
        name: "podcasts",
        components: {
            PodcastListItem
        },
        data() {
            return {
                podcasts: bazingas
            };
        }
    }

</script>