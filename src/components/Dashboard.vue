<style></style>
<template>
    <div id="dashboard">
        <div class="panel-group">
            <radios />
        </div>
    </div>
</template>
<script>
    import Radios from './podcast/Radios'

    export default {
        name: "dashboard",
        components: {
            Radios
        }
    }
</script>