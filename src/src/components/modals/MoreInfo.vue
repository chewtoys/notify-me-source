<template>
    <div>

        <!-- <div class="modal-header">
          <span class="title">More Info</span>
          <div class="close"></div>
        </div> -->

        <div @click="maximizePlayer" class="modal_content">
            <div v-if="!playerIsMini" class="creator_meta">
                <div v-bind:style="{ 'background-image': 'url(' + post.channel.avatar + ')' }"
                     class="creator_avatar avatar"></div>
                <div class="creator_name">{{ post.channel.displayName }}</div>
                <div class="post_time"> {{ niceTime(post.createdAt) }}
                    <div class="coolbtn borderless minibutton" @click="miniPlayer"><i class="fa fa-angle-down"/></div>
                </div>
            </div>
            <div class='embed-container'>
                <iframe :src='convertLinkToEmbed(post.link)' frameborder='0' allowfullscreen></iframe>
            </div>

            <div v-if="!playerIsMini" class="update_title"> {{ post.title }}</div>

        </div>
    </div>
</template>

<script>
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
import debounce from 'debounce'

export default {
	data() {
		return {
			small: false
		}
	},
	mounted() {},
	updated() {},
	methods: {
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
		},
		miniPlayer() {
			this.$root.$emit('miniPlayer')
		},
		maximizePlayer() {
			this.$root.$emit('maxPlayer')
		}
	},
	computed: {
		post() {
			return this.$store.state.post.moreInfo
		},
		playerIsMini() {
			return this.$parent.mini
		}
	}
}
</script>

<style>
.modal_container.MoreInfo {
	width: 60%;
}

.mini .modal_content {
	cursor: pointer;
}

.minibutton {
	float: right;
	height: 10px;
	padding: 0px !important;
	margin: 0 0 0 23px;
	font-size: 21px !important;
}

.embed-container {
	position: relative;
	padding-bottom: 56.25%;
	height: 0;
	overflow: hidden;
	max-width: 100%;
}

.embed-container iframe,
.embed-container object,
.embed-container embed {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.modal_container .creator_meta {
	width: 100%;
	height: 38px;
}

.modal_container .post_time {
	float: right;
	font-size: 15px;
}

.modal_container .update_title {
	overflow: visible;
	margin-top: 11px;
}
</style>
