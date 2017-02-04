<style>

</style>
<template>

    <md-toolbar md-theme="navBar">
        <md-button class="md-icon-button">
            <md-icon>menu</md-icon>
        </md-button>

        <navigation />

        <h2 class="md-title" style="flex: 1">
            <md-icon>hearing</md-icon>Scoota</h2>
        <dev-links />
    </md-toolbar>
</template>
<script>
    import DevLinks from './elements/DevLinks'
    import Navigation from './elements/Navigation'

    export default {
        name: "mainNavBar",
        components: {
            DevLinks,
            Navigation
        }
    }

</script>