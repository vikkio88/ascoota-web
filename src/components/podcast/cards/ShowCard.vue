<style>
    .img {
        height: 180px;
        width: 100%;
        object-fit: cover;
    }
</style>
<template>
    <div class="radio">
        <router-link :to="{ name: 'singleShowView', params: { radioId: show.radio_id , showId: show.id }}">
            <img class="img card-img-top" :alt="show.name" :title="show.name" :src="show.logo_url"/>
        </router-link>
        <div class="card">
            <div class="card-block">
                <h3>{{show.name}}</h3>
                <h4>{{show.description}}</h4>
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