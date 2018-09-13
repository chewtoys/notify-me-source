<template>
	<div class="onepage_scroll">
		<div class="fullpage dark">
			<div class="heading_banner">
				<div class="container center"><br /><br /><br /><br />
					<!-- <h1> Subscribe to people, not platforms.</h1> -->
					<h1>notify.me</h1>
					<p class="center">okay HOLD up, we're live on the ACTUAL domain this is surreal. let me quickly throw together a landing page worthy of a domain this cool... catch me streaming that:</p>
					<!-- <p>Notify is a new way to consume subscriptions, manage who and what you get notified about- on all platforms, in one place.</p> -->
					<iframe class="twitch-player"
						src="https://player.twitch.tv/?channel=jamiepinelive&autoplay=true"
						width="600px"
						height="300px"
						frameborder="0"
						scrolling="no"
						allowfullscreen="1">
					</iframe>
					<div class="ooo">
						<router-link to="/create">
							<button disabled class="coolbtn purp mr ooooo ">Early Access</button>
						</router-link>
						<router-link to="/login">
							<button class="coolbtn ooooo">Sign In</button>
						</router-link>
					</div>
				</div>
			</div>
			<!-- <p class="container center">[Diagram: Notifications link directly to native content, on any platform.]</p> -->
			<!-- <div class="appimg"/> -->
			<!-- <footer class="pt-4 my-md-5 pt-md-5 border-top">
				<div class="row">
					<div class="col-12 col-md">
						<img class="mb-2" src="" alt="" width="24" height="24">
						<small class="d-block mb-3 text-muted">© Notify 2018</small>
					</div>
					<div class="col-6 col-md">
						<h5>Features</h5>
						<ul class="list-unstyled text-small">
							<li><a class="text-muted" href="/about#meet-notify">Meet Notify</a></li>
							<li><a class="text-muted" href="/about#public-profile">Public Profiles</a></li>
							<li><a class="text-muted" href="/about#link-directly">Direct link to content</a></li>
							<li><a class="text-muted" href="/about#whats-on">Whats on?</a></li>
							<li><a class="text-muted" href="/about#subscription-manager">Subscription Manager</a></li>
							<li><a class="text-muted" href="/about#good-stuff">Good stuff</a></li>
						</ul>
					</div>
					<div class="col-6 col-md">
						<h5>Resources</h5>
						<ul class="list-unstyled text-small">
							<li><a class="text-muted" href="#">Resource</a></li>
							<li><a class="text-muted" href="#">Resource name</a></li>
							<li><a class="text-muted" href="#">Another resource</a></li>
							<li><a class="text-muted" href="#">Final resource</a></li>
						</ul>
					</div>
					<div class="col-6 col-md">
						<h5>About</h5>
						<ul class="list-unstyled text-small">
							<li><a class="text-muted" href="/team">Team</a></li>
							<li><a class="text-muted" href="#">Privacy</a></li>
							<li><a class="text-muted" href="#">Terms</a></li>
						</ul>
					</div>
				</div>
			</footer>
		</div> -->
		</div>
	</div>
</template>

<script>
import { Nav } from '@/components/container'
import { method } from 'bluebird'

import { team } from '@/assets/data/team'

export default {
    created() {
        this.team = team
    },
    data() {
        return {
            team: []
        }
    },
    components: {
        Nav
    },
    methods: {}
}
</script>

<style scoped lang="scss">
h1 {
    font-size: 3.5rem;
    font-family: Roboto, sans-serif;
    font-weight: 600;
    margin-top: 10px;
}

h2 {
    font-size: 2.5rem;
    font-family: Roboto, sans-serif;
    font-weight: 600;
}

h2 {
    font-size: 1.5rem;
    font-family: Roboto, sans-serif;
    font-weight: 600;
}

small {
    margin-top: 12px;
    opacity: 0.68;
}

.center {
    text-align: center;
}

.ooo {
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    z-index: 9999;
}

.ccc {
    opacity: 0.5;
}

.ooooo {
    width: 150px;
}

.onepage_scroll {
    overflow-y: scroll;
    height: 100vh;
}

.fullpage {
    height: 100vh;
    background: #212121;
    display: flex;
    /* background-image: url('../../assets/img/stars.svg'); */
    background-position: 0 180px;
    background-size: contain;
    flex-direction: column;
    background-color: #0d0413 !important;
}

.section {
    width: 100%;
    display: block;
    padding: 80px 0;
}

.section .section_padding {
    padding: 80px 0;
}

.section_subscription_manager {
    background: #2c2c2c;
}

.section_twitch {
    background: #6441a4;
    color: #fff;
}

.section i {
    opacity: 0.5;
}

.team_header {
    margin-top: -30px;
    margin-bottom: 50px;
}

.section_item {
    margin: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.section_item svg {
    margin-bottom: 77px;
    margin-top: 37px;
}

.circle_badge {
    border-radius: 50%;
    background: #a369d9;
    padding: 20px;
    box-shadow: 0 0 60px #131313;
    color: #fff !important;
    margin-bottom: 30px;
}

.circle_badge .stat_number {
    color: #fff;
}

.circle_badge .circle_badge_container {
    width: 100px;
    height: 100px;
    display: flex;
}

.circle_badge .stat_number {
    font-size: 41px;
    margin-top: -11px;
}

.notify_purple {
    background: #a36ad8;
    color: #fff;
}

.heading_banner {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-bottom: -40px;
}

.heading_banner p {
    max-width: 700px;
    align-self: center;
    margin-top: 20px;
}

.lol {
    background: #131313;
    .container p {
        margin-bottom: 50px;
    }
}

.whiteBox {
    background: #fcfcfc;
    color: #000;
}

.robot_thing {
    width: 260px;
    height: 180px;
    background-repeat: no-repeat;
    background-size: cover;
    margin-bottom: 20px;
}

.submanagerimg {
    background-image: url('/submanager.png');
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.144);
    width: 865px;
    height: 350px;
    background-size: cover;
    margin-bottom: -80px;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
}

.bottomimg {
    // box-shadow: 0 0 40px rgba(0, 0, 0, 0.144);
    width: 865px;
    height: 350px;
    background-size: cover;
    margin-bottom: -80px;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
}

.linkimg {
    width: 1075px;
    height: 595px;
    background-size: cover;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    background-image: url('/howitworks.png');
}

.appimg {
    background-image: url('https://dzwonsemrish7.cloudfront.net/items/0y1J411B310z393b1e2t/app3.png');
    width: 90%;
    height: 452px;
    background-size: cover;
    margin-left: auto;
    margin-right: auto;
    flex-grow: 1;
}

.container_team {
    width: 1200px !important;
}

.onepage_scroll {
    overflow-y: scroll;
    height: 100vh;
}
</style>
