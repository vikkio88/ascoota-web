<style>

</style>
<template>
    <nav class="navbar">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-inverse-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
                <a class="navbar-brand" href="./"><i class="material-icons">hearing</i>scoota
                    <div class="ripple-container"></div>
                </a>
            </div>
            <div class="navbar-collapse collapse navbar-inverse-collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a title="about" class="btn btn-xs" @click="showInfo">
                            <i class="material-icons">info_outline</i>
                        </a>
                    </li>
                    <li>
                        <a title="code on Github" target="_blank" href="https://github.com/vikkio88/ascoota-web" class="btn btn-xs">
                            <img src="../assets/github-circle.png" alt="github">
                            <div class="ripple-container"></div>
                        </a>
                    </li>
                    <li>
                        <a title="report an Issue" target="_blank" href="https://github.com/vikkio88/ascoota-web/issues/new" class="btn btn-xs">
                            <i class="material-icons">bug_report</i>
                            <div class="ripple-container"></div>
                        </a>
                    </li>
                    <li>
                        <a data-toggle="tooltip" data-placement="top" title="" data-original-title="Tooltip on topLogin/SignUp" href="javascript:void(0)" class="btn btn-xs btn-raised btn-success">
                            <i class="material-icons">account_circle</i>
                            <div class="ripple-container"></div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        </div>
    </nav>
</template>
<script>
    import StatsPush from '../services/stats/StatsPush'
    var stats = new StatsPush();

    export default {
        name: "mainNavBar",
        methods: {
            showInfo() {
                stats.push('clicked_info');
                this.$store.state.showMainDialog = true;
            }
        }
    }
</script>