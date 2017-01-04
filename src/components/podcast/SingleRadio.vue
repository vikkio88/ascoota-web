<style></style>
<template>
    <div class="jumbotron">
        <router-link :to="{name:'dashboard'}" class="btn btn-primary">
            <i class="material-icons">dashboard</i>
        </router-link>
        <h2>{{radio.name}}
            <flag-icon :language="language" />
        </h2>

        <a class="btn btn-primary" :href="radio.website" target="_blank">
            <i class="material-icons">link</i>
        </a>

        <img class="img" :alt="radio.name" :title="radio.name" :src="radio.logo_url" />
        <h3>{{radio.description}}</h3>
        <div class="jumbotron" v-if="radio.shows">
            <h2>Shows</h2>
            <div class="row">
                <div v-for="show in radio.shows" class="col-sm-4">
                    <show-card :show="show" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import FlagIcon from '../common/FlagIcon';
    import ShowCard from './ShowCard';
    import RadioService from '../../services/ascoota/RadioService';

    var radioService = new RadioService();

    export default {
        name: 'single-radio',
        components: {
            FlagIcon,
            ShowCard
        },
        mounted() {
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
        data() {
            return {
                radio: {},
                language: 'it'
            }
        }
    }
</script>