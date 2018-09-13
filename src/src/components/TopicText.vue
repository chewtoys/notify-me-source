<template>
	<span v-if="i.toLowerCase() === 'youtube'"><i class="fab fa-youtube"></i></span>
	<span v-else-if="i.toLowerCase() === 'soundcloud'"><i class="fab fa-soundcloud"></i></span>
	<span v-else-if="i.toLowerCase() === 'twitter'"><i class="fab fa-twitter"></i></span>
	<span v-else-if="i.toLowerCase() === 'reddit'"><i class="fab fa-reddit"></i></span>
	<span v-else-if="i.toLowerCase() === 'facebook'"><i class="fab fa-facebook"></i></span>
	<span v-else-if="i.toLowerCase() === 'instagram'"><i class="fab fa-instagram"></i></span>
	<span v-else-if="i.toLowerCase() === 'spotify'"><i class="fab fa-spotify"></i></span>
	<span v-else-if="i.toLowerCase() === 'discord'"><i class="fab fa-discord"></i></span>
	<span v-else-if="i.toLowerCase() === 'notify'">Notify</span>
	<span v-else>{{i}}</span>
</template>
<script>
export default {
    props: ['i']
}
</script>
