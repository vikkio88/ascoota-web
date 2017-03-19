<style>
</style>
<template>
    <md-card md-with-hover>
        <a :href="item.link" target="_blank">
            <md-card-header>
                <div class="md-title">{{item.name}}</div>
                <div class="md-subhead">{{item.tech}}</div>
            </md-card-header>
        </a>
    </md-card>
</template>
<script>
export default {
    name: 'devCard',
    props: {
        item: { type: Object, default: (() => { }) }
    }
}
</script>