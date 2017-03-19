<style scoped>
    a {
        color: black;
    }
</style>
<template>
    <md-card>
        <md-card-header>
            <div class="md-title">About aScoota</div>
            <div class="md-subhead">Made with ♥ by <a href="http://www.vikkio.it" target="_blank">vikkio</a></div>
        </md-card-header>
        <md-card-content>
            <p><strong>Ascoota</strong> is a small side project of mine, it will be a podcast player/manager. At the moment
            I am planning just to show some free random podcasts. Some of them are from my old radio show
            <a href="https://www.facebook.com/BazingaRadioSISMA" title="Bazinga!" target="_blank">Bazinga!</a> and some from
            italian Radio. Soon I will add the option to create a custom library by adding your personal RSS feeds.
            <a href="https://github.com/vikkio88/ascoota-web" target="_blank">
                <md-button class="md-raised md-warn">
                        <img src="../../assets/github-circle.png" alt="github"> codebase
                </md-button>
            </a>
            <md-button class="md-raised md-warn" style="color:white">
                <a target="_blank" href="https://github.com/vikkio88/ascoota-web/issues/new">
                <span style="color:white">
                    <md-icon>bug_report</md-icon> Report bug
                </span>
                </a>
            </md-button>
            </p>
            <p>I will always keep everything open-source, and if you are a computer geek and you want to collaborate with this
                project just check out those links:
                <md-table>
                    <md-table-body>
                        <a target="_blank" href="https://github.com/vikkio88/ascoota-web">aScootaWeb (vuejs 2, ES6)</a>
                        </md-table-row>
                        <md-table-row>
                            <a target="_blank" href="https://github.com/vikkio88/ascoota-api">aScootaBE (php, slime)</a>
                        </md-table-row>
                        <md-table-row>
                            <a target="_blank" href="https://github.com/vikkio88/slime">SlimeApi (backend rest api)</a>
                        </md-table-row>
                        <md-table-row>
                            <a target="_blank" href="https://www.slimframework.com/">Slim 3</a>
                        </md-table-row>
                        <md-table-row>
                            <a target="_blank" href="https://github.com/illuminate/database">Eloquent</a>
                        </md-table-row>
                        <md-table-row>
                            <a target="_blank" href="https://vuematerial.github.io/">Vue-material</a>
                        </md-table-row>
                        <md-table-row>
                            <a target="_blank" href="https://webpack.github.io/">Webpack (js module bundler)</a>
                        </md-table-row>

                    </md-table-body>
                </md-table>
            </p>
        </md-card-content>
    </md-card>
</template>
<script>
    export default {
        name: 'about'
    }

</script>