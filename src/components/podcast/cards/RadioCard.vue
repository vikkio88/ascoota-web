<style>
div.radio-card-wrapper {
    margin: 10px;
}
</style>
<template>
    <div class="radio-card-wrapper">
        <md-card md-with-hover>
            <router-link :to="{ name: 'singleRadioView', params: { radioId: radio.id }}">
                <md-card-media>
                    <img  style="width: 170px;height: auto;" alt="radio.name" :src="radio.logo_url">
                </md-card-media>
            </router-link>
            <md-card-header>
                <div class="md-title">{{radio.name}}</div>
            </md-card-header>
            <md-card-content>
                <flag-icon :language="radio.language.iso" /> {{radio.description}}
            </md-card-content>
        </md-card>
    </div>
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