<style></style>
<template>
    <div class="panel panel-primary">
        <img class="img" :alt="radio.name" :title="radio.name" :src="radio.logo_url"/>
        <div class="panel-heading">
            <div class="panel-title pull-left">
                <router-link :to="{ name: 'dashboard'}" class="btn">
                    <i class="material-icons" style="color: white">arrow_back</i>
                </router-link>
            </div>
            <h2>
                {{radio.name}}
                <flag-icon :language="language" />
            </h2>
        </div>
        <div class="panel-body">
            <h3>{{radio.description}}</h3>
            <a class="btn btn-primary" :href="radio.website" target="_blank">
                <i class="material-icons">link</i>
            </a>
            <div class="panel panel-primary" v-if="shows.length">
                <div class="panel-heading">
                    <h3>Shows</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div v-for="show in shows" class="col-sm-4">
                            <show-card :show="show"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import FlagIcon from '../common/FlagIcon';
    import ShowCard from './cards/ShowCard';
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
                    this.shows = this.radio.shows || this.shows;
                    if (this.radio.language !== undefined) {
                        this.language = this.radio.language.iso;
                    }
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
                shows: [],
                language: 'it'
            }
        }
    }

</script>