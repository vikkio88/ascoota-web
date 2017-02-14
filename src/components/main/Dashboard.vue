<style>
    .card {
        margin-top: 5px;
    }
</style>
<template>
    <div id="dashboard">
        <div class="panel-group">
            <radios />
            <podcasts />
        </div>
    </div>
</template>
<script>
    import Radios from './dashboard/Radios'
    import Podcasts from './dashboard/Podcasts'

    export default {
        name: "dashboard",
        components: {
            Radios,
            Podcasts
        }
    }
</script>