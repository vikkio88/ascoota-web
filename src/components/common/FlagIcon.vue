<style>

</style>
<template>
    <span class="flag-icon flag-icon-squared" :class="[language !== undefined ? flagIconClass:'']"></span>
</template>
<script>
    export default {
        name: 'flag-icon',
        props: {
            language: {type: String, default: 'it'}
        },
        computed : {
            flagIconClass () {
                return 'flag-icon-'+this.language;
            }
        }
    }
</script>