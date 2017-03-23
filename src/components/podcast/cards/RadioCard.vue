<style>
    div.radio-card-wrapper {
        margin: 10px;
    }
</style>
<template>
    <div class="radio-card-wrapper" @click="showRadio">
        <md-card class="clickable">
                <md-card-media>
                    <img style="width: 250px;height: auto;" alt="radio.name" :src="radio.logo_url">
                </md-card-media>
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
        },
        methods: {
            showRadio() {
                this.$router.push({ name: 'singleRadioView', params: { radioId: this.radio.id } });
            }
        }
    }

</script>