<style></style>
<template>
    <div class="card">
        <h3>Show title</h3>

        <button class="btn btn-raised" @click="stuff">Emit <strong> {{$route.params.showId}} </strong></button>
    </div>
</template>
<script>
import ShowService from '../../services/ascoota/ShowService.js'

export default {
    name: 'show',
    data () {
        return {
            params : this.$route.params
        };
    },
    watch : {
        params() {
            this.init();
        }
    },
    mounted () {
        this.init();
    },
    methods : {
        stuff () {
            console.log("stuff");
        },
        init(){
            let params = this.$route.params;
            let service = new ShowService(params.radioId)
            service.getOne(params.showId).then(
                (data) => {
                    console.log(data);
                }
            ).catch(
                (error) => {
                    console.log("error");
                }
            );
        }
    }
}
</script>