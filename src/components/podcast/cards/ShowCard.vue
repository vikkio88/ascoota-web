<style>
    .img {
        height: 180px;
        width: 100%;
        object-fit: cover;
    }
</style>
<template>
    <div class="radio">
        <img class="img card-img-top" :alt="show.name" :title="show.name" :src="show.logo_url" />
        <div class="card">
            <div class="card-block">
                <h3>{{show.name}}</h3>
                <h4>{{show.description}}</h4>
                <router-link :to="{ name: 'singleShowView', params: { radioId: show.radio_id , showId: show.id }}" class="btn btn-primary">
                    <i class="material-icons">zoom_in</i>
                </router-link>

            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "show-card",
        props: {
            show: Object
        }
    }
</script>