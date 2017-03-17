<style></style>
<template>
    <div>
        <h1>Login</h1>
        <md-button class="md-raised md-primary" @click.native="loginFb">Login with Facebook</md-button>
        <md-button class="md-raised md-primary" @click.native="gatherInfo">Check</md-button>
        <div>
            <pre>
                {{user}}
            </pre>
        </div>
    </div>
</template>
<script>
    import AuthService from '../../services/ascoota/AuthService'

    const service = new AuthService();

    export default {
        name: "auth",
        mounted () {
            this.init();
        },
        data(){
            return {
                user: null
            };
        },
        methods: {
            init(){
                window.fbAsyncInit = function() {
                    FB.init({
                        appId      : '1849009082025452',
                        xfbml      : true,
                        version    : 'v2.8'
                    });
                    FB.AppEvents.logPageView();
                };
                (function(d, s, id){
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) {return;}
                    js = d.createElement(s); js.id = id;
                    js.src = "//connect.facebook.net/en_US/sdk.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            },
            loginFb(){
                FB.login((response) => {
                    if (response.authResponse) {
                        this.fbAuth(response.authResponse.accessToken);
                    } else {
                        console.log('User cancelled login or did not fully authorize.');
                    }
                },{scope: 'email'});
            },
            fbAuth(token) {
                service.providerAuth('facebook', token).then(
                    (data) => {
                        this.user = data.body.payload;
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            }
        }
    }
</script>