<template>
    <div v-shortkey="['esc']" @shortkey="closeSubscriptionManger" :class="{ 'open': subscriptionManagerOpened }"
         class="subscription_manager">
        <div ref="draggedElement" class="draggedElement" :class="{ 'column': drag === 'COLUMN'}">
            <User v-if="drag === 'USER'" :sidebar="true" :hideRecent="true" :i="draggedElementData"/>
            <Column v-if="drag === 'COLUMN'" :i="draggedElementData"/>
        </div>

        <ul class="subscription_manager_container">
            <draggable v-model="columns" :options="bigOptions" @start="drag='COLUMN'" @end="drag=false"
                       class="scroll-container">
                <li v-for="i in columns" :key="i.id" class="subscription_column sub_manager">
                    <Column :i="i"/>
                </li>

                <li class="create_column subscription_column sub_manager">
                    <button class="coolbtn big"><i class="fa fa-plus"></i></button>
                </li>
            </draggable>
        </ul>
    </div>
</template>
<script>
import * as methods from '@/utils/methods'

import Column from '@/components/columns/column'
import User from '@/components/sidebar/user'

import * as Channel from '@/core/channel.core'

// import Sortable from 'sortablejs'
import draggable from 'vuedraggable'
import { method } from 'bluebird'

export default {
    components: {
        Column,
        User,
        draggable
    },
    data() {
        return {
            mouse: {
                x: 0,
                y: 0
            },
            draggedElementHTML: null,
            bigOptions: {
                group: 'lists',
                handle: '.grabber',
                animation: 150
            }
        }
    },
    mounted() {
        const el = this.$refs.draggedElement
        // console.log(el)
        document.body.addEventListener(
            'dragover',
            event => {
                // console.log(`mouse is at X:${event.pageX} and Y:${event.pageY}`)
                // if (!this.drag) el.style.display = 'none'
                el.style.left = event.pageX + 'px'
                el.style.top = event.pageY + 'px'
            },
            true
        )
    },
    methods: {
        closeSubscriptionManger() {
            this.$store.commit('closeSubscriptionManager')
        }
    },
    watch: {
        drag() {
            // when this.drag (boolean) changes hide/show dragged element
            const el = this.$refs.draggedElement
            if (this.drag) {
                el.style.display = 'block'
                document.body.classList.add('moving')
            } else {
                el.style.display = 'none'
                document.body.classList.remove('moving')
            }
        }
    },
    computed: {
        subscriptionManagerOpened() {
            return this.$store.getters.subscriptionManagerOpened
        },
        draggedElementData() {
            return this.$store.state.draggedElementData
        },
        drag: {
            get() {
                return this.$store.state.drag
            },
            set(value) {
                this.$store.state.drag = value
            }
        },
        columns: {
            get() {
                // let columns = this.defaultColumns.concat(this.$store.state.user.customColumns)
                // let columns = [...this.defaultColumns, ...this.$store.state.user.customColumns]
                // let columnPositions = this.$store.state.user.columnPositions

                // if (columnPositions.length === 0) return columns

                // return methods.sortByIndexArray(columns, columnPositions)
                return this.$store.getters.getColumns
            },
            set(columns) {
                // only commit custom columns to store
                // this.$store.commit('columnPositions', columns.map(column => column.id))
                // this.$store.commit('customColumns', columns.filter(column => column.type === 'CUSTOM'))
                this.$store.commit('changeColumnPositions', columns)
            }
        },

        suggested: {
            get() {
                return this.$store.getters.getSuggested
            },
            set(value) {
                this.$store.commit('sortSuggested', value)
            }
        }
    }
}
</script>

<style lang="scss">
@keyframes shake {
    10%,
    90% {
        transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
        transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
        transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
        transform: translate3d(4px, 0, 0);
    }
}

.moving,
.moving * {
    cursor: move !important;
    cursor: grab !important;
    cursor: -moz-grab !important;
    cursor: -webkit-grab !important;
}

.draggedElement {
    position: absolute;
    z-index: 99999999;
    margin-left: -250px;
    margin-top: -20px;
    min-width: 269px;
    background: rgba(236, 236, 236, 0.918);
    width: 10px;
    height: 36px;
    border-radius: 5px;
    display: none;
    transform: rotate(4deg);

    pointer-events: none;
}

.dark .draggedElement {
    background: rgba(0, 0, 0, 0.562);
}

.create_column {
    display: flex;
    align-content: center center;
    width: 42px !important;
}

.create_column button {
    height: 100vh;
}

.draggedElement.column {
    transform: rotate(0);
    top: 34px !important;
    height: 100vh;
    transform: translateX(5px);
}

.notified_info {
    margin: 13px 15px 17px 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 37px;
}

.notified_info .coolbtn {
    margin-bottom: 0 !important;
}

.notified_info .btn-group {
    margin: 0 !important;
}

.subscription_manager .info_items {
    width: 130px;
    display: flex;
    margin-left: 10px;
}

.subscription_manager .info_item {
    width: 60px;
}

// .subscriptions li {
// 	height: 35px;
// 	list-style: none !important;
// 	margin: 5px 0;
// }
.placeholder {
    display: flex;
    width: 100%;
    /* text-align: center; */
    justify-content: center;
    margin: 20px 0;
    font-size: 14px;
    opacity: 0.3;
}

.sortable-ghost {
    /* background: #f8f8f8;
        border-radius: 5px;
        margin: 15px; */

    opacity: 0;
}

/* .sortable-ghost div {
        opacity: 0;
    } */
.sortable-chosen .result:hover {
    padding-left: 15px !important;
}

.moveable {
    position: relative;
}

.sortable-drag {
    opacity: 0;
    /* display: none; */
}

ul.subscriptions {
    padding-left: 0 !important;
}

.subscription_manager {
    position: absolute;
    width: 100%;
    height: 100vh;
    z-index: 99999;
    transition: 200ms;
    /* margin-top: -100%; */
    transition-timing-function: ease;
}

.subscription_manager .sidebar_scroll {
    margin-top: 50px;
    height: calc(100vh - 140px);
}

.subscription_manager .result:hover {
    padding-left: 15px;
}

.grabber,
.remove_item {
    width: 32px;
    height: 30px;
    float: right;
    padding-left: 6px;
    padding-top: 5px;
    opacity: 0;
    cursor: pointer;
}

.moveable:hover .grabber {
    opacity: 0.3;
}

// .dark .grabber,
// .dark .remove_item {
//     opacity: 0.3;
// }

.remove_item {
    position: absolute;
    right: 31px;
    top: 1px;
    opacity: 0 !important;
    cursor: pointer;
    transition: 300ms;
}

.subscription_manager .moveable:hover .remove_item {
    opacity: 0.3 !important;
}

.grabber_float {
    margin: 10px 5px;
    width: 100%;
    position: absolute;
    right: 0;
    z-index: 99999;
}

/* .subscription_manager.open {
        margin-top: 0 !important;
    } */
ul.subscription_manager_container {
    background: #fff;
    overflow: hidden;
    width: 100%;
    height: 100vh;
    padding: 0;
}

.dark .subscription_manager_container {
    background: rgb(24, 24, 24);
}

.subscription_column .moveable {
    /* background: #252525; */
}

li.subscription_column {
    float: left;
    width: 270px;
    position: static;
    /* transition: 200ms; */
    border-left: 1px solid #efefef;
    list-style: none;
    background: #fff;
    -webkit-transform: translateZ(0);
    flex: 0 0 auto;
}

li.subscription_column:last-child {
    border-right: 1px solid #efefef;
}

.subscription_manager .searchbox {
    width: 237px !important;
    padding: 10px !important;
    margin: 0px 0 0 16px !important;
    border-radius: 7px !important;
    box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.12), inset 0px 0px 0px 0px rgba(205, 205, 205, 0.5), inset 0px 1px 0px 0px rgba(255, 255, 255, 0.5) !important;
}

.dark .subscription_manager .searchbox,
.dark .leftsidebar.sub_manager .searchbox {
    box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.12), inset 0px 0px 0px 0px !important;
    border-right: 1px solid #181818 !important;
    border-bottom: 1px solid #181818 !important;
}

.dark .searchbox input::placeholder {
    color: #efefef;
}

.dark .subscription_column .searchbox {
    padding: 10px 12px 10px 12px !important;
}

.column_header {
    height: 93px;
    width: 270px;
    overflow: hidden;
    padding: 20px;
    font-size: 11px;
    // transition: 0.2s;
}

.column_header h4 {
    font-size: 14px;
    font-weight: bold;
}

.leftsidebar.sub_manager .column_header {
    width: 270px;
}

// .leftsidebar .column_header {
// 	opacity: 0;
// }
.column_header,
.leftsidebar.sub_manager .column_header {
    opacity: 0.6;
}

li.subscription_column:hover .column_header {
    opacity: 0.9;
}

.scroll-container {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
}
</style>
