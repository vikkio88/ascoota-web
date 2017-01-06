<style>
    .img {
        height: 180px;
        width: 100%;
        object-fit: cover;
    }
</style>
<template>
    <div class="card">
        <img class="img card-img-top" alt="Card image cap" :src="radio.logo_url" />
        <div class="card-block">
            <h4 class="card-title">
                <flag-icon :language="radio.language.iso"> {{radio.name}}</h4>
            <p class="card-text">{{radio.description}}</p>
            <router-link :to="{ name: 'singleRadioView', params: { radioId: radio.id }}" class="btn btn-primary">
                <i class="material-icons">zoom_in</i>
            </router-link>
        </div>
    </div>
</template>
<script>
    import FlagIcon from '../common/FlagIcon';

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