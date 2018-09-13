<template>
    <div>
        <!-- Alerts -->
        <alerts ref="alert"/>

        <transition name="slideup">
            <div v-if="bottomAlert" style="background: none !important;" class="dark floating_bottom_left">
                <div class="alert alert-primary" role="alert">
                    <div @click="hideBottomAlert()" class="dismiss_button"><i class="fa fa-times"></i></div>
                    Welcome to Notify Alpha. You'll probably find a lot of bugs. So there's that. <br/> 
					<a href="#" @click="jeff">Find out more.</a>
                </div>
            </div>
        </transition>

        <!-- <p>{{ profile }}</p> -->

        <div id="app">

            <Modal/>
            <Player/>
            <!-- <confirm /> -->
            <dialogs-wrapper/>

            <router-view/>

        </div>


    </div>
</template>


<script>
import router from '@/router'
import { server } from '@/main'

import Alerts from '@/components/alerts'
import Modal from '@/components/modals/modal'
import Player from '@/components/modals/player'

import * as api from '@/core/api'

import Cookies from 'js-cookie'
import { setInterval } from 'timers'

export default {
    name: 'app',
    components: {
        Alerts,
        Modal,
        Player
    },
    data() {
        return {
            profile: '',
            bottomAlert: false
        }
    },
    created() {
        if (window.innerWidth >= 750) {
        }
    },
    mounted() {
        this.theme()

        const bottomAlert = localStorage.getItem('bottomAlert')
        if (!bottomAlert) this.bottomAlert = true

        // if with less than 750px then add mobile meta tag for accurate viewport

        //console.log('JEJEFGRORWG', window.innerWidth)

        // keep heroku free tier alive
        // setInterval(() => {
        // 	api.search('all_work_no_play')
        // }, 50000)
    },
    computed: {
        // Connection error handler
        waiting() {
            return this.$store.state.globalWaitingForServer
        },
        connectionError() {
            return this.$store.state.connectionError
        },
        darkTheme() {
            return this.$store.getters.getSettings.DARK_MODE
        }
    },
    watch: {
        darkTheme() {
            this.theme()
        },
        // Connection error handler
        connectionError: function(e, olde) {
            if (this.$store.state.connectionError) {
                this.$root.$emit('alert', 'error', e)
                this.$store.state.connectionError = false
            }
        }
    },
    methods: {
        hideBottomAlert() {
            localStorage.setItem('bottomAlert', 'hidden')
            this.bottomAlert = false
        },
        jeff() {
            // this.$router.push('/about')
        }
    },
    created() {
        // Data Handler: saves data objects from VueX store to local browser storage and optionally submits patch to server
        // usage: this.$root.$emit('update', 'channel', 'server')
        this.$root.$on('update', (location, method) => {
            var storeData = this.$store.state[location]

            // save locally

            if (storeData) {
                // this.$root.$localStorage.set(location, JSON.stringify(storeData))
                this.saveData(location, JSON.stringify(storeData))
                this.console('SAVED: ' + location)
            } else {
                console.error('Error: Tried to save: ' + location + ', but the store value returned undefined')
            }
            // send to server DEPRECIATED... remove eventually but find dependencies first
            if (method === 'server') {
                server
                    .patch(location, storeData)
                    .then(response => {
                        this.console('Saved to server')
                        this.console(response)
                        this.$root.$emit('alert', 'success', 'Saved!')
                    })
                    .catch(e => {
                        this.$root.$emit('alert', 'error', 'Failed to save data to server, try again')
                    })
            }
            // PATCH REQUEST
            if (method === 'server') {
                server
                    .patch(location, storeData)
                    .then(response => {
                        this.console('Saved to server')
                        this.console(response)
                        this.$root.$emit('alert', 'success', 'Saved!')
                    })
                    .catch(e => {
                        this.$root.$emit('alert', 'error', 'Failed to save data to server, try again')
                    })
            }
        })
        // this.$root.$on('create', (location, method) => {
        //     // add support for each data object from store
        //     if (location === "channel") { var storeData = this.$store.state.channel }
        //     // send to server
        //     server.post(location, storeData)
        //     .then(response => {
        //       this.$root.$emit('alert', 'success', 'Created ' + location + '!')
        //     })
        //     .catch(e => {
        //     this.$root.$emit('alert', 'error', 'Failed to save data to server, try again')
        //     })
        // })

        // FUNCTION EVENT LISTENERS
        this.$root.$on('alert', (type, message) => {
            if (type === 'success') {
                this.$refs.alert.success(message)
            } else if (type === 'error') {
                this.$refs.alert.error(message)
            } else if (type === 'info') {
                this.$refs.alert.info(message)
            }
        })
    }
}
</script>


<style>
/* .yt,
.linkDetector .YouTube {
	background: url('assets/img/yt.svg');
}

.twitter .linkDetector .Twitter {
	background: url('assets/img/twitter.svg');
}

.twitch,
.linkDetector .Twitch {
	background: url('assets/img/twitch.svg');
}

.instagram,
.icon .instagram,
.linkDetector .Instagram {
	background: url('assets/img/instagram.svg');
}

.soundcloud,
.icon .soundcloud,
.linkDetector .Soundcloud {
	background: url('assets/img/soundcloud.svg');
}



.twitter,
.Twitter {
	background: url('assets/img/twitter.svg');
}

 */

/* .dark .verified_tick {
        background: url('assets/img/verified_dark.svg');
    } */
.verified_tick {
    background: url('assets/img/verified_tick.svg');
}

.notify-icon {
    background: url('https://cdn.discordapp.com/attachments/453678030850752534/485859404512755743/notify_icon.png');
}
.notify-icon-dark {
    background: url('https://cdn.discordapp.com/attachments/453678030850752534/485859404512755743/notify_icon.png');
}
.youtube-icon {
    background: url('assets/img/yt.svg');
}
.twitter-icon {
    background: url('assets/img/twitter.svg');
}
.soundcloud-icon {
    background: url('assets/img/soundcloud.svg');
}
.instagram-icon {
    background: url('assets/img/instagram.svg');
}
.twitch-icon {
    background: url('assets/img/twitch.svg');
}
.reddit-icon {
    background: url('assets/img/reddit.svg');
}
.facebook-icon {
    background: url('assets/img/facebook.svg');
}
.spotify-icon {
    background: url('assets/img/spotify.svg');
}
.discord-icon {
    background: url('assets/img/discord.svg');
}
.github-icon {
    background: url('assets/img/github.svg');
}

.chrome-icon {
    background: url('assets/img/chrome.svg');
}

.firefox-icon {
    background: url('assets/img/firefox.svg');
}
.playstore-icon {
    background: url('assets/img/play.svg');
}

.applestore-icon {
    background: url('assets/img/apple.svg');
}
</style>


