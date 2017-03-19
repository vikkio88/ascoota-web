<style>
    .padright {
        padding-right:80px;
    }
    .padleft{
        padding-left: 80px;
    }
</style>
<template>
    <div>
        <md-toolbar class="md-dense">
            <md-button @click.native="toggleMain" class="md-icon-button">
                <md-icon>menu</md-icon>
            </md-button>
            <div :class="{'padright': audioSelected}">
                <md-button class="md-icon-button md-raised">
                    <router-link :to="{ name: 'auth' }">
                        <md-icon>account_circle</md-icon>
                    </router-link>
                    <md-tooltip md-direction="bottom">Login</md-tooltip>
                </md-button>
            </div>
        </md-toolbar>
        <md-sidenav class="md-left" ref="mainMenu">
            <md-toolbar>
                <div class="md-toolbar-container">
                    <h3 class="md-title">
                    <img src="../../assets/main-logo.svg" style="width:50px;height:50px" alt="aScoota" title="aScoota">
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
    export default {
        name: "mainNavBar",
        methods: {
            goTo(route) {
                this.toggleMain();
                this.$stats.push(`menu_${route}`);
                this.$router.push('/' + route);
            },
            toggleMain() {
                this.$refs.mainMenu.toggle();
            }
        },
         computed: {
            audioSelected() {
                return this.$store.state.selectedAudio !== undefined;
            }
        }
    }

</script>