<template>

    <div id="username" class="username_field form-group">
        <label class="control-label">Username</label>

        <!-- <div v-if="requestStatus.waitingForServer" class="spinner form-spinner"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div> -->

        <div :class="{ 'has-error': usernameError, 'availableUsername': usernameFree }"
             class="input-group form-control">
            <div class="input-group-prepend">
                <div class="input-group-text">notify.me/</div>
            </div>

            <!-- <input v-if="newUser" type="text" class="form-control" v-on:change="checkUsername(newUsername)" v-model="newUsername"> -->
            <input type="text" @input="checkUsername" v-model="username">

        </div>
        <span v-if="usernameError" class="help-block">{{ usernameError }}</span>


    </div>

</template>

<script>
import { debounce } from 'lodash'

// import Channel from '@/core/channel.core'

import Channel from '@/core/channel.core'

export default {
    name: 'username',
    props: ['currentUsername'],
    data() {
        return {
            username: '',
            usernameError: false,
            usernameFree: false
        }
    },
    created() {
        // if the prop currentUsername is set, set the username to that, for use in editChannel modal
        if (this.currentUsername) {
            this.username = this.currentUsername
            this.$store.commit('freeUsername', this.username)
        }
    },
    computed: {
        requestStatus: function() {
            return this.$store.getters.getStatus
        }
    },
    methods: {
        validateUsername(x) {
            var regex = /^[a-zA-Z0-9.\-_$@*!]{3,30}$/
            if (x.match(regex)) return true
            return false
        },
        checkUsername: debounce(async function() {
            // reset error message (avoid timing conflict)
            this.usernameError = false
            // verify REGEX before sending to store
            if (this.validateUsername(this.username)) {
                // Dispatch username check request to store
                Channel.checkUsername(this.username).then(res => {
                    // if username is taken
                    if (res.exists) {
                        this.usernameError = 'Username taken!'
                        this.usernameFree = false
                        this.$store.commit('freeUsername', false)
                    }
                    // if username is free
                    if (!res.exists) {
                        this.usernameFree = true
                        this.usernameError = false
                        this.$store.commit('freeUsername', this.username)
                    }
                    // if username is unchanged
                    if (this.currentUsername === this.username) {
                        this.$store.commit('freeUsername', this.username)
                        this.usernameFree = false
                        this.usernameError = false
                    }
                })
            } else {
                // handle REGEX failure
                this.usernameFree = false
                this.usernameError = 'Invalid Username'
                this.$store.commit('freeUsername', false)
            }
        }, 400)
    }
}
</script>
