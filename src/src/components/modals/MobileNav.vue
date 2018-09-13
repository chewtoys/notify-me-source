<template>
    <div class="mobile_nav">

        <div class="mobile_nav_header">
            <div @click="$root.$emit('closeModal')" class="mobile_close_button">Close</div>
            <div class="mobile_nav_title">My Notify</div>
        </div>
    
        <div class="modal_content">
    
            <div v-if="userHasChannel === true" class="dropdown_header">
                <div @click="$root.$emit('modal', 'SwitchChannel')" class="switch_button"><button class="coolbtn borderless"><i class="fa fa-sync-alt"/></button></div>
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
        </div>
    
        <div class="modal_content">
    
            <QuickSettings />
        </div>
    
        <div class="modal_content">
            <h4 class="setting_title">Main Settings</h4>
        </div>
    
        <div class="mobile_nav_list">
    
            <a v-if="userHasChannel === true" class="sidebar_navitem" href="#"><i class="fa fa-user"></i> <span>My Channel</span></a>
            <a v-else class="sidebar_navitem" href="#"><i class="fa fa-plus"></i> <span>Create Channel</span></a>
            <a class="sidebar_navitem" href="#"><i class="fa fa-align-justify"></i> <span>Subscription Manager</span></a>
            <a class="sidebar_navitem buy_tips" href="#"><i class="fa fa-dollar-sign"></i> <span>Buy Tips</span></a>
    
        </div>

        <div class="mobile_nav_list">
            <a @click="$root.$emit('modal', 'Settings')" class="sidebar_navitem" href="#"><i class="fa fa-cog"></i> <span>Settings</span></a>

            <a @click.prevent='logout' class="sidebar_navitem" href="#"><i class="fa fa-sign-out-alt"></i> <span>Log Out</span></a>
    
        </div>
    
    
    </div>
</template>

<script>
import QuickSettings from '@/components/modals/settings/QuickSettings'
export default {
    components: {
        QuickSettings
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
        }
    }
}
</script>
