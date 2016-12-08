<style>

</style>
<template>
    <div class="radios-list">
        <h2>Radios list</h2>
        <div class="container container-fluid">
            <div class="row">
                <div v-for="radio in radios" class="col-sm-4">
                    <radio-card :radio="radio" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import RadioCard from './RadioCard'
    //mock data
    import radiosMock from '../../mocks/radiosMock'

    export default {
        name: "radios",
        data () {
            return {
                radios : radiosMock
            };
        },
        components:{
            RadioCard
        }
    }
</script>