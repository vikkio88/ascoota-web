<style>

</style>
<template>
    <md-list-item @click.native="gotoShow">
        <md-avatar>
            <img :alt="show.name" :title="show.name" :src="show.logo_url" />
        </md-avatar>
        <div class="md-list-text-container">
            <span>{{show.name}}</span>
            <p>
                {{show.description}}
            </p>
        </div>
        <md-divider class="md-inset"></md-divider>
    </md-list-item>
</template>
<script>
    export default {
        name: "show-list-item",
        props: {
            show: Object
        },
        methods: {
            gotoShow() {
                this.$router.push({ name: 'show', params: { slug: this.show.slug } });
            }
        }
    }

</script>