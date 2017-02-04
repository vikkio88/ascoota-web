<style>
</style>
<template>
    <md-card>
        <router-link :to="{ name: 'singleRadioView', params: { radioId: radio.id }}">
            <md-card-media>
                <img alt="radio.name" :src="radio.logo_url">
            </md-card-media>
        </router-link>
        <md-card-header>
            <div class="md-title">{{radio.name}}</div>
        </md-card-header>
        <md-card-content>
            <flag-icon :language="radio.language.iso" /> {{radio.description}}
        </md-card-content>
    </md-card>
</template>
<script>
    import FlagIcon from '../../common/FlagIcon';

    export default {
        name: "radio",
        components: {
            FlagIcon
        },
        props: {
            radio: Object
        }
    }

</script>