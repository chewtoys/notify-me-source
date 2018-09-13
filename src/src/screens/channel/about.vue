<template>
    <div class="page  channel_container">
    
        
    
        <!-- <p>{{channel}}</p> -->
        {{channel.bio || 'Channel has no bio :('}}<br/><br/>

        <h4 style="margin-bottom:10px;">Categories</h4>
        <!-- <div id="filters-group" class="filters-group">
            <div id="topic_tag_bar" class="topic_tag_bar filter-options">
                <div v-for="(i, index) in testlol" :key="index">
                    <button :id="i.toLowerCase()" class="coolbtn left topic_tag">
                        <TopicText :i="i" />
                    </button>
                </div>
            </div>
        </div> -->
        <CategoryEditor :categories="channel.topics" :ownerChannel="channel" />
    
        <small>
    			
    			Date Joined:<b> [ date here ] </b><br/>
    			Location:<b> {{channel.location || 'Unknown'}} </b><br/>
    			</small>
    
        <div v-if="this.isSuperUser">
            <h2 class="heading">Admin Stuff</h2>
            <small>
    			Account Owner: <b>134</b><br/>
    			Channel ID: <b>{{channel.id}}</b><br/>
    			Also owns:<b> <a href="#"> @billy</a>, <a href="#">@bacon</a></b><br/>
    			 <a href="#"><i class="fa fa-history"></i> View Channel History</a><br/>
    			 <a href="#"><i class="fa fa-flag"></i> Reports</a>
    			</small>
            <h3>Actions:</h3>
            <button class="tooltip_enabled coolbtn mr tooltip_relative"><i class="fa fa-frown"></i> <span class="cool_tooltip tbottom">Warn</span></button>
            <button class="tooltip_enabled coolbtn mr tooltip_relative"><i class="fa fa-frown-open"></i><span class="cool_tooltip tbottom">Suspend</span> </button>
            <button class="tooltip_enabled coolbtn mr tooltip_relative" @click.prevent="deleteChannel"><i class="fa fa-sad-cry"></i><span class="cool_tooltip tbottom">Delete</span> </button>
            <button class="tooltip_enabled coolbtn mr tooltip_relative"><i class="fa fa-eye"></i><span class="cool_tooltip tbottom">View As Owner</span> </button>
            <button class="tooltip_enabled coolbtn mr tooltip_relative" @click.prevent="TransferChannel()"><i class="fa fa-sync-alt"></i><span class="cool_tooltip tbottom">Transfer Channel</span></button>
            <button class="tooltip_enabled coolbtn mr tooltip_relative" :class="(channel.verified === 'true') ? 'betterbtn' : '' " @click.prevent="toggleVerify()"><i class="fa fa-star"></i><span class="cool_tooltip tbottom">Verify</span> </button>
        </div>
    
    </div>
</template>

<script>
import * as api from '@/core/api'
import TopicText from '@/components/TopicText'
import CategoryEditor from '@/components/FormFields/CategoryEditor'

export default {
    props: ['username'],
    components: {
        TopicText,
        CategoryEditor
    },
    data() {
        return {
            adminInfo: {},
            testlol: ['categories', 'go', 'here']
        }
    },
    mounted() {
        if (this.isSuperUser) {
            api.getChannelInfo
        }
        if (this.username) this.loadChannel(this.username)
        console.log(this.channel.verified)
    },
    methods: {
        /**
         * Toggle the channels verification statys
         */
        toggleVerify() {
            if (this.channel.verified === 'false') {
                api.verifyChannel(this.channel.username).then(() => {
                    this.$root.$emit('alert', 'success', `@${this.channel.username} is now verified!`)
                    this.channel.verified = 'true'
                })
            } else if (this.channel.verified === 'true') {
                api.unVerifyChannel(this.channel.username).then(() => {
                    this.$root.$emit('alert', 'success', `@${this.channel.username} is now unverified!`)
                    this.channel.verified = 'false'
                })
            }
        },
        /**
         * Open the transfer channel modal
         */
        TransferChannel() {
            this.$root.$emit('modal', 'TransferChannel')
        },
        /**
         * Delete the channel
         */
        async deleteChannel() {
            if (await confirm('Are you sure you want to delete this channel?', 'This is permanent')) {
                Channel.delete(this.channelSidebar.id)
                    .then(res => {
                        this.$root.$emit('alert', 'success', 'Channel deleted!')
                        this.$store.state.channel.channelOpened = false
                        this.$router.push({ path: `/subscriptions` })
                    })
                    .catch(e => {
                        this.$root.$emit('alert', 'error', 'Failed to delete channel!')
                    })
            }
        }
    },
    computed: {
        channel() {
            return this.$store.getters.getChannelData
        }
    }
}
</script>

<style lang="scss">
</style>
