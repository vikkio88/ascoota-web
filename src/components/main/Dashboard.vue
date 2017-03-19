<style>
.card {
    margin-top: 5px;
}
</style>
<template>
    <div id="dashboard">
        <md-tabs md-centered>
            <md-tab md-label="Shows"
                    md-icon="ondemand_video">
                <shows />
            </md-tab>
    
            <md-tab md-label="Radios"
                    md-icon="radios">
                <radios />
            </md-tab>
    
            <md-tab md-label="Podcasts"
                    md-icon="audiotrack">
                <podcasts />
            </md-tab>
        </md-tabs>
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