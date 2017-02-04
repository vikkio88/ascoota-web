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
            <md-layout :md-gutter="8">
                <md-layout v-for="podcast in podcasts">
                    <podcast-card :podcast="podcast" />
                </md-layout>
            </md-layout>
        </md-card-content>
    </md-card>
</template>
<script>
    import PodcastCard from '../../podcast/cards/PodcastCard'
    import bazingas from '../../../mocks/bazingas'

    export default {
        name: "podcasts",
        components: {
            PodcastCard
        },
        data() {
            return {
                podcasts: bazingas
            };
        }
    }

</script>