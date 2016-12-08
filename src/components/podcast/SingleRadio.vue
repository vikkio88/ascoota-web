<style></style>
<template>
    <div class="jumbotron">
        <h2>Single Radio Vue</h2>
        <h3>{{this.$route.params.radioId}}</h3>
        <router-link :to="{name:'dashboard'}" class="btn btn-primary">
            <i class="material-icons">dashboard</i>
        </router-link>

        <router-link :to="{name:'radiosShowOne', params : {'showId': 1 }}" class="btn btn-raised">
            <i class="material-icons">dashboard</i>
        </router-link>
        
        <router-view></router-view>       
    </div>
</template>
<script>
    export default {
        name: 'single-radio'
    }
</script>