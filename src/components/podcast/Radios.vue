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
    import RadioService from '../../services/ascoota/RadioService'

    var radioService = new RadioService();

    export default {
        name: "radios",
        mounted () {
            radioService.getAll().then(
                (data) => {
                    this.radios = data.body.payload
                }
            ).catch( 
                (errors) => {
                    console.log(errors)
                }
            );
        },
        data () {
            return {
                radios : []
            };
        },
        components:{
            RadioCard
        }
    }
</script>