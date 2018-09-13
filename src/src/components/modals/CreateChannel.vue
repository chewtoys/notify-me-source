<template>
    <div>

        <div class="modal-header">
            <span class="title">Create New Channel</span>
            <div class="close"></div>
        </div>

        <div class="modal_content">

            <div class="alert alert-primary" role="alert">
                We're currently in Alpha, for now you must link to your avatar. We're working to add image uploading. <a
                    href="#">Find out more.</a>
            </div>

            <!-- edit form column -->
            <div>

                <form class="form-horizontal" role="form">


                    <Username></Username>


                    <div id="displayName" class="form-group">
                        <label class="control-label">Display Name</label>
                        <input type="text" class="form-control" maxlength="30" v-model="newchannel.displayName">
                        <!-- <span class="help-block">{{ displayNameMessage }}</span> -->
                    </div>


                    <div class="form-group">
                        <label class=" lg-3 control-label">Avatar:</label>
                        <div class=" lg-8">
                            <input v-model="newchannel.avatar" class="form-control" type="text" placeholder="https://i.imgur.com/GNvZkdn.jpg" >
                            <!-- <input class="form-control" type="text" placeholder="Disabled for security reasons" disabled readonly> -->
                            <small class="small_text">
                                * We don't have an image uploader yet so for now just paste a link to an image.
                            </small>
                        </div>
                    </div>
                    <!-- <div class="form-group">
                      <label class=" lg-3 control-label">Location:</label>
                      <div class=" lg-8">
                        <input v-model="newchannel.location" class="form-control" type="text" value="">
                      </div>
                    </div> -->

                    <!-- <div class="form-group">
                      <label class=" lg-3 control-label">Time Zone:</label>
                      <div class=" lg-8">
                        <div class="ui-select">
                          <select id="user_time_zone" class="form-control">
                            <option value="Hawaii">(GMT-10:00) Hawaii</option>
                            <option value="Alaska">(GMT-09:00) Alaska</option>
                            <option value="Pacific Time (US &amp; Canada)">(GMT-08:00) Pacific Time (US &amp; Canada)</option>
                            <option value="Arizona">(GMT-07:00) Arizona</option>
                            <option value="Mountain Time (US &amp; Canada)">(GMT-07:00) Mountain Time (US &amp; Canada)</option>
                            <option value="Central Time (US &amp; Canada)" selected="selected">(GMT-06:00) Central Time (US &amp; Canada)</option>
                            <option value="Eastern Time (US &amp; Canada)">(GMT-05:00) Eastern Time (US &amp; Canada)</option>
                            <option value="Indiana (East)">(GMT-05:00) Indiana (East)</option>
                          </select>
                        </div>
                      </div>
                    </div> -->


                    <div class="form-group actionslol">
                        <label class=" md-3 control-label"></label>
                        <div class=" md-8">
                            <input @click="createChannel" type="button" class="coolbtn coolbtn-save mr"
                                   value="Save Changes">
                            <span></span>
                            <input @click="close()" type="reset" class="coolbtn mr" value="Cancel">
                        </div>
                    </div>
                </form>

            </div>

        </div>

    </div>
</template>

<script>
// import { server } from '@/main.js'
import Username from '@/components/FormFields/username'

import Channel from '@/core/channel.core.js'

export default {
    components: {
        Username
    },
    data() {
        return {
            newchannel: {
                username: this.$store.state.newUsername,
                displayName: null,
                avatar: null,
                location: '',
                bio: ''
            }
        }
    },
    mounted() {},
    methods: {
        async createChannel() {
            // Prevents form from continuing if we have a validation error.
            if (!this.freeUsername) {
                this.throwError('Invalid Username')
                return false
            }

            // modify newchannel object with external data
            this.newchannel.ownerID = this.$store.getters.getUserID
            this.newchannel.username = this.freeUsername

            if (this.newchannel.avatar === null) this.newchannel.avatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlK-CycysHbJHbCLuqJJblfJVdEvGPX6WLnFcXblH-pi61Y7_q'

            Channel.create(this.newchannel)
                .then(res => {
                    this.$root.$emit('alert', 'success', 'Created new channel @' + this.newchannel.username + '!')
                    Channel.switch(this.newchannel.id).then(res => {
                        this.$root.$emit('closeModal')
                    })
                })
                .catch(e => {
                    this.$root.$emit('alert', 'error', 'Failed to create channel.' + e.data.error.error)
                })
        },
        close() {
            this.$parent.close()
        }
    },
    computed: {
        freeUsername() {
            return this.$store.getters.freeUsername
        }
    }
}
</script>

<style>
/* .modal_container.NewNotification {
    width: 600px;
} */

.small_text {
    margin-top: 5px;
    line-height: 11px;
    color: #bbbbbb;
    font-size: 11px;
}

.actionslol {
    margin-bottom: -10px;
}
</style>
