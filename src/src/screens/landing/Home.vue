<template>
	<div class="scroll">
		<div class="onepage_scroll">
			<div class="fullpage center">
				<div class="sky">
					<div class="container">
						<Nav></Nav>
					</div>
	
					<div class="center_text">
						<h1 @click="boof"> {{pack}} </h1>
						<p>Notify lets you subscribe directly to creators. Their notifications link to any platform and you get the tools to keep it all under control. </p>
						<div class="action_buttons">
							<router-link to="/create"><button class="coolbtn mr betterbtn fat lighter">Early Access</button></router-link>
							<router-link to="/login"><button class="coolbtn fat">Sign In</button></router-link>
						</div>
					</div>
					<!-- {{ Math.floor(Math.random() * 200) + 50 }} -->
					<img src="/clouds/star.svg" alt="" v-for="index in 40" :key="index" class="star" :data-star="index" />
				</div>
				<div class="clouds cloudsbg"></div>
				<div class="clouds clouds1"></div>
				<div class="desktop_preview"><img src="/desktop_feed.png" /></div>
				<div class="container">
					<div class="mobile_preview"><img src="/mobile_feed.png" /></div>
				</div>
				<div class="clouds clouds2"></div>
				<div class="container">
					<div class="beta_countdown">
						<h2>Countdown to beta launch</h2>
						<div class="countdown_timer highlight">{{countdown}}</div>
					</div>
				</div>
				<!-- <div class="container">
							<div class="home_links">
			
								
							</div>
						</div> -->
			</div>
		</div>
	
		<footer class="home_footer">
			<div class="container">
				<div class="row">
					<div class="col-sm">
						<!-- <h1>notify</h1> -->
						<div class="logo_test"></div>
						<small>&copy; 2018 Notify Software Limited</small><br /><br />
						<ul>
							<li>
								<a target="_blank" href="https://app.termly.io/document/terms-of-use-for-website/d5ea97d7-97c3-4ee3-b2fe-fc1a0701df9f">
									Terms & Conditions
								</a>
							</li>
							<li><a href="#">Privacy Policy</a></li>
						</ul>
					</div>
					<div class="col-sm">
						<h3>Product</h3>
	
						<ul>
							<li><a href="#">Features</a></li>
							<li><a href="#">Branding</a></li>
						</ul>
					</div>
					<div class="col-sm">
						<h3>Get Notify</h3>
						<ul>
							<li><a href="#">for iOS</a></li>
							<li><a href="#">for Android</a></li>
							<li><a href="#">for Windows</a></li>
							<li><a href="#">for Mac</a></li>
							<li><a href="#">Browser Extension</a></li>
						</ul>
					</div>
					<div class="col-sm">
						<h3>Company</h3>
						<ul>
							<li><a href="/about">Our Story</a></li>
							<li><a href="/team">Team</a></li>
						</ul>
					</div>
					<div class="col-sm">
						<h3>Get Involved</h3>
						<ul>
							<li><a href="#">Jobs</a></li>
							<li><a href="#">Report a bug</a></li>
							<li><a href="https://discord.gg/pUhDH6a">Join our Discord</a></li>
							<li><a target="_blank" href="https://twitch.tv/jamiepinelive">Watch us live</a></li>
							<li><a href="/team">Developers</a></li>
						</ul>
					</div>
	
				</div>
			</div>
		</footer>
	</div>
</template>

<script>
import countdown from 'countdown'
import { Nav } from '@/components/container'
import { setInterval } from 'timers'
export default {
    components: {
        Nav
    },
    data() {
        return {
            countdown: '',
            pack: 'For the content you love.'
        }
    },
    methods: {
        boof() {
            this.pack = 'boofpack'
        }
    },
    mounted() {
        countdown.setLabels('ms |s |m |hr |d |wks ||yrs ', 'ms |s |m |hr |d |wks ||yrs ', '', ' ')
        setInterval(() => {
            this.countdown = countdown(new Date(2018, 9, 1)).toString()
        }, 1000)
    }
}
</script>

<style lang="scss">
@import '../../assets/css/mixins.scss';
@import '../../assets/css/responsive.scss';
@import '../../assets/css/colors.scss';
.sky {
    a {
        color: #fff !important;
    }
    .toplogo {
        color: #fff;
    }
}

.onepage_scroll {
    overflow: hidden;
    position: relative;
    display: block;
}

.fullpage {
    height: 100vh;
    background: #fff;
    overflow: hidden;
    color: #0e1529;
    .coolbtn {
        padding: 8px 15px;
    }
    .sky {
        height: 100vh;
        position: relative;
        background-image: linear-gradient(-180deg, #0a142b 0%, #222e52 100%);
        // @media only screen and (max-width: 500px) {
        // 	& {
        // 		margin-bottom: 90px;
        // 		padding: 20px;
        // 	}
        // }
        // @media only screen and (max-height: $smallHeight) {
        // 	& {
        // 		height: 80vh;
        // 	}
        // }
        // @media only screen and (max-height: $extraSmallHeight) {
        // 	& {
        // 		height: calc(100vh + 300px);
        // 	}
        // }
    }
}

.center_text {
    color: #fff;
    width: 600px;
    text-align: center;
    margin: auto;
    padding-top: 10px;
    z-index: 100;
    position: relative;
    h1 {
        font-family: 'ProximaNovaBold', Helvetica, sans-serif;
        letter-spacing: -1px;
        font-size: 3rem;
    }
    p {
        max-width: 600px;
        margin: auto;
    }
    @media only screen and (min-width: $superWide) {
        & {
            width: 800px;
            h1 {
                font-size: 4rem;
            }
        }
    }
    @media only screen and (max-width: $mobile) {
        & {
            width: 100%;
            h1 {
                font-size: 2rem;
            }
        }
    }
}

.clouds {
    position: absolute;
    background-size: cover;
    background-repeat: no-repeat;
    bottom: 0%;
    height: 40%;
}

.clouds2 {
    background-image: url('/clouds/clouds_front2.svg');
    width: 100%;
    margin-top: -130px;
    filter: drop-shadow(-5px -15px 5px #3d3d3d1f);
    z-index: 15;
    @media only screen and (max-width: $mobile) {
        & {
            z-index: 9999;
            bottom: -10%;
        }
    }
}

.clouds1 {
    background-image: url('/clouds/clouds_front_dark.svg');
    width: 100%;
    margin-top: -150px;
    filter: drop-shadow(-5px -15px 5px #0000000e);
    z-index: 5;
    // opacity: 0.9;
}

.cloudsbg {
    background-image: url('/clouds/clouds_bg_dark.svg');
    width: 100%;
    margin-top: -140px;
    z-index: 1;
    opacity: 0.5;
}

.desktop_preview {
    position: absolute;
}

.mobile_preview {
    position: absolute;
    width: 30%;
    max-height: 100vh;
    overflow: hidden;
    transform: rotate(-11deg);
    z-index: 200;
    width: 32%;
    left: 3%;
    bottom: -20%;
    transition: 200ms;
    img {
        width: 100%;
        height: auto;
    }
    @include animation('floatMobile 15s linear infinite');
}

.desktop_preview {
    position: absolute;
    width: 50%;
    max-height: 100vh;
    overflow: hidden;
    transform: rotate(7deg);
    z-index: 2;
    right: -12%;
    bottom: 5%;
    transition: 200ms;
    img {
        width: 100%;
        height: auto;
    }
    @include animation('floatDesktop 17s linear infinite');
}

// REPOSNIVE POSITIONING
@media only screen and (max-width: $wide) {
    .mobile_preview {
        width: 35%;
    }
    .desktop_preview {
        right: -10%;
        bottom: 16%;
        width: 52%;
    }
}

@media only screen and (max-width: $normal) {
    .mobile_preview {
        width: 43%;
        left: 2%;
    }
}

@media only screen and (max-width: $small) {
    .mobile_preview {
        width: 50%;
        left: 2%;
    }
}

@media only screen and (max-width: $mobile) {
    .mobile_preview {
        width: 80%;
        left: 2%;
    }
    .desktop_preview {
        right: -56%;
        bottom: 26%;
        width: 92%;
    }
    .center_text {
        padding: 10px;
        p {
            font-size: 0.8rem;
        }
        h1 {
            font-size: 1.5rem;
        }
    }
}

//regular mobile devices
@media only screen and (max-width: $mobile) and (max-height: $smallHeight) {
    .clouds {
        height: 30%;
    }
    .beta_countdown {
        bottom: -28px !important;
    }
    .mobile_preview {
        bottom: -33%;
    }
    .desktop_preview {
        bottom: 13%;
    }
}

// Tall mobile devices
@media only screen and (max-width: $mobile) and (min-height: $smallHeight) {
    .mobile_preview {
        bottom: -3%;
    }
}

// short mobile devices
@media only screen and (max-width: $mobile) and (max-height: $extraSmallHeight) {
    .mobile_preview {
        display: none;
    }
    .desktop_preview {
        display: none;
    }
    .beta_countdown {
        bottom: 20px !important;
    }
    .clouds {
        height: 40%;
    }
}

@mixin randomStar() {
    $max: 20;
    $min: 10;
    $size: random($max - $min) + $min;
    width: $size + px;
    height: $size + px;
    top: percentage(random(100) / 100);
    left: percentage(random(100) / 100);
    opacity: ((random(50) + 5) / 100);
}

img.star {
    position: fixed;
    @for $i from 1 through 50 {
        &[data-star='#{$i}'] {
            @include randomStar();
        }
    }
}

@include keyframes(floatDesktop) {
    0% {
        transform: translateY(20px) rotate(7deg);
    }
    25% {
        transform: translateY(14px) rotate(7.5deg);
    }
    50% {
        transform: translateY(0px) rotate(7deg);
    }
    75% {
        transform: translateY(11px) rotate(7.5deg);
    }
    100% {
        transform: translateY(20px) rotate(7deg);
    }
}

@include keyframes(floatMobile) {
    0% {
        transform: translateY(-10px) rotate(-11deg);
    }
    25% {
        transform: translateY(-1px) rotate(-10deg);
    }
    50% {
        transform: translateY(0px) rotate(-11deg);
    }
    75% {
        transform: translateY(-2px) rotate(-10deg);
    }
    100% {
        transform: translateY(-10px) rotate(-11deg);
    }
}

.beta_countdown {
    margin-left: 300px;
    width: calc(100% - 300px);
    height: 300px;
    // float: left;
    z-index: 9999999;
    position: relative;
    text-align: right;
    margin-top: -15%;
    letter-spacing: -2px;
    h2 {
        font-family: 'ProximaNovaBold', Helvetica, sans-serif;
        margin-bottom: -20px;
    }
    .countdown_timer {
        font-size: 5rem;
        font-family: 'ProximaNovaBold', Helvetica, sans-serif;
    }
    @media only screen and (max-height: $smallHeight) {
        & {
            margin-top: -10%;
            .countdown_timer {
                font-size: 4rem;
            }
        }
    }
    @media only screen and (max-width: $wide) {
        & {
            margin-top: -130px;
            .countdown_timer {
                font-size: 4rem;
            }
        }
    }
    @media only screen and (max-width: $normal) {
        & {
            margin-top: -130px;
            .countdown_timer {
                font-size: 3rem;
            }
        }
    }
    @media only screen and (max-width: $small) {
        & {
            margin-top: -130px;
            margin-left: 200px;
            width: calc(100% - 200px);
            h2 {
                font-size: 1.3rem;
                margin-bottom: 0;
            }
            .countdown_timer {
                font-size: 2rem;
            }
        }
    }
    @media only screen and (max-width: $mobile) {
        & {
            position: absolute;
            width: 100%;
            margin: 0;
            bottom: 0;
            text-align: center;
            padding-top: 30px;
            height: 20%;
            left: 0;
        }
    }
}

.home_footer {
    // height: 250px;
    background: #020714;
    font-size: 0.8rem;
    width: 100%;
    position: relative;
    padding: 40px 20px;
    color: #fff;
    h1 {
        font-family: 'ProximaNovaBold', Helvetica, sans-serif;
    }
    h3 {
        font-family: 'ProximaNovaBold', Helvetica, sans-serif;
        letter-spacing: -1px;
        margin-bottom: 20px;
    }
    ul {
        padding-left: 0;
        li {
            list-style: none;
            margin-bottom: 5px;
        }
    }
    a {
        color: rgb(206, 206, 206);
        &:hover {
            color: $highlight;
        }
    }
    .col-sm {
        margin-bottom: 20px;
    }
    @media only screen and (max-width: $mobile) {
        & {
            text-align: center;
        }
    }
}

.home_links {
    position: relative;
    z-index: 999999;
    margin-left: 430px;
    width: calc(100% - 430px);
    margin-top: 30px;
}
</style>
