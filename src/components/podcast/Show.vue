<style></style>
<template>
    <div class="card">
        <h3>Show title</h3>

        <button class="btn btn-raised" @click="emitStuff">Emit <strong> {{$route.params.showId}} </strong></button>
    </div>
</template>
<script>
export default {
    name: 'show',
    methods : {
        emitStuff () {
            console.log('jesus');
            this.$router.app.$emit('sweetJesus', 'test');
        }
    }
}
</script>