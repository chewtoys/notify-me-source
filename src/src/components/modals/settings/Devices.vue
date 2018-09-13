<template>
    <div class="setting_content_inner">
        <h4 class="setting_title">My Devices</h4>

        <div class="alert alert-primary" role="alert">
            This section is under construction. You'll be able to revoke devices and toggle notifications for those
            devices. It'll also look way more attractive.
        </div>


        <div v-for="d in devices" :key="d.id">
            <div class="setting_section">
                <div class="setting_information">
                    <div class="setting_item_heading">{{ hideIP(d.lastIP) }}</div>
                    <div class="setting_item_title">{{d.id}}</div>
                    <div class="setting_desc">{{d.userAgent}}</div>
                    <div v-if="!d.pushNotificationToken" class="setting_desc">Notifications Not Enabled</div>
                    <div v-if="d.pushNotificationToken" class="setting_desc">Notifications Enabled</div>
                </div>
                <div class="setting_toggle">
                    <input :checked="d.pushNotificationToken" class="toggle" type="checkbox"/>

                </div>
            </div>
        </div>


    </div>
</template>
<script>
import Settings from '@/core/settings.core'
import Account from '@/core/account.core'

import SettingToggle from '@/components/modals/settings/SettingToggle'
import SettingAction from '@/components/modals/settings/SettingAction'

export default {
	components: {
		SettingToggle,
		SettingAction
	},
	mounted() {
		Account.getDevices()
			.then(devices => {
				console.log(devices)
				this.devices = devices
			})
			.catch(e => {
				this.$root.$emit('alert', 'error', e)
			})
	},
	data() {
		return {
			devices: null
		}
	},
	methods: {
		hideIP(ip) {
			return ip.slice(0, 2) + '.XXX.XXX.XXX'
		}
	},

	watch: {
		// devices() {
		// 	this.notifiedDevices = this.devices.filter()
		// }
	}
}
</script>
