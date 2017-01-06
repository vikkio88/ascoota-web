<style>

</style>
<template>
    <div class="panel panel-primary">
        <div class="panel-heading">
            <h3><i class="material-icons">trending_up</i> <i class="material-icons">radio</i></h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div v-for="radio in radios" class="col-sm-4">
                    <radio-card :radio="radio" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import RadioCard from '../podcast/RadioCard'
    import RadioService from '../../services/ascoota/RadioService'

    var radioService = new RadioService();

    export default {
        name: "radios",
        mounted() {
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
        data() {
            return {
                radios: []
            };
        },
        components: {
            RadioCard
        }
    }
</script>