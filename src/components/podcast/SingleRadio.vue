<style></style>
<template>
    <div class="jumbotron">
        <h2>{{radio.name}} <flag-icon :language="language" /></h2>
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
    import FlagIcon from '../common/FlagIcon';
    import RadioService from '../../services/ascoota/RadioService'

    var radioService = new RadioService();

    export default {
        name: 'single-radio',
        components: {
            FlagIcon
        },
        mounted () {
            radioService.getOne(this.$route.params.radioId).then(
                (data) => {
                    this.radio = data.body.payload;
                    this.language = data.body.payload.language.iso;
                }
            ).catch(
                (error) => {
                    console.log(error)
                }
            )
        },
        data () {
            return {
                radio: {},
                language: 'it'
            }
        }
    }
</script>