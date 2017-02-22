<style>

</style>
<template>
    <md-list-item @click.native="gotoRadio">
        <md-avatar>
            <img alt="radio.name" :src="radio.logo_url">
        </md-avatar>
        <div class="md-list-text-container">
            <span>{{radio.name}} - {{radio.description}}</span>
            <p>
                <flag-icon :language="radio.language.iso" />
            </p>
        </div>
        <md-divider class="md-inset"></md-divider>
    </md-list-item>
</template>
<script>
    import FlagIcon from '../../common/FlagIcon';

    export default {
        name: "radio-list-item",
        components: {
            FlagIcon
        },
        props: {
            radio: Object
        },
        methods: {
            gotoRadio() {
                this.$router.push({ name: 'singleRadioView', params: { radioId: this.radio.id } });
            }
        }
    }

</script>