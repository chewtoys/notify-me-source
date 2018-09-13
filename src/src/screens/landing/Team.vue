<template>
    <div class="onepage_scroll">
        <Nav></Nav>
        <div class="container container_team mb-5">
            <div class="team_heading row mb-5">
                <h1 class="center">Meet the team</h1>
                <p>We make the thing.</p>
            </div>

            <div class="big_cards vertical_cards">
                <div v-for="(i, index) in dev" :key="index" class="vertical_card">
                <span >
                    <div class="avatar" v-bind:style="{ 'background-image': 'url(' + i.avatar + ')' }"></div>
                    <div class="meta">
                        <h3 class="displayName">{{ i.name }}</h3>
                        <small>{{ i.role }}</small><br />
                        <small class="location"><i class="fa fa-map-marker-alt"/> {{ i.loaction}}</small>
                    </div>
                </span>
                <!-- <button @click="createSubscription(i)" :class="{ 'subscriptionWaiting': subscriptionWaiting }" type="button" class="coolbtn sub_button unsubscribed">
                    SUBSCRIBE
                </button> -->
                    </div>
                </div>
        </div>
    </div>

</template>

<script>
import { Nav } from '@/components/container'
import { setInterval } from 'timers'

import { team } from '@/assets/data/team'

export default {
	components: {
		Nav
	},
	created() {
		this.dev = team
	},
	mounted() {
		setTimeout(() => {
			// document.body.classList.remove(['dark'])
		}, 500)
	},
	data() {
		return {
			dev: []
		}
	},
	methods: {}
}
</script>


<style lang="scss" scoped>
.container_team {
	width: 1200px !important;
}
.onepage_scroll {
	overflow-y: scroll;
	height: 100vh;
}

.team-image {
	width: 100%;
	border-radius: 50%;
}
.vertical_card {
	transition: 100ms ease-out;
	.meta .location {
		opacity: 0.5;
	}
	.meta .displayName {
		margin-bottom: 20px;
	}
}
.vertical_card:hover {
	transform: translateY(-10px);
}
.team_heading {
	text-align: center;
	display: flex;
	flex-direction: column;
}
</style>
