<style>
    .card {
        margin-top: 5px;
    }
</style>
<template>
    <div class="dashboard">
        <shows />
        <radios />
        <podcasts />
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