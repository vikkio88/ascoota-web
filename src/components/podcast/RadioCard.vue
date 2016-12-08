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
            <img class="img card-img-top" alt="Card image cap" :src="radio.logo_url" />
            <div class="card-block">
                <h4 class="card-title"><span class="flag-icon flag-icon-squared" :class="[radio.language !== undefined ? flagIconClass:'']"></span>{{radio.name}}</h4>
                <p class="card-text">{{radio.description}}</p>
                <a href="#" class="btn btn-primary">
                    <i class="material-icons">zoom_in</i>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "radio",
        props : {
            radio: Object
        },
        computed : {
            flagIconClass () {
                return 'flag-icon-'+this.radio.language.iso;
            }
        }
    }
</script>