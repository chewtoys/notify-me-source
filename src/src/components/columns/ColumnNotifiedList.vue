<template>
    <div>
        <div class=" notified_info">
            <div class="info_items">
                <div class="info_item">
                    <div class="stat_number">{{content.length}}</div>
                    <div class="stat_label">PER DAY</div>
                </div>
                <div class="info_item">
                    <div class="stat_number">0</div>
                    <div class="stat_label">TODAY</div>
                </div>
            </div>
            <div class="left " role="group">
                <button type="button" class="coolbtn borderless"><i class="far fa-bell"></i></button>
                <button type="button" class="coolbtn borderless"><i class="fa fa-history"></i></button>
            </div>
        </div>
        <draggable v-model="content" :options="options" @start="drag='USER'" @end="drag=false">
            <li v-for="(i, index) in content" :key="index" @mouseover="onDrag(i)" class="moveable">
                <User :sidebar="true" :hideRecent="true" :i="i" />
                <div id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <div class="grabber"><i class="fa fa-ellipsis-v"></i></div>
                </div>
                <!-- <DropdownChannel :channel="i"/> -->
                <!-- <div class="remove_item"><i class="fa fa-times"></i></div> -->
            </li>
            <div v-if="content.length === 0" class="placeholder">drag items here</div>
    
        </draggable>
    
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import Channel from '@/core/channel.core'

import DropdownChannel from '@/components/dropdowns/DropdownChannel'
import User from '@/components/sidebar/user'

export default {
    components: {
        draggable,
        User,
        DropdownChannel
    },
    data() {
        return {
            options: {
                // handle: '.grabber',
                animation: 80,
                preventOnFilter: false,
                group: {
                    name: 'subscriptions',
                    pull: 'clone'
                },
                identicalCheck: []
            }
        }
    },
    methods: {
        onDrag(data) {
            // only change the drag data if we're currently dragging
            if (!this.drag) this.$store.commit('draggedElementData', data)
        }
    },
    computed: {
        drag: {
            get() {
                return this.$store.state.drag
            },
            set(value) {
                this.$store.commit('drag', value)
            }
        },
        content: {
            get() {
                // console.log('store: ', this.$store.getters.getNotified)
                const columnData = this.$store.getters.getNotified
                this.identicalCheck = columnData
                return columnData
            },
            set(value) {
                this.$store.commit('addColumnContent', {
                    content: value,
                    columnID: 1,
                    removeFromColumns: [3]
                })
                //fixed by KociQQ in twitch chat, turns out you CAN compare the length of two things to determin if something has been added or removed. Magic.
                if (this.identicalCheck.length !== value.length)
                    Channel.unmute(this.$store.state.draggedElementData.id)
                        .then(res => {
                            // this.$root.$emit('alert', 'success', 'Muted channel!')
                        })
                        .catch(e => {
                            this.$root.$emit('alert', 'error', 'Failed to unmute channel')
                        })
            }
        }
    }
}
</script>
