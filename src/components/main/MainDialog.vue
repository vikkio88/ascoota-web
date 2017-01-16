<style scoped>
    .table {
        margin-top: 10px;
    }
</style>
<template>
    <div id="complete-dialog" class="modal fade" :class="{in:showDialog}" :style="checkDisplay" tabindex="-1">
<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" @click="dismiss" aria-hidden="true">×</button>
            <h3 class="modal-title">About aScoota</h3>
            <h4>Made with ♥ by <a href="http://www.vikkio.it" target="_blank">vikkio</a></h4>
        </div>
        <div class="modal-body">
            <p><strong>Ascoota</strong> is a small side project of mine, it will be a podcast player/manager.</p>
            <p>At the moment I am planning just to show some free random podcasts. Some of them are from my old radio
                show <a href="https://www.facebook.com/BazingaRadioSISMA" title="Bazinga!" target="_blank">Bazinga!</a> and
                some from italian Radio.</p>
            <p>Soon I will add the option to create a custom library by adding your personal RSS feeds.</p>
            <p>I will always keep everything open-source, and if you are a computer geek and you want to collaborate with this project just check
                out those links:
                <table class="table table-striped table-hover">
                    <tbody>
                        <tr>
                            <td><a target="_blank" href="https://github.com/vikkio88/ascoota-web">aScootaWeb source (vuejs 2, ES6)</a></td>
                        </tr>
                        <tr>
                            <td><a target="_blank" href="https://github.com/vikkio88/ascoota-api">aScootaBE source (php, slime)</a></td>
                        </tr>
                        <tr class="success">
                            <td><a target="_blank" href="https://github.com/vikkio88/slime">SlimeApi (backend rest api)</a></td>
                        </tr>
                        <tr class="info">
                            <td><a target="_blank" href="https://www.slimframework.com/">Slim 3</a></td>
                        </tr>
                        <tr class="info">
                            <td><a target="_blank" href="https://github.com/illuminate/database">Eloquent</a></td>
                        </tr>
                        <tr class="info">
                            <td><a target="_blank" href="http://fezvrasta.github.io/bootstrap-material-design/#about">MaterialBootstrap (css)</a></td>
                        </tr>
                        <tr class="info">
                            <td><a target="_blank" href="https://webpack.github.io/">Webpack (js module bundler)</a></td>
                        </tr>
                    </tbody>
                </table>
            </p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="dismiss">Dismiss<div class="ripple-container"><div class="ripple ripple-on ripple-out" style="left: 32.6562px; top: 17px; background-color: rgb(0, 150, 136); transform: scale(10.875);"></div>
</div>
</button>
</div>
</div>
</div>
</div>
</template>
<script>
    export default {
        name: 'main-dialog',
        computed: {
            showDialog() {
                return this.$store.state.showMainDialog;
            },
            checkDisplay(){
                return this.$store.state.showMainDialog ? {display: 'block'}:{display: 'none'}
            }
        },
        methods: {
            dismiss(){
                this.$store.state.showMainDialog = false;
            }
        }
    }
</script>