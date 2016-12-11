<style></style>
<template>
    <div class="jumbotron">
        <h2>{{radio.name}}</h2>
        <h3>{{radio.description}}</h3>
        <router-link :to="{name:'dashboard'}" class="btn btn-primary">
            <i class="material-icons">dashboard</i>
        </router-link>

        <router-link :to="{name:'radiosShowOne', params : {'showId': 1 }}" class="btn btn-raised">
            <i class="material-icons">dashboard</i>
        </router-link>

        <router-view></router-view>
    </div>
</template>
<script>
    import RadioService from '../../services/RadioService'

    export default {
        name: 'single-radio',
        mounted () {
            RadioService.getOne(this.$route.params.radioId).then(
                (data) => {
                    this.radio = data.body.payload; 
                }
            ).catch(
                (error) => {
                    console.log(error)
                }
            )
        },
        data () {
            return {
                radio: {}
            }
        }
    }
</script>