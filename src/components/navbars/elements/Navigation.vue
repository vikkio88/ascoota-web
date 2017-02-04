<style></style>
<template>
    <div>
        <md-button class="md-icon-button">
            <router-link :to="{ name: 'dashboard' }">
                <md-icon>dashboard</md-icon>
            </router-link>
        </md-button>
</template>
<script>
    export default {
        name: 'navigation'
    }

</script>