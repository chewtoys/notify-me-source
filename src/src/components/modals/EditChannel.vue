<template>
    <div>

        <div class="modal-header">
            <span class="title">Edit Channel</span>
            <div class="close"></div>
        </div>

        <div class="modal_content">

            <div class="personal-info">

                <Username :currentUsername="editChannelData.username"></Username>

                <TextField :value.sync="editChannelData.displayName" label="Display Name"/>

                <div class="form-group">

                    <div class="topic_adder">
                        <label>Topics</label>
                        <div id="editTopicsContainer">
                            <div id="editTopics"></div>
                        </div>
                        <div class="results editTopicsResults">
                            <div v-for="i in topicSearchResults" :key="i.id">
                                <div @click="addTopic(i.topic)" class="result">{{ i.topic }}</div>
                            </div>
                        </div>
                    </div>

                </div>

                <TextField :value.sync="editChannelData.bio" label="Bio"/>
                <TextField :value.sync="editChannelData.avatar" label="Avatar"
                           small="* We don't have an image uploader yet so for now just paste a link to an image."/>

                <TextField :value.sync="editChannelData.location" label="Location"/>


                <div class="form-group">
                    <label class="-md-3 control-label"></label>
                    <div class="-md-8">
                        <input @click="saveChannel" type="button" class="coolbtn mr" value="Save Changes">

                    </div>
                </div>
                <br />
                <br />
                <br />
                
            </div>

        </div>
    </div>
</template>

<script>
import topics from '@/core/topics.js'
import Username from '@/components/FormFields/username'

import Channel from '@/core/channel.core.js'

import TextField from '@/components/FormFields/TextField'

export default {
    components: {
        Username,
        TextField
    },
    data() {
        return {
            editChannelData: {},
            //idk if we're even using this lol
            userNameIsFine: false,
            superEditChannel: false
        }
    },
    created() {
        // this.initTopicForm('editTopics', this.$store.getters.getTopicsForChannel || [])
        this.$root.$on('superEditChannel', () => {
            this.superEditChannel = true
        })
        if (this.superEditChannel) {
            this.editChannelData = Object.assign({}, this.$store.getters.getCurrentChannel)
        } else {
            this.editChannelData = Object.assign({}, this.$store.getters.getCurrentChannel)
        }
        console.log('Channel Data: ' + this.editChannelData)
    },
    methods: {
        saveChannel() {
            // if the username.vue component says we have a new username, set it locally
            const currentChannel = this.$store.getters.getCurrentChannel
            if (this.freeUsername) this.editChannelData.username = this.freeUsername
            if (this.freeUsername === currentChannel.username) {
                // username is unchanged, do nothing
            } else if (!this.freeUsername) {
                return this.throwError('Username unavalible!')
            }

            // var tags = this.taggle.getTags()
            // editChannelData.topics = tags.values

            // compare current channel data with new channel data to find which fields have been modified
            const fieldsChanged = {
                id: currentChannel.id
            }
            for (var i in this.editChannelData) {
                if (!Object.is(this.editChannelData[i], currentChannel[i])) {
                    fieldsChanged[i] = this.editChannelData[i]
                }
            }
            console.log(fieldsChanged)
            Channel.update(fieldsChanged)
                .then(res => {
                    this.$root.$emit('alert', 'success', 'Woop! Updated your channel successfully.')
                    this.$root.$emit('closeModal')
                })
                .catch(err => {
                    console.log(err)
                    this.$root.$emit('alert', 'error', 'You wanted to edit the channel, but computer said no.')
                })
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
.modal_container.EditChannel {
    width: 800px;
    height: 70vh;
}

.modal_container.EditChannel .modal_content {
    padding: 20px 60px 240px 60px;
    height: 100vh;
    overflow: scroll;
}
</style>
