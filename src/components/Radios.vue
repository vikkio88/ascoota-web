<style>

</style>
<template>
    <div class="radios-list">
        <h2>Radios list</h2>
        <div class="container container-fluid">
            <div class="row">
                <div class="col-sm-4">
                    <radio :info="'Radio 24'" />
                </div>
                <div class="col-sm-4">
                    <radio :info="'Radio 1'" />
                </div>
                <div class="col-sm-4">
                    <radio :info="'Radio 2'" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Radio from './Radio'

    export default {
        name: "radios",
        components:{
            Radio
        }
    }
</script>