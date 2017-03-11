<style>
    div.show-card-wrapper {
        margin: 10px;
    }
</style>
<template>
    <div class="show-card-wrapper" @click="goToShow">
        <md-card>
                <md-card-media>
                    <img style="width: 250px;height: auto;" alt="radio.name" :src="show.logo_url">
                </md-card-media>
            <md-card-header>
                <div class="md-title">{{show.name}}</div>
            </md-card-header>
        </md-card>
    </div>
</template>
<script>
    import FlagIcon from '../../common/FlagIcon';

    export default {
        name: "showCard",
        components: {
            FlagIcon
        },
        props: {
            show: Object
        },
        methods: {
            goToShow() {
                this.$router.push({ name: 'show', params: { slug: this.show.slug } });
            }
        }
    }

</script>