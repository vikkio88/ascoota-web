<style>

</style>
<template>
    <md-card v-if="radios.length > 0">
        <md-card-header>
            <md-card-header-text>
                <md-icon>trending_up</md-icon>
                <md-icon>radio</md-icon>
            </md-card-header-text>
        </md-card-header>
        <md-card-content>
            <md-layout :md-gutter="8">
                <md-layout v-for="radio in radios">
                    <radio-card :radio="radio" />
                </md-layout>
            </md-layout>
        </md-card-content>
    </md-card>
</template>
<script>
    import RadioCard from '../../podcast/cards/RadioCard'
    import RadioService from '../../../services/ascoota/RadioService'

    var radioService = new RadioService();

    export default {
        name: "radios",
        mounted() {
            radioService.getAll().then(
                (data) => {
                    this.radios = data.body.payload
                }
            ).catch(
                (errors) => {
                    console.log(errors)
                }
                );
        },
        data() {
            return {
                radios: []
            };
        },
        components: {
            RadioCard
        }
    }
</script>