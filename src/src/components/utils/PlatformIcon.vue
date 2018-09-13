<template>
<div class="platformImages">
	<div v-for="(i, index) in thePlatforms" :key="index"  :class="'platformImage ' + i.toLowerCase() + '-icon'"></div>
</div>
</template>
<script>
export default {
    props: ['platforms'],
    mounted() {
        if (!Array.isArray(this.platforms)) this.thePlatforms = [this.platforms]
    },
    data() {
        return {
            thePlatforms: []
        }
    }
}
</script>
<style>
.platformImage {
    margin: auto;
    vertical-align: center;
    width: 40px;
    height: 40px;
    background-repeat: no-repeat !important;
    background-size: contain !important;
    background-position: center center !important;
}
</style>

