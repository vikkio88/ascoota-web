<style>

</style>
<template>
    <div>
        <md-toolbar md-theme="navBar">
            <md-button @click="toggleMain" class="md-icon-button">
                <md-icon>menu</md-icon>
            </md-button>
            <h2 class="md-title" style="flex: 1">
                <md-icon>hearing</md-icon>Scoota</h2>
            <dev-links />
        </md-toolbar>
        <md-sidenav class="md-left" ref="mainMenu">
            <md-toolbar>
                <div class="md-toolbar-container">
                    <h3 class="md-title">
                        <md-icon>hearing</md-icon>Scoota</h2>
                    </h3>
                </div>
            </md-toolbar>

            <md-list>
                <md-list-item @click="goTo('dashboard')">
                    <md-icon>dashboard</md-icon> <span>Dashboard</span>
                </md-list-item>
                <md-divider class="md-inset"></md-divider>
            </md-list>
        </md-sidenav>
    </div>
</template>
<script>
    import DevLinks from './elements/DevLinks'

    export default {
        name: "mainNavBar",
        components: {
            DevLinks
        },
        methods: {
            goTo(route) {
                this.toggleMain();
                this.$router.push('/' + route);
            },
            toggleMain() {
                this.$refs.mainMenu.toggle();
            }
        }
    }

</script>