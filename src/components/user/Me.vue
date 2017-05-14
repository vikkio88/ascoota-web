<style scoped>
.md-card {
    margin-top: 10px;
    padding: 5px;
}
</style>
<template>
    <div v-if="me">
        <span class="md-display-1">{{me.name}}</span>
    
        <md-card>
            <md-card-header>
                <md-card-header-text>
                    Saved Position
                    <md-icon>audiotrack</md-icon>
                </md-card-header-text>
            </md-card-header>
            <md-card-content>
                <div v-if="me.listening">
                    <md-button class="md-accent"
                               @click="triggerPodcast(me.listening)">
                        {{me.listening.podcast.name}} - {{me.listening.position / 60 }} mins
                    </md-button>
                </div>
                <div v-else>
                    <span class="md-title">No Active podcasts...</span>
                </div>
            </md-card-content>
        </md-card>
    
        <md-card>
            <md-card-header>
                <md-card-header-text>
                    Favourite Shows
                    <md-icon>star</md-icon>
                </md-card-header-text>
            </md-card-header>
            <md-card-content>
                <span class="md-title">No Favourite added yet...</span>
            </md-card-content>
        </md-card>
    
    </div>
</template>
<script>
import UserService from '../../services/ascoota/UserService';
import PodcastListItem from '../podcast/listItems/Podcast';

const service = new UserService();

export default {
    name: "me",
    components: {
        PodcastListItem
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
        }
    }
}
</script>