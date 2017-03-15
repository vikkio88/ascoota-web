<style></style>
<template>
    <div>
        <h1>Login</h1>
        <md-button class="md-raised md-primary" @click.native="fetchAuthUrl">Login with Facebook</md-button>
        <div>
        {{authUrl}}
        </div>
        <div>
        {{$route.query}}
        </div>
    </div>
</template>
<script>
    import AuthService from '../../services/ascoota/AuthService'

    const service = new AuthService();

    export default {
        name: "auth",
        data(){
            return {
                authUrl: null
            };
        },
        methods: {
            fetchAuthUrl(){
                service.getAuthUrl('facebook').then(
                    (data) => {
                        this.authUrl = data.body.payload;
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            }
        }
    }
</script>