<template>
    <div>
        <div class=" notified_info">
            <div class="info_items">
                <div class="info_item">
                    <div class="stat_number">{{content.length}}</div>
                    <div class="stat_label">LOVED</div>
                </div>
            </div>
            <div class="left " role="group">
                <button type="button" class="coolbtn borderless"><i class="fa fa-history"></i></button>
            </div>
        </div>
        <draggable
                v-model="content"
                :options="options"
                @start="drag='USER'"
                @end="drag=false"
        >
            <li v-for="(i, index) in content" :key="index" @mouseover="onDrag(i)" class="moveable">
                <User :sidebar="true" :hideRecent="true" :i="i"/>
                <div class="grabber"><i class="fa fa-bars"></i></div>
                <div class="remove_item"><i class="fa fa-times"></i></div>
            </li>
            <div v-if="content.length === 0" class="placeholder">drag items here</div>
        </draggable>

    </div>
</template>

<script>
import draggable from 'vuedraggable'

import User from '@/components/sidebar/user'

export default {
	components: {
		draggable,
		User
	},
	data() {
		return {
			options: {
				handle: '.grabber',
				animation: 80,
				preventOnFilter: false,
				group: {
					name: 'subscriptions',
					pull: 'move'
				}
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
				const columnData = this.$store.getters.getFavorites
				return columnData
			},
			set(value) {
				this.$store.commit('addColumnContent', {
					content: value,
					columnID: 2
				})
			}
		}
	}
}
</script>
