<style></style>
<template>
    <div>
        <h1><i class="material-icons">music_note</i></h1>
        <h1>Loading...</h1>
    </div>
</template>
<script>
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
            this.$services.podcast().getOne(this.podcastId).then(
                (data) => {
                    if (data.body.payload !== null) {
                        let podcast = data.body.payload;
                        this.$store.commit('selectAndPlay', { podcast, initialSeek: this.$route.query.t })
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