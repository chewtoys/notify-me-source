<template>
    <div>

        <div class="modal_content">

            <div class="modal_sidebar">
                <div class="modal_sidebar_heading">Account Settings</div>
                <!-- <a @click.prevent="changeTab('quick')" :class="{ 'active': isTab('quick') }" class="sidebar_navitem"
                   href="#"><i class="fa fa-star"></i> Quick Settings</a> -->
                <a @click.prevent="changeTab('account_settings')" :class="{ 'active': isTab('account_settings') }"
                   class="sidebar_navitem" href="#"><i class="fa fa-tachometer-alt"></i> Dashboard</a>
                <a @click.prevent="changeTab('privacy')" :class="{ 'active': isTab('privacy') }" class="sidebar_navitem"
                   href="#"><i class="fa fa-eye"></i> Privacy</a>
                <!-- <a @click.prevent="changeTab('payment')" :class="{ 'active': isTab('payment') }" class="sidebar_navitem"
                   href="#"><i class="fa fa-credit-card"></i> Payment</a> -->
                <a @click.prevent="changeTab('devices')" :class="{ 'active': isTab('devices') }" class="sidebar_navitem"
                   href="#"><i class="fa fa-mobile-alt"></i> My Devices</a>
                <a @click.prevent="changeTab('notification_settings')"
                   :class="{ 'active': isTab('notification_settings') }" class="sidebar_navitem" href="#"><i
                        class="fa fa-bell"></i> Notification Settings</a>

                <div class="modal_sidebar_heading">Channel Settings</div>
                <a @click.prevent="changeTab('channels')" :class="{ 'active': isTab('channels') }"
                   class="sidebar_navitem" href="#"><i class="fa fa-tv"></i> My Channels</a>


                <div class="modal_sidebar_heading">App Settings</div>
                <a @click.prevent="changeTab('appearance')" :class="{ 'active': isTab('appearance') }"
                   class="sidebar_navitem" href="#"><i class="fa fa-palette"></i> Appearance</a>
                <a @click.prevent="changeTab('keybinds')" :class="{ 'active': isTab('keybinds') }"
                   class="sidebar_navitem" href="#"><i class="fa fa-keyboard"></i> Keybinds</a>
                <!-- <a @click.prevent="changeTab('language')" :class="{ 'active': isTab('language') }" class="sidebar_navitem" href="#"><i class="fa fa-globe-asia"></i>  Language</a> -->

                <div class="modal_sidebar_heading"></div>
                <a @click.prevent="changeTab('changelog')" :class="{ 'active': isTab('changelog') }"
                   class="sidebar_navitem" href="#"><i class="fa fa-clipboard-list"></i> Changelog</a>

            <a v-if="isSuperUser" @click.prevent="changeTab('adminmenu')" :class="{ 'active': isTab('adminmenu') }" class="" href="#"> <div class="absolute_bottom_left"><i class="fa fa-toolbox" /></div> </a>
            </div>

            <div class="setting_content">

                <transition name="quickfade">
                    <div v-if="tab === 'quick'">
                        <Quick/>
                    </div>
                </transition>
                
                <transition name="quickfade">
                    <div v-if="tab === 'adminmenu'">
                        <AdminMenu/>
                    </div>
                </transition>

                <transition name="quickfade">
                    <div v-if="tab === 'account_settings'">
                        <AccountSettings/>
                    </div>
                </transition>

                <transition name="quickfade">
                    <div v-if="tab === 'privacy'">
                        <Privacy/>
                    </div>
                </transition>

                <transition name="quickfade">
                    <div v-if="tab === 'payment'">
                        <div class="setting_content_inner">
                            <h4 class="setting_title">Payment Settings</h4>
                        </div>
                    </div>
                </transition>

                <transition name="quickfade">
                    <div v-if="tab === 'devices'">
                        <Devices/>
                    </div>
                </transition>

                <transition name="quickfade">
                    <div v-if="tab === 'appearance'">
                        <Appearance/>
                    </div>
                </transition>

                <transition name="quickfade">
                    <div v-if="tab === 'changelog'">
                        <ChangeLog/>
                    </div>
                </transition>


            </div>

        </div>
    </div>
</template>

<script>
// import topics from '@/core/topics.js'
import Username from '@/components/FormFields/username'

import Channel from '@/core/channel.core.js'

// import PerfectScrollbar from 'perfect-scrollbar'

import TextField from '@/components/FormFields/TextField'
import { setTimeout } from 'timers'

import AccountSettings from '@/components/modals/settings/AccountSettings'
import Privacy from '@/components/modals/settings/Privacy'
import Appearance from '@/components/modals/settings/Appearance'
import Devices from '@/components/modals/settings/Devices'
import Quick from '@/components/modals/settings/Quick'
import ChangeLog from '@/components/modals/settings/ChangeLog'
import AdminMenu from '@/components/modals/settings/AdminMenu'

export default {
    components: {
        Username,
        TextField,
        AccountSettings,
        Privacy,
        Appearance,
        Quick,
        Devices,
        ChangeLog,
        AdminMenu
    },
    data() {
        return {
            tab: 'account_settings'
        }
    },
    mounted() {
        // const ps = new PerfectScrollbar('.setting_content')
    },
    methods: {
        changeTab(tab) {
            // if (this.$store.getters.unsavedChanges) this.shake
            this.tab = ''
            setTimeout(() => {
                this.tab = tab
            }, 100)
        },
        isTab(tab) {
            if (this.tab === tab) return true
            return false
        }
    },
    computed: {
        getChannel() {
            return this.$store.getters.getCurrentChannel
        }
    }
}
</script>

<style>
</style>
