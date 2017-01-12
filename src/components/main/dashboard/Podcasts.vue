<style>

</style>
<template>
    <div class="panel panel-primary">
        <div class="panel-heading">
            <h3><i class="material-icons">trending_up</i> <i class="material-icons">audiotrack</i></h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div v-for="podcast in podcasts" class="col-sm-4">
                    <podcast-card :podcast="podcast" />
                </div>
            </div>
        </div>
    </div>
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