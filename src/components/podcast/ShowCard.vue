<style>
    .img {
        height: 180px;
        width: 100%;
        object-fit: cover;
    }
</style>
<template>
    <div class="radio">
        <div class="card">
            <h3>{{show.name}}</h3>
            <router-link :to="{ name: 'singleShowView', params: { radioId: show.radio_id , showId: show.id }}" class="btn btn-primary">
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
            show: Object
        }
    }
</script>