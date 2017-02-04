<style scoped>
    a {
        color: black;
    }
</style>
<template>
    <div class="modal-dialog">
        <div class="modal-content">
            <h3 class="modal-title">About aScoota</h3>
            <h4>Made with ♥ by <a href="http://www.vikkio.it" target="_blank">vikkio</a></h4>
            <p><strong>Ascoota</strong> is a small side project of mine, it will be a podcast player/manager.</p>
            <p>At the moment I am planning just to show some free random podcasts. Some of them are from my old radio show
                <a href="https://www.facebook.com/BazingaRadioSISMA" title="Bazinga!" target="_blank">Bazinga!</a> and some
                from italian Radio.</p>
            <p>Soon I will add the option to create a custom library by adding your personal RSS feeds.</p>
            <p>I will always keep everything open-source, and if you are a computer geek and you want to collaborate with this
                project just check out those links:
                <md-table>
                    <md-table-body>
                        <md-table-row>
                            <md-button class="md-raised md-primary">
                                <a target="_blank" href="https://github.com/vikkio88/ascoota-web">
                                aScootaWeb (vuejs 2, ES6)
                                </a>
                            </md-button>
                        </md-table-row>
                        <md-table-row>
                            <md-button class="md-raised md-primary">
                                <a target="_blank" href="https://github.com/vikkio88/ascoota-api">aScootaBE (php, slime)</a>
                            </md-button>
                        </md-table-row>
                        <md-table-row>
                            <md-button class="md-raised md-warn">
                                <a target="_blank" href="https://github.com/vikkio88/slime">SlimeApi (backend rest api)</a>
                            </md-button>
                        </md-table-row>
                        <md-table-row>
                            <md-button class="md-raised md-warn">
                                <a target="_blank" href="https://www.slimframework.com/">Slim 3</a>
                            </md-button>
                        </md-table-row>
                        <md-table-row>
                            <md-button class="md-raised md-warn">
                                <a target="_blank" href="https://github.com/illuminate/database">Eloquent</a>
                            </md-button>
                        </md-table-row>
                        <md-table-row>
                            <md-button class="md-raised md-warn">
                                <a target="_blank" href="https://vuematerial.github.io/">Vue-material</a>
                            </md-button>
                        </md-table-row>
                        <md-table-row>
                            <md-button class="md-raised md-warn">
                                <a target="_blank" href="https://webpack.github.io/">Webpack (js module bundler)</a>
                            </md-button>
                        </md-table-row>

                    </md-table-body>
                </md-table>
            </p>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'about'
    }

</script>