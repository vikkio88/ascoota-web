<style>
    .card {
        margin-top: 5px;
    }
</style>
<template>
    <div id="dashboard">
        <div class="panel-group">
            <shows />
            <radios />
            <podcasts />
        </div>
    </div>
</template>
<script>
    import Shows from './dashboard/Shows'
    import Radios from './dashboard/Radios'
    import Podcasts from './dashboard/Podcasts'

    export default {
        name: "dashboard",
        components: {
            Shows,
            Radios,
            Podcasts
        }
    }
</script>