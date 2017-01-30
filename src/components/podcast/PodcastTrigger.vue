<style></style>
<template>
    <div>
    {{params}}
    {{time}}
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
        mounted () {
            this.init();
        },
        methods: {
            init() {
                console.log(this.params);
                let service = new PodcastService();
                service.getOne(this.podcastId).then(
                    (data) => {
                        this.$store.state.selectedAudio = data.body.payload;
                        if (this.time !== undefined) {
                            this.$store.state.timeStart = this.time;
                        }
                        //this.$router.go('/dashboard');
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