<style scoped>
.me {
    margin-top: 20px;
}

.md-card {
    margin-top: 10px;
    padding: 5px;
}
</style>
<template>
    <div v-if="me"
         class="me">
        <span class="md-display-1">{{me.name}}</span>
        <md-button class="md-icon-button md-raised"
                   @click.native="logout">
            <md-icon>exit_to_app</md-icon>
        </md-button>
        <md-card>
            <md-card-header>
                <md-card-header-text>
                    <span class="md-title">Saved Position</span>
                    <md-icon>audiotrack</md-icon>
                </md-card-header-text>
            </md-card-header>
            <md-card-content>
                <div v-if="me.listening">
                    <span class="md-subheading">{{me.listening.podcast.name}} - {{(me.listening.position / 60).toFixed() }} mins</span>
                </div>
                <div v-else>
                    <span class="md-subheading">No Active podcasts...</span>
                </div>
            </md-card-content>
            <md-card-actions>
                <md-button @click.native="triggerPodcast(me.listening)"
                           class="md-icon-button md-accent md-raised">
                    <md-icon>play_arrow</md-icon>
                </md-button>
            </md-card-actions>
        </md-card>
    
        <md-card>
            <md-card-header>
                <md-card-header-text>
                    <span class="md-title">Favourites</span>
                    <md-icon>star</md-icon>
                </md-card-header-text>
            </md-card-header>
            <md-card-content>
                <div v-if="me.favourites">
                    <md-list class="md-double-line">
                        <show-list-item :show="favourite.show"
                                        v-for="favourite in me.favourites" />
                    </md-list>
                </div>
                <div v-else>
                    <span class="md-subheading">No Favourites added yet...</span>
                </div>
    
            </md-card-content>
        </md-card>
    
    </div>
</template>
<script>
import UserService from '../../services/ascoota/UserService';
import ShowListItem from '../podcast/listItems/Show';

const service = new UserService();

export default {
    name: "me",
    components: {
        ShowListItem
    },
    data() {
        return {
            me: {}
        };
    },
    mounted() {
        service.getMe().then(
            (data) => {
                this.me = data.body.payload;
            },
            (error) => {
                console.log(error);
            }
        );
    },
    methods: {
        triggerPodcast(listening) {
            const { position, podcast } = listening;
            this.$router.push(`/podcasts/${podcast.id}?t=${position}`);
        },
        logout() {
            this.$auth.destroyToken();
            this.$router.push('/dashboard');
        }
    }
}
</script>