<template>
    <div>
        <div class="modal-header">
            <span class="title">Transfer Channel</span>
            <div class="close" @click="close"></div>
        </div>

        <div class="modal_content">
            <div>
                <form class="form-horizontal" role="form">
                    <div id="new-owner" class="form-group">
                        <label class="control-label">New Channel Owner</label>
                        <input type="number" class="form-control" maxlength="30" v-model="newOwner">
                    </div>
                    <div class="form-group actionslol">
                        <label class=" md-3 control-label"></label>
                        <div class=" md-8">
                            <input @click.prevent="changeOwner" type="button" class="coolbtn coolbtn-save mr"
                                   value="Change Owner">
                            <span></span>
                            <input @click="close" type="reset" class="coolbtn mr" value="Cancel">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Channel from '@/core/channel.core.js'

export default {
    data() {
        return {
            newOwner: 0
        }
    },
    mounted() {},
    methods: {
        changeOwner() {
            Channel.transfer(this.newOwner, this.channel.id)
                .then(res => {
                    this.$root.$emit('alert', 'success', res.data.message)
                    this.$root.$emit('closeModal')
                })
                .catch(err => {
                    console.log('Error', err)
                    this.$root.$emit('alert', 'error', err.data.error)
                })
        },
        close() {
            this.$root.$emit('closeModal')
        }
    },
    computed: {
        channel() {
            return this.$store.getters.getChannelData
        }
    }
}
</script>

<style>
.modal_container.TransferChannel {
    width: 600px;
}

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
