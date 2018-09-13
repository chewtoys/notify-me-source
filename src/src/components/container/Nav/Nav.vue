<template>
    <div class="container-fluid top">
        <div class="mobile_only mobile_nav">
            <router-link to="/">
                <div class="toplogo">notify</div>
                <!-- <div class="logo_test"></div> -->
            </router-link>
        </div>
        <div class="topleft">
            <router-link to="/">
                <div class="mobile_hide">
                    <router-link to="/">
                        <!-- <div class="logo_test"></div> -->
                        <div class="toplogo">notify</div>
                    </router-link>
                </div>
            </router-link>
            <router-link to="/about">
                <div class="toplink">About</div>
            </router-link>
            <router-link to="/about#meet-the-team">
                <div class="toplink">Team</div>
            </router-link>
            <!-- <router-link to="/team">
                    <div class="toplink">Team</div>
                </router-link> -->
            <!-- <router-link to="/">
                    <div @click="notathingyet" class="toplink">Community</div>
                </router-link>
                <router-link to="/">
                    <div @click="notathingyet" class="toplink">Jobs</div>
                </router-link> -->
        </div>
        <div v-if="userLogged" class="topright">
            <router-link to="/subscriptions">
                <div class="toplink"><i class="fas fa-rocket"></i> Launch</div>
            </router-link>
            <a @click="logout">
                <div class="toplink"><i class="fas fa-sign-out-alt"></i> Logout</div>
            </a>
        </div>
        <div v-else class="topright">
            <router-link to="/login">
                <div class="toplink">Login</div>
            </router-link>
            <router-link to="/create">
                <div class="toplink">Create Account</div>
            </router-link>
        </div>
    </div>
</template>


<script>
import Account from '@/core/account.core'

export default {
	data() {
		return {}
	},

	methods: {
		notathingyet() {
			alert('link not enabled yet')
		},
		logout() {
			Account.logout()
				.then(() => {
					this.$root.$emit('alert', 'success', 'Successfully logged out!')
					this.$router.push('/login')
				})
				.catch(() => {
					this.$root.$emit('alert', 'error', `Couldn't log out, check your connection. (or check console & report to Jamie)`)
				})
		}
	},
	computed: {
		userLogged() {
			return this.$store.getters.isAuthenticated
		}
	}
}
</script>

<style scoped>
.top {
	padding: 20px 35px;
}

.topright a {
	cursor: pointer;
}
.topleft {
	width: 400px;
}
</style>
