<style>

</style>
<template>
    <md-list-item @click="gotoShow">
        <md-avatar>
            <img :alt="show.name" :title="show.name" :src="show.logo_url"/>
        </md-avatar>
        <div class="md-list-text-container">
            <span>{{show.name}}</span>
            <p>
                 {{show.description}}
            </p>
        </div>
    </md-list-item>
</template>
<script>

    export default {
        name: "show-list-item",
        props: {
            show: Object
        },
        methods: {
            gotoShow (){
                this.$router.push({ name: 'singleShowView', params: { radioId: this.show.radio_id , showId: this.show.id }});
            }
        }
    }

</script>