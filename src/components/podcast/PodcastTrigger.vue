<style></style>
<template>
    <div>
        <h1><i class="material-icons">music_note</i></h1>
        <h1>Loading...</h1>
    </div>
</template>
<script>
    import PodcastService from '../../services/ascoota/PodcastService'

    export default {
        name: 'podcastTrigger',
        data() {
            return {
                params: this.$route.params,
                time: this.$route.query.t,
                podcastId: this.$route.params.podcastId
            };
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                let service = new PodcastService();
                service.getOne(this.podcastId).then(
                    (data) => {
                        if(data.body.payload !== null){
                            this.$store.state.selectedAudio = data.body.payload;
                            this.$store.state.autoPlay = true;
                            if (this.time != undefined) {
                                this.$store.state.startTime = this.time;
                            }
                        }
                        this.$router.push({ name: 'dashboard' });
                    }
                ).catch(
                    (error) => {
                        console.log(error);
                    }
                );
            }
        }
    }
</script>