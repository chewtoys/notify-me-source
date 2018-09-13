<template>
	<div class="feed_suggested vertical_cards">
		<div v-for="(i, index) in suggested" :key="index" class="vertical_card">
			<span @click="openChannel(i)">
							<div class="avatar" v-bind:style="{ 'background-image': 'url(' + i.avatar + ')' }"></div>
							<div class="meta">
								<div class="displayName">{{ trimmedString(i.displayName, 20) }}</div>
								<span v-if="i.verified" class="verified verified_tick"></span>
		</div>
		</span>
		<button @click="createSubscription(i)" :class="{ 'subscriptionWaiting': subscriptionWaiting }" type="button" class="coolbtn sub_button unsubscribed">
			SUBSCRIBE
	    </button>
	</div>
	</div>
</template>
<script>
export default {
    computed: {
        suggested() {
            return this.$store.getters.getSuggested.slice(0, 6)
        }
    }
}
</script>
