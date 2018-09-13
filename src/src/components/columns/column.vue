<template>
    <div>
        <div @mouseover="onDrag(i)" class="grabber grabber_float right"><i class="fa fa-bars"></i></div>

        <div class="column_header">
            <h4 class="title">{{i.title}}</h4>
            <p class="desc">{{i.description}}</p>
        </div>
        <div class="search">
            <div class="searchbox">
                <span class="rightbutton"></span>
                <input id="search"
                       placeholder="Search..."
                >
            </div>
        </div>
        <div class="sidebar_scroll">


            <ul class="subscriptions">

                <ColumnNotifiedList v-if="i.type === 'GETTING_NOTIFIED'"/>
                <ColumnFavorites v-if="i.type === 'FAVORITES'"/>
                <ColumnMuted v-if="i.type === 'MUTED'"/>

            </ul>
        </div>
    </div>
</template>

<script>
import ColumnNotifiedList from '@/components/columns/ColumnNotifiedList'
import ColumnFavorites from '@/components/columns/ColumnFavorites'
import ColumnMuted from '@/components/columns/ColumnMuted'

export default {
	components: {
		ColumnNotifiedList,
		ColumnFavorites,
		ColumnMuted
	},
	props: ['i'],
	methods: {
		onDrag(i) {
			if (!this.drag) this.$store.commit('draggedElementData', i)
		}
	},
	computed: {
		drag() {
			return this.$store.state.drag
		}
	}
}
</script>
<style>
</style>
