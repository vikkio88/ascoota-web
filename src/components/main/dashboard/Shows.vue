<style>

</style>
<template>
    <md-card v-if="shows.length > 0">
        <md-card-header>
            <md-card-header-text>
                <md-icon>trending_up</md-icon>
                <md-icon>headset</md-icon>
            </md-card-header-text>
        </md-card-header>
        <div class="shows-wrapper">
            <md-card-content>
                <md-layout md-row md-align="center">
                    <show-card :show="show" v-for="show in shows" />
                </md-layout>
            </md-card-content>
        </div>
    </md-card>
</template>
<script>
    import ShowCard from '../../podcast/cards/ShowCard'
    import TrendsService from '../../../services/ascoota/TrendsService'

    var service = new TrendsService();

    export default {
        name: "showsWidget",
        mounted() {
            service.getShows().then(
                (data) => {
                    this.shows = data.body.payload;
                }
            ).catch(
                (errors) => {
                    console.log(errors)
                }
                );
        },
        data() {
            return {
                shows: []
            };
        },
        components: {
            ShowCard
        }
    }

</script>