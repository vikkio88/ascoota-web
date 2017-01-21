<style></style>
<template>
    <ul class="nav navbar-nav navbar-right">
        <li>
            <a title="about" class="btn btn-xs" @click="showInfo">
                <i class="material-icons">info_outline</i>
            </a>
        </li>
        <li>
            <a title="code on Github" target="_blank" href="https://github.com/vikkio88/ascoota-web" class="btn btn-xs">
                <img src="../../../assets/github-circle.png" alt="github">
                <div class="ripple-container"></div>
            </a>
        </li>
        <li>
            <a title="report an Issue" target="_blank" href="https://github.com/vikkio88/ascoota-web/issues/new" class="btn btn-xs">
                <i class="material-icons">bug_report</i>
                <div class="ripple-container"></div>
            </a>
        </li>
    </ul>

</template>
<script>
    export default {
        name: 'dev-links',
        methods: {
            showInfo() {
                this.$stats.push('clicked_info');
                this.$store.state.showMainDialog = true;
            }
        }
    }
</script>