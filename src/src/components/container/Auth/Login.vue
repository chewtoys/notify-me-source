<template>
	<div class="login_page">
		<Nav />
		<div class="container">
			<div class="login_box margin-center">
				<div class="login_welcome">Welcome back!</div>
				<div class="login-container">
					<form class="login" v-on:submit.prevent="auth">
						<div class="form-group">
							<input
								autofocus v-model="user.email"
								type="email"
								:class="{ 'form-control': true, 'error': loginFailed }"
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								placeholder="Enter email"
							>
						</div>
						<div class="form-group">
							<input
								v-model="user.password"
								type="password"
								:class="{ 'form-control': true, 'error': loginFailed }"
								id="exampleInputPassword1"
								placeholder="Password"
							>
						</div>
						<!-- <div class="form-group form-check">
						<input type="checkbox" class="form-check-input" id="exampleCheck1">
						<label class="form-check-label" for="exampleCheck1">Check me out</label>
						</div> -->
						<div
							:class="{ 'buttonWaiting': loginWaiting }"
							v-shortkey="['enter']"
							@shortkey="auth"
							@click="auth"
							class="btn btn-standard center"
						>
							Login
						</div>
						<p class="subtext">
							Don't have an account?
							<router-link to="/create" href="#" class="login_sublink">Create One Now!</router-link>
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

export default {
    name: 'Login',
    components: {
        Nav
    },
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            loginWaiting: false,
            loginFailed: false
        }
    },
    mounted() {
        if (this.$store.getters.isAuthenticated) {
            this.$router.push('/subscriptions')
        }
    },
    methods: {
        auth() {
            const { email, password } = this.user
            if (email === '' || password === '') {
                this.$root.$emit('alert', 'error', 'Hey Buddy - All fields are required!')
                return (this.loginFailed = true)
            }

            this.loginFailed = false
            this.loginWaiting = true
            Account.login({ email, password })
                .then(res => {
                    this.loginWaiting = false
                    this.$router.push('/subscriptions')
                    console.log('look you... logging in like the big boy you are.')
                    this.$root.$emit('alert', 'success', "Woooosh! You're logged in!")
                })
                .catch(e => {
                    this.loginFailed = true
                    this.loginWaiting = false
                    this.$root.$emit('alert', 'error', e.data.error.message)
                })
        },
        authCreate() {
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
                    this.$root.$emit('alert', 'error', `Failed to create account. Error: ${e.data.error}`)
                })
        }
    }
}
</script>


<style scoped lang="scss">
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

.error {
    border: 1px solid rgb(255, 79, 79);
}
</style>
