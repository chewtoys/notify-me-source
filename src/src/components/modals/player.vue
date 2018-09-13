<template>
	<div :class="{ 'mini': miniP }" v-shortkey="['esc']" @shortkey="close()">
		<transition name="fade">
			<div v-if="show" @click="close" class="backdrop"></div>
		</transition>
		<transition name="slideup">
			<div v-if="show" class="modal_container MoreInfo">
				<div id="player">
					<div class="modal_content">
						<div v-if="!miniP" class="creator_meta">
							<div v-bind:style="{ 'background-image': 'url(' + post.channel.avatar + ')' }" class="creator_avatar avatar"></div>
							<div class="creator_name">{{ post.channel.displayName }}</div>
							<div class="post_time"> {{ niceTime(post.createdAt) }}
								<div class="coolbtn borderless minibutton" @click="mini()"><i class="fa fa-angle-down" /></div>
							</div>
						</div>
						<div v-if="miniP" class="maxPlayer" @click="maxPlayer"><i class="fa fa-expand" /></div>
					</div>
					<div class='embed-container'>
						<iframe :src='convertLinkToEmbed(post.link)' frameborder='0' allowfullscreen></iframe>
					</div>
					<div class="modal_content">
						<small class="post_date_long">{{ nideDate(post.createdAt) }}</small>
						<div v-if="!miniP" class="update_title"> {{ post.title }}</div>
						<p v-if="!miniP" class="update_desc"> A message from the creator goes here...</p> <br/>
						<div class="info_items">
                            <div class="info_item">
                                <div class="stat_number">33,434</div>
                                <div class="stat_label">Notified</div>
                            </div>
                            <div class="info_item">
                                <div class="stat_number">235,435</div>
                                <div class="stat_label">Impressions</div>
                            </div>
                        </div>
					</div>
					<div class="linkToSite">
                        <a target="_blank" :href="post.link"><button class="coolbtn betterbtn fat">Open On {{ post.platform }}</button></a>
                    </div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
import { setTimeout } from 'timers'

export default {
    components: {},
    created() {},
    mounted() {
        this.$root.$on('player', () => {
            this.open()
        })
    },
    data() {
        return {
            show: false,
            miniP: false
        }
    },
    methods: {
        open() {
            this.show = true
        },
        close() {
            this.show = false
        },
        mini() {
            this.miniP = true
        },
        maxPlayer() {
            this.miniP = false
        },
        convertLinkToEmbed(link) {
            const regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
            const match = link.match(regex)
            const embed = 'https://www.youtube.com/embed/' + match[7] + '?autoplay=1'
            return embed
        },
        niceTime(time) {
            moment.updateLocale('en', {
                relativeTime: {
                    future: 'in %s',
                    past: '%s',
                    s: '1s',
                    m: '1m',
                    mm: '%dm',
                    h: '1hr',
                    hh: '%dhr',
                    d: '1d',
                    dd: '%dd',
                    M: '1 month',
                    MM: '%d months',
                    y: '1 year',
                    yy: '%d years'
                }
            })
            return moment(time).fromNow()
        }
    },
    computed: {
        post() {
            return this.$store.state.post.moreInfo
        }
    },
    watch: {}
}
</script>

<style lang="scss">
@import '../../assets/css/responsive.scss';
@import '../../assets/css/colors.scss';
.maxPlayer {
    margin-bottom: 6px;
    margin-top: -10px;
}

.modal_container.MoreInfo {
    width: 60%;
    margin-top: 0px;
    height: 100vh;
}

.backdrop {
    position: absolute;
    width: 100%;
    height: 100vh;
    background: rgb(255, 255, 255);
    opacity: 0.95;
    z-index: 900090;
    transition: 1s;
}

.mini .backdrop {
    display: none;
}

.modal_container {
    left: 0;
    right: 0;
    margin: auto;
    width: 500px;
    min-height: 200px;
    margin-top: 100px;
    box-shadow: 0px 2px 120px 0px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    background: #fff;
    position: absolute;
    z-index: 900091;
    overflow: hidden;
    transition: 200ms;
    .modal_content {
        position: relative;
    }
    .creator_name {
        float: left;
        font-size: 1.2rem;
        margin-left: 4px;
        margin-top: 2px;
    }
    .update_title {
        margin: 0;
        font-size: 1.5rem;
        height: unset;
        margin-bottom: 10px;
        max-width: 500px;
    }
    .linkToSite {
        width: 100%;
        button {
            width: calc(100% - 40px);
            margin: 20px;
            text-transform: uppercase;
            color: #fff;
        }
        position: absolute;
        bottom: 20px;
    }
    .info_items {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        .info_item {
            margin-right: 30px;
        }
    }
    @media only screen and (min-width: $wide) {
        .info_items {
            position: absolute;
            right: 10px;
            top: 40px;
        }
    }
}

.mini .modal_container {
    right: 10px;
    bottom: 10px;
    margin-right: 0;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5) !important;
    width: 320px;
}

.modal_content {
    padding: 20px;
}

.modal-header {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #f5f5f5;
}

.modal-header .title {
    color: #9e9e9e;
    font-size: 13px;
    margin-left: 10px;
}

.dark .modal-header {
    border-bottom: 1px solid #222222;
}

.dark .modal_container {
    background: rgb(26, 26, 26);
}

.modal_content .result {
    padding: 5px 5px 5px 5px;
    font-size: 13px;
}

::-webkit-scrollbar {
    display: none;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
	.fade-leave-to
	/* .fade-leave-active below version 2.1.8 */
	
	 {
    opacity: 0;
}

.slideup-enter-active {
    animation: slideup 0.5s;
}

.slideup-leave-active {
    animation: slideup 0.3s reverse;
}

@keyframes slideup {
    0% {
        transform: translateY(100px);
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    60% {
        transform: translateY(-5px);
    }
    100% {
        transform: translateY(0);
    }
}
.post_date_long {
    opacity: 0.5;
}
</style>
