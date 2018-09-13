<template>
    <div>
        <div class="page subsciptions_container">
            <!-- <div v-for="x in updates" :key="e.id">
            </div> -->

			<div v-shortkey="['esc']" @shortkey="shuffleFilter()" />

            <div v-if="showLonely">

				<h4 class="feed_heading">Welcome to Notify, lets get you set up!</h4>
                

                <div class="feed_options vertical_cards">
                    <div class="vertical_card">
                        <h3>Import your subscriptions</h3>
                        <div class="social_icons">
                            <div class="icon youtube-icon"></div>
                            <div class="icon twitch-icon"></div>
                            <div class="icon twitter-icon"></div>
                        </div>
                    </div>
                    <div class="vertical_card" @click.prevent='createChannel'>
                        <h3>Create a channel</h3>
                        <div class="social_icons">
                            <i class="fa fa-tv"></i>
                        </div>
                    </div>
					<div class="vertical_card">
                        <h3>Which theme are you?</h3>
						<div class="center">
                        	<button @click="darkTheme(false)" class="coolbtn mr ">Light</button>
                        	<button @click="darkTheme(true)" class="coolbtn mr darkbtn">Dark</button>
						</div>
                    </div>
                </div>

				<h4 v-if="feed.length === 0 && !channelHeaderOpened" class="feed_heading">It's lonely in here...</h4>
                <div v-else class="center">
                <h4 class="feed_heading">Nice! That's looking better.</h4>
                <button @click="hideLonely = true" class="coolbtn center">Close This</button >
                </div>

                <Suggested />

            </div>

            <div v-else id="filters-group" class="filters-group">
                <div id="view_changer" class="topic_tag_bar btn-group filter-options view_changer">
                    <button @click="changeView('grid')" class="coolbtn left topic_tag" :class="{'active': viewType === 'grid'}">
                        <i class="fa fa-th-large"></i>
                    </button>
                    <button  @click="changeView('list')" class="coolbtn left topic_tag" :class="{'active': viewType === 'list'}">
                        <i class="fa fa-th-list"></i>
                    </button>
                </div>
                <!-- <div id="content_type_filter" class="topic_tag_bar btn-group filter-options">
                    <button class="coolbtn left topic_tag">
                        <i class="fa fa-play"></i>
                    </button>
                    <button class="coolbtn left topic_tag" >
                        <i class="fa fa-music"></i>
                    </button>
                    <button class="coolbtn left topic_tag" >
                        <i class="fa fa-music"></i>
                    </button>
                </div> -->
                <div id="topic_tag_bar" class="topic_tag_bar filter-options">
                    <!-- <div v-if="currentFilter" class="reset_button">
                        <button  v-if="filteredItems.length > 0" @click="shuffleFilter()" class="topic_tag left borderless coolbtn">
                            <i class="fa fa-times"></i>
                            </button> 
                    </div> -->
					<div class="btn-group content_filters">
						<button class="topic_tag left coolbtn">
							<i class="fa fa-video" />
						</button> 
						<button class="topic_tag left coolbtn">
							<i class="fa fa-headphones" />
						</button> 
						<button class="topic_tag left coolbtn">
							<i class="fa fa-camera" />
						</button> 
						<button class="topic_tag left coolbtn">
							<i class="fa fa-pen-fancy" />
						</button> 
					</div>
                    <div v-for="i in updateTopics" :key="i.id">
                        <button @click="shuffleFilter(i.topic)" :id="i.topic.toLowerCase()" class="coolbtn left topic_tag" :class="{'active': currentFilter === i.topic}">
                           <TopicText :i="i.topic" />
                        </button>
                    </div>
                </div>
                
            </div>


            <transition-group name="list-complete" class="list-complete" tag="section">
                <div
                        v-if="showPosts && viewType === 'grid'"
						v-for="i in filteredItems"
                        :key="i.id"
                        class="list-complete-item"

                        :id="'post-' + i.id"
                        :class="i.platform"

                        :data-groups="JSON.stringify(i.topics)"
                        :data-date-created="i.createdAt"
                        :data-title="i.title"
                        :data-creator="i.channel.username"
                >
                    <Update :i="i"/>
                </div>
            </transition-group>

            
            <div v-if="showPosts && viewType === 'list'" class="post_container">
                <br/>
                <transition-group name="list_slide" class="list_slide" tag="dev">
                    <div :class="'post_item post_' + i.platform.toLowerCase()" 
                    v-for="(i, index) in filteredItems" 
                    :key="index"
                    class="list_slide_item"
                    :id="'post-' + i.id"
                    >
                        <div class="post_platforms">
                            <PlatformIcon :platforms="i.platform" />
                        </div>
                        <div class="post_thumbnail_container" :style="{ 'background-image': 'url(' + i.thumbnail + ')' }">
                        </div>
                        <div class="post_content">
                            <div class="post_caption">{{i.title}}</div>
                            <small class="bottom_name creator_name">{{ niceTime(i.createdAt) }} • 0 Notified</small>
                            <!-- <small class="post_meta"><i class="far fa-clock"/> &nbsp; {{niceTime(i.createdAt)}} &nbsp;&nbsp;&nbsp; <i class="far fa-bell"/>&nbsp; 23,004</small> -->
    
                        </div>
                        
                    </div>
                </transition-group>
                </div>

        </div>

    </div>
</template>


<script>
// import FeedItem from '@/components/feeditem'
import { server } from '@/main'
import Channel from '@/core/channel.core.js'
import { create } from 'vue-modal-dialogs'
import Confirm from '@/components/modals/confirm'

import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

import Post from '@/core/post.core'
import { setTimeout } from 'timers'

import Update from '@/components/Update'
import Suggested from '@/components/discover/Suggested'

import PlatformIcon from '@/components/utils/PlatformIcon'

const confirm = create(Confirm, 'title', 'content')

import TopicText from '@/components/TopicText'

export default {
    components: {
        Update,
        Suggested,
        TopicText,
        PlatformIcon
    },
    props: ['username', 'lists'],
    data() {
        return {
            topics: [],
            shuffleInstance: null,
            hideFeed: false,
            currentFilter: '',
            subscriptionWaiting: false,
            hideLonely: true,
            viewType: 'grid'
        }
    },
    mounted() {
        // If router has username prop /channel/:username
        if (this.username) this.loadChannel(this.username)
        if (this.lists) this.$store.commit('subscriptionManagerToggle')

        this.$root.$on('refreshFeed', () => {})
    },
    methods: {
        shuffleFilter(tag) {
            // console.log(this.currentFilter, tag)
            if (this.currentFilter === tag) this.currentFilter = ''
            else this.currentFilter = tag
        },

        isForeignChannel() {
            const isForeignChannelID = this.getWhenchannelDataChanges.id
            const subscriptions = this.$store.getters.getSubscriptions
            return !subscriptions.find(x => x.id === isForeignChannelID)
        },
        changeView(view) {
            this.viewType = view
        }
    },
    computed: {
        posts() {
            return this.$store.getters.getPosts
        },
        suggested() {
            return this.$store.getters.getSuggested.slice(0, 6)
        },
        feed() {
            const posts = this.$store.getters.getPosts
            const subscriptions = this.$store.getters.getSubscriptions.map(item => item.id)
            const x = posts.filter(post => subscriptions.includes(post.owner))
            return x
        },
        channelHeaderOpened() {
            return this.$store.state.channel.channelOpened
        },
        showLonely: {
            get() {
                if (this.channelHeaderOpened) return false
                if (this.feed.length === 0) {
                    this.hideLonely = false
                    return true
                }
                if (!this.hideLonely) return true
                return false
            },
            set(value) {
                return value
            }
        },
        updateTopics() {
            if (this.channelHeaderOpened) {
                const channelPosts = this.posts.filter(post => post.owner === this.getChannelData.id)
                return Post.aggregateTopics(channelPosts)
            }

            return Post.aggregateTopics(this.feed)
        },
        filteredItems() {
            var filter = this.currentFilter
            if (this.channelHeaderOpened) {
                let sortedPosts = this.posts.filter(post => post.owner === this.getChannelData.id)
                if (filter)
                    return sortedPosts.filter(item => {
                        if (item.topics) return item.topics.indexOf(filter) !== -1 || item.platform.indexOf(filter) !== -1
                    })
                return sortedPosts
            }
            if (!filter) return this.feed
            return this.feed.filter(item => {
                if (item.topics) return item.topics.indexOf(filter) !== -1 || item.platform.indexOf(filter) !== -1
            })
        },
        getChannelData() {
            return this.$store.getters.getchannelData
        },
        showPosts() {
            return this.$store.state.showPosts
        }
    },
    watch: {
        channelHeaderOpened() {
            this.currentFilter = null
        },
        getChannelData() {
            this.currentFilter = null
        }
    }
}
</script>


<style lang="scss">
.hideFeed {
    opacity: 0;
    /* transition: 0 !important; */
}
.view_changer {
    position: absolute !important;
    right: 0;
}
#content_type_filter {
    margin-right: 20px;
    button {
        height: 29px;
    }
}
.content_filters {
    margin-right: 20px;
    height: 30px;
    float: left;
}
.topic_tag_bar {
    height: 31px;
    margin-bottom: 4px;
    // float: left;
    // flex-grow: 1;
}
.my-shuffle-container {
    transition: 500ms;
}

.list-complete {
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
}

.list-complete-item {
    transition: transform 170ms;
    transition-timing-function: cubic-bezier(0.42, 0, 0.58, 1);

    /*   display: inline-block;
      margin-right: 10px; */
}

.list-complete-img {
    object-fit: cover;
    height: 100%;
    width: 100%;
}

.list-complete-enter, .list-complete-leave-to
        /* .list-complete-leave-active for <2.1.8 */
 {
    opacity: 0;
    transform: scale(0.2);
    /* transition-delay: 200ms; */
}

.list-complete-leave-active {
    position: absolute;
}

.list_slide {
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
}

.list_slide_item {
    transition: transform 170ms;
    transition-timing-function: cubic-bezier(0.42, 0, 0.58, 1);

    /*   display: inline-block;
      margin-right: 10px; */
}

.list_slide_img {
    object-fit: cover;
    height: 100%;
    width: 100%;
}

.list_slide-enter, .list_slide-leave-to
        /* .list-complete-leave-active for <2.1.8 */
 {
    opacity: 0;
    transform: translateY(20px);
    /* transition-delay: 200ms; */
}

.list_slide-leave-active {
    position: absolute;
}
</style>
