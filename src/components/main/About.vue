<style>

</style>
<template>
    <md-card>
        <md-card-header>
            <div class="md-title">About aScoota</div>
            <div class="md-subhead">Made with ♥ by <a href="https://vikkio.co"
                   target="_blank">vikkio</a></div>
        </md-card-header>
        <md-card-content>
            <div>
                <md-button href="https://github.com/vikkio88/ascoota-web"
                           class="md-raised md-warn" target="_blank">
                    <img src="../../assets/github-circle.png"
                         alt="github"> codebase
                </md-button>
    
                <md-button href="https://github.com/vikkio88/ascoota-web/issues/new"
                           class="md-raised md-warn" target="_blank">
                    <span style="color:white"><md-icon>lightbulb_outline</md-icon> Request Feature</span>
                </md-button>

                <md-button href="https://github.com/vikkio88/ascoota-web/issues/new"
                           class="md-raised md-warn" target="_blank">
                    <span style="color:white"><md-icon>bug_report</md-icon> Report bug</span>
                </md-button>
            </div>
            <p><strong>Ascoota</strong> is a small side project of mine, it will be a podcast player/manager. At the moment I am planning just to show some free random podcasts. Some of them are from my old radio show
                <a href="https://www.facebook.com/BazingaRadioSISMA"
                   title="Bazinga!"
                   target="_blank">Bazinga!</a> and some from italian Radio. Soon I will add the option to create a custom library by adding your personal RSS feeds.
            </p>
            <p>I will always keep everything open-source, and if you are a computer geek and you want to collaborate with this project just check out those links:
                <md-layout md-row
                           md-align="center">
                    <dev-card :item="item"
                              v-for="item in items" />
                </md-layout>
            </p>
        </md-card-content>
    </md-card>
</template>
<script>
import DevCard from './devlinks/DevCard'

export default {
    name: 'about',
    components: {
        DevCard
    },
    data() {
        return {
            items: [
                {
                    name: 'aScootaWeb',
                    tech: 'vue2, ES6',
                    link: 'https://github.com/vikkio88/ascoota-web'
                },
                {
                    name: 'aScootaApi',
                    tech: 'php, slime',
                    link: 'https://github.com/vikkio88/ascoota-api'
                },
                {
                    name: 'SlimeApi',
                    tech: 'php, slim, backend rest api',
                    link: 'https://github.com/vikkio88/slime'
                },
                {
                    name: 'Slim3',
                    tech: 'php microframework',
                    link: 'https://www.slimframework.com/'
                },
                {
                    name: 'Eloquent',
                    tech: 'php ORM from Laravel',
                    link: 'https://github.com/illuminate/database'
                },
                {
                    name: 'Vue-Material',
                    tech: 'material design components for vue2',
                    link: 'https://vuematerial.github.io/'
                },
                {
                    name: 'Webpack',
                    tech: 'js module bundler',
                    link: 'https://webpack.github.io/'
                },
            ]
        }
    }
}

</script>