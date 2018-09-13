<template>
    <div>

        <div class="modal-header">
            <span class="title">Switch Channel</span>
            <div class="close"></div>
        </div>

        <div class="modal_content">

            <div v-for="i in channels" :key="i.id">
                <a href="#" @click="switchChannel(i.id)">
                    <div class="channelBox">
                        <div v-bind:style="{ 'background-image': 'url(' + i.avatar + ')' }" class="avatar"></div>
                        <div class="meta">
                            <div class="displayName">{{ i.displayName }}</div>
                            <div class="username">@{{ i.username }}</div>
                        </div>
                    </div>
                </a>
            </div>
            <button class="coolbtn createButton" @click="createChannel">Create New Channel</button>
        </div>

    </div>
</template>

<script>
import Channel from '@/core/channel.core.js'

export default {
    methods: {
        switchChannel(channelID) {
            console.log(channelID)
            Channel.switch(channelID).then(res => {
                this.$root.$emit('alert', 'success', 'Switched to @' + this.$store.getters.getCurrentChannel.username + '!')
                this.$root.$emit('closeModal')
            })
        },
        createChannel() {
            this.$root.$emit('modal', 'CreateChannel')
        }
    },
    computed: {
        channels() {
            return this.$store.getters.getUserChannels
        }
    }
}
</script>


<style>
.modal_container.SwitchChannel {
    width: 350px;
    overflow: scroll !important;
    height: 70vh;
}

.channelBox {
    padding: 9px 12px;
    /* border: 1px solid #efefef; */
    border-radius: 5px;
    background: none;
    float: left;
    width: 100%;
}

.createButton {
    margin: 20px 0px -6px 0px;
    width: 100%;
    padding: 13px;
    font-size: 14px;
}

.channelBox .avatar {
    width: 40px;
    height: 40px;
}

a:hover .channelBox {
    background: #f8f8f8;
}
</style>
