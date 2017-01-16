<style></style>
<template>
    <ul class="nav navbar-nav">
        <li>
            <router-link :to="{ name: 'dashboard' }" class="btn btn-xs">
                <i class="material-icons">dashboard</i>
                <div class="ripple-container"></div>
            </router-link>
        </li>
    </ul>
</template>
<script>
    export default {
        name: 'navigation'
    }
</script>