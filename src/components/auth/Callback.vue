<style></style>
<template>
    <div>
        <h1>Loading...</h1>
        {{this.$route.query.code}}
        {{info}}
    </div>
</template>
<script>
    import AuthService from '../../services/ascoota/AuthService'

    const service = new AuthService();

    export default {
        name: "auth",
        data(){
            return {
                info: {}
            };
        },
        mounted() {
            this.init();
        },
        methods: {
            init(){
                service.getInfoCallback('facebook', this.$route.query.code).then(
                    (data) => {
                        this.info = data.body.payload;
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            }
        }
    }
</script>