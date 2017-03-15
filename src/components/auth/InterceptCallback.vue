<style></style>
<template>
    <div>
    Loading...
    </div>
</template>
<script>
    export default {
        name: "interceptCallback",
        data (){
            return {
                code: null
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                let currentWebsite = window.location.protocol + "//" + window.location.host;
                this.code = this.getParameterByName('code');
                if (this.code) {
                    window.location.replace(`${currentWebsite}/#/callback?code=${this.code}`);
                } else {
                    window.location.replace(`${currentWebsite}/#/dashboard`);
                }
            },
            getParameterByName(name, url) {
                if (!url) {
                    url = window.location.href;
                }
                name = name.replace(/[\[\]]/g, "\\$&");
                var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                    results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return '';
                return decodeURIComponent(results[2].replace(/\+/g, " "));
            }
        }
    }
</script>