<template>
    <div @click="link(i)" class="result tooltip_enabled">
        <div v-if="i.avatar" v-bind:style="{ 'background-image': 'url(' + i.avatar + ')' }" class="avatar"></div>
        <div v-else v-bind:style="{ 'background-image': 'url(' + defaultAvatar() + ')' }" class="avatar"></div>
        <div class="meta">
            <div class="display_name">{{ trimmedString(i.displayName, 20) }}</div>
            <span v-if="i.verified === 'true'" class="verified verified_tick"></span>
        </div>
        <div class="cool_tooltip">
            <div class="display_name">{{ trimmedString(i.displayName, 20) }}</div>
            <span v-if="i.verified === 'true'" class="verified verified_tick"></span>
        </div>
        <!-- <div v-if="i.postCount > 1 && !hideRecent" class="right activity">{{ i.postCount }}</div> -->
        <!-- <span class="tooltip" :class="{active: $store.state.sidebarClosed}">{{ i.displayName }} {{ i.postCount > 0 ? i.postCount : 0 }}</span> -->
    </div>
</template>

<script>
import Post from '@/core/post.core'

export default {
    props: ['i', 'sidebar', 'hideRecent'],
    methods: {
        link(channel) {
            // if (this.sidebar) this.openChannelSidebar(channel)
            // else this.openChannel(channel)
            if (this.subscriptionManagerOpened) this.openChannelSidebar(channel)
            else this.openChannel(channel)
        },
        openChannel(channel) {
            // get previous channel, used to avoid repeat API calls
            const previousChannel = this.$store.getters.getChannelSidebarID
            // commit new channel data to store
            this.$store.commit('updateCurrentlyViewingChannel', channel)
            // open the header wtf when did i delete this lol move to store plz thank
            this.$store.state.channel.channelOpened = true
            // filters the posts from the feed and commits them to the channelPosts object
            // this.$store.commit('filterChannelPosts', channel.id)

            this.$router.push({ path: `/channel/${channel.username}` })
            this.$root.$emit('updateProp', channel.username)

            Post.getPostsByCreatorFromServer(previousChannel, channel).catch(e => {
                this.$root.$emit('alert', 'error', `Could not load users posts.. ${e}`)
            })
        },
        openChannelSidebar(channel) {
            this.$store.commit('updateCurrentlyViewingChannel', channel)
            this.$store.state.channel.channelSidebarOpened = true
        }
    },
    computed: {
        subscriptionManagerOpened() {
            return this.$store.getters.subscriptionManagerOpened
        }
    }
}
</script>
