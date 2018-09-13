<template>
    <div>
        <Nav></Nav>
        <div class="container">

            <div class="logo animated slideInUp">
                <svg width="auto" height="auto" viewBox="3034 443 335 282" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <!-- Generator: Sketch 40.3 (33839) - http://www.bohemiancoding.com/sketch -->
                    <desc>Created with Sketch.</desc>
                    <defs></defs>
                    <g id="Group" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
                       transform="translate(3034.137370, 454.000000)">
                        <path d="M168.345763,260.350346 C173.53021,260.350346 313.861789,271.888983 313.861789,173.884747 C313.861789,75.8805116 271.047695,87.5979083 168.345763,87.5979083 C65.6438316,87.5979083 24,74.49542 24,170.961854 C24,267.428288 163.161317,260.350346 168.345763,260.350346 Z"
                              id="Oval-2-Copy-3" stroke="#000000" stroke-width="20"></path>
                        <circle id="Oval-3" fill="#000000" cx="109.5" cy="172.5" r="44.5"></circle>
                        <ellipse id="Oval-3-Copy-5" fill="#000000" cx="14" cy="172.5" rx="14" ry="44.5"></ellipse>
                        <ellipse id="Oval-3-Copy-6" fill="#000000" cx="320" cy="171.5" rx="14" ry="44.5"></ellipse>
                        <path d="M183,241 C182.915669,252.066511 176.679959,261 169,261 C161.320041,261 155.084331,252.066511 155,241 L183,241 Z"
                              id="Combined-Shape" fill="#000000"></path>
                        <circle id="Oval-3-Copy" fill="#000000" cx="226.5" cy="174.5" r="44.5"></circle>
                        <circle id="Oval-3-Copy-2" fill="#FFFFFF" cx="124" cy="155" r="14"></circle>
                        <circle id="Oval-3-Copy-4" fill="#FFFFFF" cx="246" cy="157" r="14"></circle>
                        <path d="M167.547475,87.0373114 C161.728703,92.9804913 134.629514,21.8745327 138.349125,17.6817706 C139.474728,16.4129861 186.711636,61.9332067 194.091701,54.3953519 C203.961632,44.3143982 186.63533,-3.64931521 183.201128,0.221732145 C182.683725,0.804951052 187.326476,7.63757041 187.326476,7.63757041"
                              id="Line-Copy-3" stroke="#000000" stroke-width="20" stroke-linecap="square"></path>
                    </g>
                </svg>
            </div>

            <div class="profile animated ">

                <div class="profile-header">

                    <div v-bind:style="{ 'background-image': 'url(' + profile.avatar + ')' }"
                         class="profile-avatar"></div>

                    <!-- <div class="profile-avatar"></div> -->

                    <div class="userMeta">
                        <div class="userName">{{ profile.displayName }}
                            <div class="userVerified">
                                <svg width="15px" height="15px" viewBox="384 201 10 10" version="1.1"
                                     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <path d="M385.14087,204.428184 C385.05038,204.228311 385,204.006403 385,203.772727 C385,203.294283 385.211199,202.865167 385.545455,202.573524 L385.545455,202.545455 L385.578519,202.545455 C385.853584,202.318292 386.206309,202.181818 386.590909,202.181818 C386.876555,202.181818 387.144618,202.257099 387.37634,202.388904 C387.475593,201.605647 388.144341,201 388.954545,201 C389.76475,201 390.433498,201.605647 390.532751,202.388904 C390.764473,202.257099 391.032536,202.181818 391.318182,202.181818 C391.702782,202.181818 392.055507,202.318292 392.330572,202.545455 L392.363636,202.545455 L392.363636,202.573524 C392.697891,202.865167 392.909091,203.294283 392.909091,203.772727 C392.909091,203.998017 392.862262,204.21237 392.777807,204.406582 C393.478649,204.572895 394,205.202836 394,205.954545 C394,206.706255 393.478649,207.336196 392.777807,207.502509 C392.862262,207.696721 392.909091,207.911074 392.909091,208.136364 C392.909091,208.614808 392.697891,209.043924 392.363636,209.335567 L392.363636,209.363636 L392.330572,209.363636 C392.055507,209.590799 391.702782,209.727273 391.318182,209.727273 C391.03604,209.727273 390.771053,209.653827 390.541296,209.525013 C390.481922,210.349529 389.794196,211 388.954545,211 C388.114895,211 387.427169,210.349529 387.367795,209.525013 C387.138038,209.653827 386.87305,209.727273 386.590909,209.727273 C386.206309,209.727273 385.853584,209.590799 385.578519,209.363636 L385.545455,209.363636 L385.545455,209.335567 C385.211199,209.043924 385,208.614808 385,208.136364 C385,207.902688 385.05038,207.68078 385.14087,207.480907 C384.481399,207.286775 384,206.676878 384,205.954545 C384,205.232213 384.481399,204.622316 385.14087,204.428184 Z M386.363636,206.517412 L387.153912,205.568978 L388.28506,206.585586 L390.839631,203.909091 L391.643816,205.164396 L388.17258,208.128186 L386.363636,206.517412 Z"
                                          id="Combined-Shape" stroke="none" fill="#373737" fill-rule="evenodd"></path>
                                </svg>
                            </div>
                        </div>

                        <div class="userDesc">{{ profile.bio }}</div>
                        <div class="userSubCount"><span class="userSubCountNumber">23,987</span> subscribers</div>

                        <a href="">
                            <div class="subButton center">Subscribe</div>
                        </a>
                    </div>

                    <div class="divider"></div>

                    <div class="avg">AVERAGES <big class="number">1</big> NOTIFICATION PER DAY</div>

                    <div class="averages center">

                        <div class="third">
                            <div class="socialnetwork">
                                <div class="icon yt"> 78%</div>
                            </div>
                        </div>
                        <div class="third">
                            <div class="socialnetwork">
                                <div class="icon twitch"> 19%</div>
                            </div>
                        </div>
                        <div class="third">
                            <div class="socialnetwork">
                                <div class="icon twitter"> 3%</div>
                            </div>
                        </div>

                    </div>

                    <div class="divider"></div>


                </div>

            </div>


            <div class="right-content">

                <div class="jumboText animated pulse">Join <b>23,043</b> other people getting Notified when {{
                    profile.username }} posts.
                </div>

                <div class="actions animated fadeIn">

                    <div class="action">
                        <div class="action-inner ">
                            <svg width="auto" height="150px" viewBox="1221 474 243 150" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <defs>
                                    <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox"
                                            id="filter-1">
                                        <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                                        <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1"
                                                        result="shadowBlurOuter1"></feGaussianBlur>
                                        <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.0454030797 0"
                                                       type="matrix" in="shadowBlurOuter1"
                                                       result="shadowMatrixOuter1"></feColorMatrix>
                                        <feMerge>
                                            <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                                            <feMergeNode in="SourceGraphic"></feMergeNode>
                                        </feMerge>
                                    </filter>
                                </defs>
                                <g id="Group" filter="url(#filter-1)" stroke="none" stroke-width="1" fill="none"
                                   fill-rule="evenodd" transform="translate(1242.000000, 476.000000)">
                                    <rect id="Rectangle-4" fill="#FFFFFF" x="0" y="0" width="201" height="142"
                                          rx="16"></rect>
                                    <path d="M200.471046,22.9580838 C200.816189,21.650001 201,20.2763041 201,18.8596103 L201,16.0026652 C201,7.16011066 193.835061,0 184.996661,0 L16.0033389,0 C7.15369642,0 0,7.16463725 0,16.0026652 L0,18.8596103 C0,20.2764755 0.183956051,21.6501448 0.529276832,22.9580838 L200.471046,22.9580838 Z"
                                          id="Combined-Shape" fill="#343434"></path>
                                    <ellipse id="Oval-2" fill="#FFFFFF" cx="186.220588" cy="11.4790419" rx="6.33403361"
                                             ry="6.37724551"></ellipse>
                                    <ellipse id="Oval-2-Copy" fill="#B5B5B5" cx="167.640756" cy="11.4790419"
                                             rx="6.33403361" ry="6.37724551"></ellipse>
                                    <ellipse id="Oval-2-Copy-2" fill="#7C7C7C" cx="149.060924" cy="11.4790419"
                                             rx="6.33403361" ry="6.37724551"></ellipse>
                                    <rect id="Rectangle-6" fill="#F2F2F2" x="10.9789916" y="33.1616766"
                                          width="180.731092" height="23.8083832"></rect>
                                    <rect id="Rectangle-6-Copy" fill="#F2F2F2" x="23.7651125" y="62.9221557"
                                          width="95.3147194" height="59.2283819"></rect>
                                    <rect id="Rectangle-6-Copy-2" fill="#F2F2F2" x="125" y="63" width="40.6286256"
                                          height="40.9058013"></rect>
                                    <rect id="Rectangle-6-Copy-3" fill="#E83232" x="144" y="119.634914"
                                          width="47.6286256" height="14.2708875" rx="3"></rect>
                                </g>
                            </svg>


                        </div>
                        <div class="action-title">
                            Desktop Notifications
                        </div>
                        <a href="">
                            <div class="action-button center">Enable</div>
                        </a>
                        <p class="action-text">It’s as easy as a single click!</p>

                        <div class="platform-icons center">
                            <div class="icon chrome"></div>
                            <div class="icon firefox"></div>
                        </div>
                    </div>

                    <div class="action">
                        <div class="action-inner">
                            <svg width="auto" height="150px" viewBox="1640 479 86 140" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <!-- Generator: Sketch 40.3 (33839) - http://www.bohemiancoding.com/sketch -->
                                <desc>Created with Sketch.</desc>
                                <defs>
                                    <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox"
                                            id="filter-1">
                                        <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                                        <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1"
                                                        result="shadowBlurOuter1"></feGaussianBlur>
                                        <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.0454030797 0"
                                                       type="matrix" in="shadowBlurOuter1"
                                                       result="shadowMatrixOuter1"></feColorMatrix>
                                        <feMerge>
                                            <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                                            <feMergeNode in="SourceGraphic"></feMergeNode>
                                        </feMerge>
                                    </filter>
                                </defs>
                                <g id="Group-Copy-3" filter="url(#filter-1)" stroke="none" stroke-width="1" fill="none"
                                   fill-rule="evenodd" transform="translate(1644.000000, 481.000000)">
                                    <rect id="Rectangle-4" fill="#FFFFFF" x="0" y="0" width="77" height="132"
                                          rx="16"></rect>
                                    <rect id="Rectangle-6" fill="#424242" x="27.0925926" y="9.93548387"
                                          width="22.8148148" height="3.23816882"></rect>
                                    <rect id="Rectangle-6-Copy-2" fill="#EEEEEE" x="9.98148148" y="19.8709677"
                                          width="57.037037" height="93.6774194"></rect>
                                    <ellipse id="Oval-2" fill="#EFEFEF" cx="38.7276688" cy="122.31524" rx="5.93137255"
                                             ry="5.92814371"></ellipse>
                                    <rect id="Rectangle-6-Copy-3" fill="#E83232" x="15" y="25" width="47" height="9"
                                          rx="3"></rect>
                                </g>
                            </svg>
                        </div>
                        <div class="action-title">
                            Push Notifications
                        </div>
                        <a href="">
                            <div class="action-button center">Get App</div>
                        </a>
                        <p class="action-text">You don't even need to sign up!</p>

                        <div class="platform-icons center">
                            <div class="icon applestore"></div>
                            <div class="icon playstore"></div>
                        </div>
                    </div>
                </div>


                <div class="info animated fadeIn">

                    <h3 class="left info-title">What is Notify?</h3>

                    <div class="action-button right info-button">WATCH VIDEO</div>

                    <div class="info-text">
                        <p><b>Have you ever felt like you’ve missed a notification from your favorite creator?</b> The
                            majority of social media platforms use bots and algorithms to “optimise” notifications and
                            subscription feeds.</p>
                        <p>As a result many creators are left unable to reach their subscribers. We believe that
                            shouldn’t be the case, and the solution is simple! Enter, Notify!</p>
                        <p>Our <i>only</i> purpose is to deliever notifications that link directly to your content, on
                            any platform. </p>
                        <p>It’s that simple.</p>
                    </div>

                </div>


            </div>


        </div>
    </div>
</template>

<script>
import router from '@/router'
import { server } from '@/main'

import { Nav } from '@/components/container'

export default {
	name: 'Channel',
	components: {
		Nav
	},
	data() {
		return {
			profile: null
		}
	},
	beforeCreate() {
		var channel = this.$route.params.channel

		// ask server for channel
		server
			.get(`channel/` + channel)
			.then(response => {
				if (response.data.length === 0) {
					router.push('/')
					this.$root.$emit('alert', 'error', 'Channel not found!')
				}
				this.profile = response.data[0]
				console.log(response.data)
				return response.data
			})
			.catch(e => {
				console.log(e)
				this.$root.$emit('alert', 'error', 'Failed to connect to server, check API status')
			})

		// if not found
	},
	created() {}
}
</script>


<style>
.profile-avatar {
	background: #efefef;
}
</style>
