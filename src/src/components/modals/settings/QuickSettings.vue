<template>
<div>
    <h4 class="setting_title">Quick Settings</h4>
		<div class="quick_settings">
			
			<div :class="{ 'on': darkTheme }" class="setting_box tooltip_enabled" @click="darkModeToggle">
				<div class="setting_box_icon"><i class="fa fa-lightbulb" /></div>
				<div class="cool_tooltip">Dark theme</div>
			</div>
			<div :class="{ 'on': !noNotifications }" class="setting_box tooltip_enabled" @click="noNotificationsToggle">
				<div class="setting_box_icon"><i class="fa fa-moon" /></div>
				<div v-if="!noNotifications" class="cool_tooltip">Notifications are on</div>
				<div v-else class="cool_tooltip">Notifications are off</div>
			</div>
			<div :class="{ 'on': !noAnimations }" class="setting_box tooltip_enabled" @click="noAnimationsToggle">
				<div class="setting_box_icon"><i class="fa fa-magic" /></div>
				<div v-if="!noAnimations" class="cool_tooltip">Animations are on</div>
				<div v-else class="cool_tooltip">Animations are off</div>
			</div>
			<div class="setting_box tooltip_enabled">
				<div class="setting_box_icon"><i class="fa fa-link" /></div>
				<div class="cool_tooltip">Quick preview default</div>
			</div>
			<!-- <div class="setting_box tooltip_enabled">
				<div class="setting_box_icon"><i class="fa fa-dollar-sign" /></div>
				<div class="cool_tooltip">Accept tips</div>
			</div> -->
			<div v-if="isSuperUser" :class="{ 'on': devMode }" class="setting_box tooltip_enabled" @click="devModeToggle">
				<div class="setting_box_icon"><i class="fa fa-code" /></div>
				<div class="cool_tooltip">Dev mode</div>
			</div>
			
		</div>
</div>
    
</template>

<script>
import Settings from '@/core/settings.core'
import Account from '@/core/account.core'

export default {
    data() {
        return {
            darkTheme: this.$store.getters.getSettings.DARK_MODE || false,
            noNotifications: this.$store.getters.getSettings.NO_NOTIFICATIONS || false,
            noAnimations: this.$store.getters.getSettings.NO_ANIMATIONS || false,
            devMode: this.$store.getters.getSettings.DEV_MODE || false
        }
    },
    methods: {
        darkModeToggle() {
            this.darkTheme = !this.darkTheme

            Account.updateSettings({ DARK_MODE: this.darkTheme }).catch(() => {
                this.$root.$emit('alert', 'error', 'Failed to switch Theme. Your theme will change back to light mode when you refresh')
            })
        },
        noNotificationsToggle() {
            this.noNotifications = !this.noNotifications
            Account.updateSettings({ NO_NOTIFICATIONS: this.noNotifications }).then(() => {
                if (this.noNotifications) this.$root.$emit('alert', 'success', 'Ahhh peace and quiet. Notifications are off!')
                else this.$root.$emit('alert', 'info', 'Notifications are back on!')
            })
        },
        noAnimationsToggle() {
            this.noAnimations = !this.noAnimations
            Account.updateSettings({ NO_ANIMATIONS: this.noAnimations })
        },
        devModeToggle() {
            this.devMode = !this.devMode
            Account.updateSettings({ DEV_MODE: this.devMode })
        }
    }
}
</script>
