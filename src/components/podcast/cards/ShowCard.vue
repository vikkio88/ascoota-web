<style>
div.show-card-wrapper {
    margin: 10px;
}
</style>
<template>
    <div class="show-card-wrapper clickable"
         @click="goToShow">
        <md-card>
            <md-card-media>
                <img style="width: 250px;height: auto;"
                     alt="radio.name"
                     :src="show.logo_url">
            </md-card-media>
            <md-card-header>
                <div class="md-title">{{show.name}}</div>
            </md-card-header>
            <md-card-action v-if="$auth.loggedIn()">
                <md-button @click.native="addToFavourites(show.id)"
                           class="md-icon-button">
                    <md-icon>star</md-icon>
                </md-button>
            </md-card-action>
        </md-card>
    </div>
</template>
<script>
import UserService from '../../../services/ascoota/UserService';
import FlagIcon from '../../common/FlagIcon';

const service = new UserService();

export default {
    name: "showCard",
    components: {
        FlagIcon
    },
    props: {
        show: Object
    },
    methods: {
        goToShow() {
            this.$router.push({ name: 'show', params: { slug: this.show.slug } });
        },
        addToFavourites(showId) {
            service.addToFavourites({
                show_id: showId
            });
        }
    }
}

</script>