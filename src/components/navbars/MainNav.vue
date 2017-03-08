<style>

</style>
<template>
    <div>
        <md-toolbar md-theme="navBar" class="md-dense" :class="{'md-large': playerInHeader}">
            <md-button @click.native="toggleMain" class="md-icon-button">
                <md-icon>menu</md-icon>
            </md-button>
            <h2 class="md-title" style="flex: 1">
                <img src="../../assets/logo.png" alt="aScoota" title="aScoota">
            </h2>
            <dev-links />
            <div class="md-toolbar-container" v-if="playerInHeader">
                <header-player />
            </div>
        </md-toolbar>
        <md-sidenav class="md-left" ref="mainMenu">
            <md-toolbar>
                <div class="md-toolbar-container">
                    <h3 class="md-title">
                        <img src="../../assets/logo.png" alt="aScoota" title="aScoota"> aScoota
                    </h3>
                </div>
            </md-toolbar>

            <md-list>
                <md-list-item @click.native="goTo('dashboard')">
                    <md-icon>dashboard</md-icon> <span>Dashboard</span>
                </md-list-item>
                <md-divider class="md-inset"></md-divider>
            </md-list>
        </md-sidenav>
    </div>
</template>
<script>
    import DevLinks from './elements/DevLinks'
    import HeaderPlayer from '../main/HeaderPlayer'

    export default {
        name: "mainNavBar",
        components: {
            DevLinks,
            HeaderPlayer
        },
        computed: {
            playerInHeader() {
                return this.$store.state.selectedAudio !== undefined && this.$mq.above(700);
            }
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