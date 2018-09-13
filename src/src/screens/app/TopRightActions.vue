<template>
	<div>
	
		<!-- <div v-if="userHasChannel" class="top-right-actions">Has Channel</div>
		        <div v-else class="top-right-actions">No Channel</div> -->
	
		<div class="topactions">
			<!-- ******************** 
				*** ACTION BUTTONS
				************************* -->
			<div class="dropdown float-left ml-2 dropdown_slideup">
				<button class="coolbtn float-left borderless create-button mr" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-history"></i></button>
				<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
					<div class="container">
						<div class="dropdown_heading">
							<h5>Notification History</h5>
						</div>

					</div>
				</div>
			</div>
	
	
			<button v-if="userHasChannel === true" @click.prevent="createNotification" class="coolbtn borderless float-left create-button"><i class="fa fa-plus"></i></button>
	
	
	
			<!-- ******************** 
				*** ACCOUNT DROPDOWN
				************************* -->
			<div class="dropdown float-left ml-2 dropdown_slideup">
	
				<button v-if="userHasChannel === true" class="coolbtn borderless dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		                <div v-bind:style="{ 'background-image': 'url(' + channel.avatar + ')' }" class="avatar"></div>
		                <!-- <span>@{{ channel.username }}</span> -->
		            </button>
	
				<button v-else class="coolbtn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		                <span>{{ user.email }}</span>
		            </button>
	
				<!-- ******************** 
					*** DROPDOWN MENU
					************************* -->
				<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
	
					<div v-if="userHasChannel === true" class="dropdown_header">
						<div :style="{ 'background-image': 'url(' + channel.avatar + ')' }" class="avatar"></div>
						<div class="profile_meta">
							<div class="name username"><span>notify.me/</span>{{ channel.username }}</div>
							<div class="email">{{ user.email }}</div>
						</div>
						<div class="dropdown-divider"></div>
					</div>
	
					<div v-if="userHasChannel === false" class="dropdown_header">
						<div class="avatar"></div>
						<div class="profile_meta">
							<div class="name username"><span>How you doin</span></div>
							<div class="email">{{ user.email }}</div>
						</div>
						<div class="dropdown-divider"></div>
					</div>
	
	
					<a v-if="!userHasChannel" @click.prevent='createChannel' class="dropdown-item" href="#"><i
		                            class="fa fa-user"></i>Create Channel</a>
					<div v-if="userHasChannel">
						<a @click.prevent='openMyChannel' class="dropdown-item" href="#"><i class="fa fa-tv"></i> My
		                            Channel</a>
						<a @click.prevent='editChannel' class="dropdown-item" href="#"><i class="fa fa-user-edit"></i>
		                            Edit Channel</a>
						<a @click.prevent='switchChannel' class="dropdown-item" href="#"><i class="fa fa-sync-alt"></i>
		                            Switch Channel</a>
					</div>
	
					<div class="dropdown-divider"></div>
					<a @click="toggleSubscriptionManager" class="dropdown-item" href="#"><i
		                            class="fa fa-align-justify"></i> Subscription Manager</a>
					<div class="dropdown-divider"></div>
					<a class="dropdown-item buy_tips" href="#"><i class="fa fa-dollar-sign"></i> Buy Tips</a>
					<div class="dropdown-divider"></div>
					<a @click.prevent="openSettings" class="dropdown-item" href="#"> <i class="fa fa-cog" /> Settings</a>
					<!-- <a @click.prevent='darkTheme' class="dropdown-item" href="#"><i class="fa fa-moon"></i> Dark Theme</a> -->
					<div class="dropdown-divider"></div>
					<a @click.prevent='home' class="dropdown-item" href="#"><i class="fa fa-home" /> Landing Page</a>
					<a @click.prevent='logout' class="dropdown-item" href="#"><i class="fas fa-sign-out-alt" /> Logout
					</a>
				</div>
			</div>
		</div>
	
	</div>
</template>

<script>
import Account from '@/core/account.core'
import { setTimeout } from 'timers'

import Settings from '@/core/settings.core'

export default {
    methods: {
        darkTheme() {
            console.log('changing theme')
            Settings.darkTheme()
                .then(() => {
                    this.$root.$emit('alert', 'success', 'Successfully changed theme!')
                })
                .catch(e => {
                    this.$root.$emit('alert', 'error', 'Failed to switch Theme.')
                })
        },
        openChannel() {
            this.$store.state.channel.channelSidebarOpened = false
            this.$store.state.channel.channelOpened = !this.$store.state.channel.channelOpened
        },
        openSettings() {
            this.$root.$emit('modal', 'Settings')
        },
        openMyChannel() {
            this.$store.commit('updateCurrentlyViewingChannel', this.$store.getters.getCurrentChannel)
            this.$router.push({
                path: `/channel/${this.$store.getters.getCurrentChannel.username}`
            })
            this.$store.state.channel.channelOpened = true
        },
        toggleSubscriptionManager() {
            this.$store.commit('subscriptionManagerToggle')
        }
    },
    computed: {
        user() {
            return this.$store.getters.getUser
        },
        userHasChannel() {
            return this.$store.getters.userHasChannel
        },
        channel() {
            return this.$store.getters.getCurrentChannel
        },
        channelSidebarOpened() {
            return this.$store.state.channel.channelSidebarOpened
        }
    }
}
</script>

<style scoped>
.topactions {
    position: absolute;
    right: 6px;
    top: 2px;
    z-index: 99999;
    height: 48px;
    border-radius: 5px;
    padding: 5px 8px;
}
</style>
