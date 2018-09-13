<template>
    <div class="setting_content_inner">
		
		<div class="mobile_hide"><QuickSettings /></div>

        <h4 class="setting_title">Account Settings</h4>
        <div v-if="user.status === 'unverified'">
            <div class="alert alert-primary" role="alert">
                Your account is unverified, please check your email or <a>send again</a>
            </div>
        </div>

        <SettingAction button="Change Email" :title="user.email" heading="Email"/>
        <div class="actionButtons">
            <button @click.prevent="editPassword()" class="coolbtn left settingsbtn">Change Password</button>
            <button class="coolbtn purp left settingsbtn"><i class="fas fa-lock"></i> Enable Two-Factor</button>
        </div>

        <div class="passwordForm" v-if="showEditPassword">
            <div class="form-group">
                <input v-model="password.oldPassword" type="password" class="form-control" id="oldPassword"
                       placeholder="Old Password">
            </div>
            <div class="form-group">
                <input v-model="password.newPassword" type="password" class="form-control" id="password"
                       placeholder="Password">
            </div>
            <div class="form-group">
                <input v-model="password.newPasswordMatch" type="password" class="form-control" id="passwordMatch"
                       placeholder="Password Again">
            </div>
            <button @click.prevent="submitNewPassword()" class="coolbtn right ml">Submit</button>
            <button @click.prevent="editPassword()" class="coolbtn nomargin right ">Cancel</button>
        </div>

        <br/>

        <div class="account_info">
            <div class="setting_item_heading">Account Info</div>

            <div class="info_item"><span class="label">Account ID: </span>{{user.id}}</div>
            <div class="info_item"><span class="label">Account Status: </span>
                <span v-if="user.status === 'dev'">Developer (Superuser)</span>
                <span v-else-if="user.status === 'active'">Active (Email Verified)</span>
                <span v-else>{{user.status}}</span>
            </div>
            <div class="info_item"><span class="label">Account Creation Date: </span>{{user.createdAt}}</div>
        </div>

        <button class="coolbtn settingsbtn">Deactivate Account</button>


    </div>
</template>
<script>
// Change Password
// Delete Account
// Change Email
// Two-Factor

// Account Info
// Account ID
// Account Status
// Account Creation Date
import QuickSettings from '@/components/modals/settings/QuickSettings'

import Account from '@/core/account.core'
import Settings from '@/core/settings.core'

import SettingToggle from '@/components/modals/settings/SettingToggle'
import SettingAction from '@/components/modals/settings/SettingAction'

export default {
	components: {
		SettingAction,
		SettingToggle,
		QuickSettings
	},
	data() {
		return {
			showEditPassword: false,
			password: {
				oldPassword: '',
				newPassword: '',
				newPasswordMatch: ''
			}
		}
	},
	mounted() {
		// console.log('LRVJOERNBV', this.$store.getters.getSettings)
	},
	methods: {
		editPassword() {
			this.showEditPassword = !this.showEditPassword
		},
		submitNewPassword() {
			if (this.password.newPassword === this.password.newPasswordMatch) {
				Account.changePassword({
					oldPassword: this.password.oldPassword,
					newPassword: this.password.newPassword
				})
					.then(res => {
						this.$root.$emit('alert', 'success', 'Password changed!')
						this.editPassword()
					})
					.catch(e => {
						this.$root.$emit('alert', 'error', 'Failed to change password!')
					})
			} else {
				this.$root.$emit('alert', 'error', 'passwords no match silly')
			}
		}
	},
	computed: {
		user() {
			return this.$store.getters.getUser
		}
	}
}
</script>


<style>
.actionButtons {
	display: block;
	height: 60px;
}

.passwordForm {
	padding: 10px;
	border-radius: 5px;
	-webkit-box-shadow: 0 1px 2px #97979757;
	box-shadow: 0 1px 3px #86868657;
	height: 245px;
}

.passwordForm input,
.passwordForm input:focus {
	border: 1px solid #f4f4f4;
	color: rgb(75, 75, 75);
	padding: 10px 17px;
}

.passwordForm input::placeholder {
	color: rgb(207, 207, 207);
}

.coolbtn.settingsbtn {
	margin-right: 10px;
}

.settingsbtn .fas {
	font-size: 13px;
	margin-right: 5px;
	margin-top: -1px;
	opacity: 0.5;
}

.account_info {
	display: block;
	margin-bottom: 30px;
}

.setting_item_heading {
	margin-bottom: 5px;
}

.info_item {
	line-height: 19px;
	font-size: 12px;
}

.info_item .label {
	opacity: 0.3;
}
</style>
