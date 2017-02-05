<style></style>
<template>
    <div>
        <md-card>
            <md-card-header>
                <router-link :to="{ name: 'dashboard'}">
                    <md-icon>arrow_back</md-icon>
                </router-link>
                <md-card-media>
                    <img class="img" :alt="radio.name" :title="radio.name" :src="radio.logo_url" />
                </md-card-media>
                <md-card-header-text>
                    <div class="md-title">{{radio.name}}
                        <flag-icon :language="language" />
                    </div>
                    <div class="md-subhead">{{radio.description}}</div>
                </md-card-header-text>
            </md-card-header>

            <md-card-actions>
                <a :href="radio.website" target="_blank">
                    <md-icon>link</md-icon>
                </a>
            </md-card-actions>
        </md-card>
        <md-card>
            <md-card-content v-if="shows.length">
                <md-list class="md-double-line">
                    <show-list-item :show="show" v-for="show in shows" />
                </md-list>
            </md-card-content>
        </md-card>
    </div>
</template>
<script>
    import FlagIcon from '../common/FlagIcon';
    import ShowListItem from './listItems/Show';
    import RadioService from '../../services/ascoota/RadioService';

    var radioService = new RadioService();

    export default {
        name: 'single-radio',
        components: {
            FlagIcon,
            ShowListItem
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