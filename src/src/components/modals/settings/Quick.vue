<template>
    <div class="setting_content_inner">
        <h4 class="setting_title">Quick Settings</h4>
        <SettingToggle icon="lightbulb" :value.sync="darkTheme" title="Enable dark theme"
                       desc="If it were up to me, this would be on by default. But alas, it is up to you kind sir. Press it, you know you want to."/>
        <SettingToggle icon="moon" title="Silence all notifications"
                       desc="Need some quiet time? We got you. You won't recieve any notifications when this switch is on."/>

    </div>
</template>
<script>
import Settings from '@/core/settings.core'

import SettingToggle from '@/components/modals/settings/SettingToggle'
import SettingAction from '@/components/modals/settings/SettingAction'

export default {
	components: {
		SettingToggle,
		SettingAction
	},
	data() {
		return {
			darkTheme: this.$store.getters.darkTheme
		}
	},
	methods: {
		switchToDarkTheme() {
			Settings.darkTheme(this.darkTheme)
				.then(() => {
					this.$root.$emit('alert', 'success', 'Successfully changed theme!')
				})
				.catch(e => {
					this.$root.$emit('alert', 'error', 'Failed to switch Theme.')
				})
		}
	},

	watch: {
		darkTheme() {
			this.switchToDarkTheme()
		}
	}
}
</script>
