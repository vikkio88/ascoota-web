<style></style>
<template>
    <div>
        <md-button class="md-icon-button" @click.native="showInfo">
            <router-link :to="{ name: 'about' }">
                <md-icon>info_outline</md-icon>
            </router-link>
        </md-button>

        <md-button class="md-icon-button">
            <a href="https://github.com/vikkio88/ascoota-web" target="_blank">
                <img src="../../../assets/github-circle.png" alt="github">
            </a>
        </md-button>

        <md-button class="md-icon-button">
            <a target="_blank" href="https://github.com/vikkio88/ascoota-web/issues/new">
                <md-icon>bug_report</md-icon>
            </a>
        </md-button>
    </div>
</template>
<script>
    export default {
        name: 'dev-links',
        methods: {
            showInfo() {
                this.$stats.push('clicked_info');
            }
        }
    }

</script>