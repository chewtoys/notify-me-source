<template>
	<div class="login_page">
		<Nav />
		<div class="container">
	
			<div class="login_box register margin-center">
				<div class="login_welcome">Create an Account!</div>
				
				<div class="login-container">
					<div class="dark alert alert-primary" role="alert">
	               Please Note: <br/>
				   - Accounts will be wiped before beta launch.<br />
				   - Email verifiication does <b>not</b> work yet.<br />
				   - There are still a high amount of bugs, be wary.<br />
	            </div>
					<form class="login" v-on:submit.prevent="auth">
						<div class="form-group">
							<input autofocus v-on:keyup="checkEmail" :class="{ 'has-error': emailError}" v-model="user.email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
							<span v-if="emailError" class="errorBlock">{{ emailError }}</span>
						</div>
						<div class="form-group ">
							<input v-on:keyup="checkPassword" :class="{ 'has-error': passwordError, 'availableUsername': okPassword }" v-model="user.password" type="password" class="form-control" id="password" placeholder="Password">
							<span v-if="passwordError" class="errorBlock">{{ passwordError }}</span>
						</div>
						<div class="form-group">
							<input @input="checkPasswordMatch" :class="{ 'has-error': passwordMatchError, 'availableUsername': okMatchPassword }" v-model="user.passwordMatch" type="password" class="form-control" id="passwordMatch" placeholder="Password Again">
							<span v-if="passwordMatchError" class="errorBlock">{{ passwordMatchError }}</span>
						</div>
						<!-- <div class="form-group form-check">
						<input type="checkbox" class="form-check-input" id="exampleCheck1">
						<label class="form-check-label" for="exampleCheck1">Check me out</label>
						</div> -->
						<div v-shortkey="['enter']" @shortkey="authCreate" @click="authCreate" class="btn btn-standard center">
							Create Account
						</div>
						<p class="subtext">Already got an account?
							<router-link to="/login" class="login_sublink">Log in!</router-link>
						</p>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import router from '@/router'
import { server } from '@/main'

import Account from '@/core/account.core'

import { Nav } from '@/components/container'

import Cookies from 'js-cookie'

import debounce from 'lodash/debounce'

import { emailRegex } from '@/assets/data'

export default {
	name: 'Register',
	components: {
		Nav
	},
	data() {
		return {
			user: {
				email: '',
				password: '',
				passwordMatch: ''
			},
			passwordError: false,
			okPassword: false,
			passwordMatchError: false,
			okMatchPassword: false,
			emailError: false
		}
	},
	mounted() {
		if (this.$store.getters.isAuthenticated) {
			this.$router.push('/subscriptions')
		}
	},
	methods: {
		checkPassword: debounce(function() {
			if (this.user.password.length < 8) {
				this.passwordError = 'Password must be longer than 8 characters!'
				this.okPassword = false
				return
			}
			this.passwordError = false
			this.okPassword = true
		}, 1000),
		checkPasswordMatch: debounce(function() {
			if (this.user.passwordMatch !== this.user.password) {
				this.passwordMatchError = 'Passwords do not match!'
				this.okMatchPassword = false
				return
			}
			this.passwordMatchError = false
			this.okMatchPassword = true
		}, 1000),
		checkEmail: debounce(function() {
			if (!this.user.email.match(emailRegex)) {
				return (this.emailError = `That doesn't look like an email :(`)
			}
			return (this.emailError = false)
		}, 1000),
		auth() {
			const { email, password } = this.user

			Account.login({
				email,
				password
			})
				.then(res => {
					this.$router.push('/subscriptions')
					console.log('look you... logging in like the big boy you are.')
					this.$root.$emit('alert', 'success', "Woooosh! You're logged in!")
				})
				.catch(e => {
					console.error(e)
					this.$root.$emit('alert', 'error', 'Oops, someone messed up.. me? you? who knows.')
				})
		},
		authCreate() {
			if (this.passwordError) return
			if (this.passwordMatchError) return

			if (this.password === this.passwordMatch) {
				Account.create({
					email: this.user.email,
					password: this.user.password
				})
					.then(res => {
						this.$root.$emit('alert', 'info', 'Account created!')
						this.auth()
					})
					.catch(e => {
						console.error(e)
						this.$root.$emit('alert', 'error', 'Oops, someone messed up.. me? you? who knows.')
					})
			} else {
				this.$root.$emit('alert', 'error', 'Passwords do not match!')
			}
		}
	}
}
</script>


<style lang="scss" scoped>
@import '../../../assets/css/responsive.scss';
.login-container .form-control.has-error {
	border-color: red !important;
}
.login_box.register {
	@media only screen and (min-height: $smallHeight) {
		& {
			margin-top: 30px !important;
		}
	}
}

.errorBlock {
	font-size: 11px;
	color: red;
}

.margin-center {
	margin-right: auto;
	margin-left: auto;
	float: none;
}

.login-container {
	padding: 20px;
}

.form-check-input {
	margin-left: 0;
}

.form-check-label {
	padding-left: 5px;
}
.login-container .alert-primary {
	margin-bottom: 30px;
}
</style>
