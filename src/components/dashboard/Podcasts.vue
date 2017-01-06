<style>

</style>
<template>
    <div class="panel panel-primary">
        <div class="panel-heading">
            <h3><i class="material-icons">trending_up</i> <i class="material-icons">audiotrack</i></h3>
        </div>
        <div class="panel-group">
            <single-podcast :podcast="podcast" v-for="podcast in podcasts" />
        </div>
    </div>
</template>
<script>
    import SinglePodcast from '../podcast/SinglePodcast'
    import bazingas from '../../mocks/bazingas'

    export default {
        name: "podcasts",
        components: {
            SinglePodcast
        },
        data() {
            return {
                podcasts: bazingas
            };
        }
    }
</script>