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
                <radio-card :show="show" v-for="show in shows" />
                </md-layout>
            </md-card-content>
        </div>
    </md-card>
</template>
<script>
    import ShowCard from '../../podcast/cards/ShowCard'
    import ShowService from '../../../services/ascoota/ShowService'

    var service = new ShowService();

    export default {
        name: "showsWidget",
        mounted() {
            service.getTrends().then(
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