<style></style>
<template>
<div v-if="me">
Logged in as {{me.name}}
</div>
</template>
<script>
    import UserService from '../../services/ascoota/UserService'

    const service = new UserService();

    export default {
        name: "me",
        data (){
            return {
                me: {}
            };
        },
        mounted (){
            service.getMe().then(
                (data) => {
                    this.me = data.body.payload;
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }
</script>