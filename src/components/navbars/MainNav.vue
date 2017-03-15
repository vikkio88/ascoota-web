<style>

</style>
<template>
    <div>
        <md-toolbar md-theme="navBar" class="md-dense">
            <md-button @click.native="toggleMain" class="md-icon-button">
                <md-icon>menu</md-icon>
            </md-button>
            <h2 class="md-title" style="flex: 1">
                <img src="../../assets/logo.png" alt="aScoota" title="aScoota">
            </h2>
            <dev-links />

            <md-button class="md-icon-button md-raised md-warn">
                <router-link :to="{ name: 'auth' }">
                    <md-icon>account_circle</md-icon>
                </router-link>
            </md-button>
        </md-toolbar>
        <md-sidenav class="md-left" ref="mainMenu">
            <md-toolbar>
                <div class="md-toolbar-container">
                    <h3 class="md-title">
                    <img src="../../assets/logo.png" alt="aScoota" title="aScoota">
                        aScoota
                    </h3>
                </div>
            </md-toolbar>

            <md-list>
                <md-list-item @click.native="goTo('dashboard')">
                    <md-icon>dashboard</md-icon> <span>Dashboard</span>
                </md-list-item>
                <md-divider class="md-inset"></md-divider>

                <md-list-item @click.native="goTo('about')">
                    <md-icon>info_outline</md-icon> <span>About</span>
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
                this.$stats.push(`menu_${route}`);
                this.$router.push('/' + route);
            },
            toggleMain() {
                this.$refs.mainMenu.toggle();
            }
        }
    }

</script>