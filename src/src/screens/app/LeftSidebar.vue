<template>

    <div :class="{'sub_manager': subscriptionManagerOpened}" class="leftsidebar">
        <!-- <button v-if="sidebarOpen" @click="closeSidebar(true)" type="button" class="coolbtn borderless collapseicon"><i class="fas fa-times"></i></button> -->

        <div class="column_header">
            <h4 class="title">Subscription Manager</h4>
            <p class="desc">Use this bad boy to manage your subscriptions.</p>
        </div>

		<!-- <div v-if="this.devmode" class="topleftlogo logo_test " /> -->
        
		<Search2
                v-model="query"
                :query="query"
                @clear-query="clearQuery"
                @search-bar="searchBar"
                @focus-up="focusUp"
        />

        <div class="sidebar_scroll">

            <div class="sidebar_padding sort_buttons">
                <button v-if="!searchOverlay" @click="closeSidebar(false)" type="button"
                        class="coolbtn borderless searchicon"><i class="fas fa-search"></i></button>
                <!-- <button v-if="searchOverlay" @click="toggleSearchOverlay" type="button" class="coolbtn borderless searchicon"><i class="fas fa-times"></i></button> -->

                <!-- SORT BUTTONS -->
                <div class=" left sortbuttons" role="group" aria-label="Basic example">
                    <button v-if="!subscriptionManagerOpened" @click="openSubscriptionManger()" type="button"
                            class="coolbtn borderless"><i class="fas fa-grip-vertical"></i></button>
                    <button v-if="subscriptionManagerOpened" @click="openSubscriptionManger()" type="button"
                            class="coolbtn borderless"><i class="fas fa-times"></i></button>
					<router-link to="/subscriptions"><button type="button"  class="coolbtn borderless mobile_only"><i class="fas fa-bell"></i></button></router-link>
					<router-link to="/discover"><button type="button"  class="coolbtn borderless mobile_only"><i class="fas fa-eye"></i></button></router-link>
                </div>

                <div class=" right sortbuttons" role="group" aria-label="Basic example">
                    <button type="button" class="coolbtn   borderless"><i class="far fa-clock"></i></button>
                    <button type="button" class="coolbtn borderless"><i class="far fa-heart"></i></button>
                    <button type="button" class="coolbtn borderless"><i class="fa fa-sort-alpha-up"></i></button>
                    <button type="button" class="coolbtn borderless"><i class="fa fa-list"></i></button>
                </div>
            </div>

            <div v-if="searching" class="sidebar_content">

                <ul class="subscriptions">


                    <div v-for="(i, index) in searchResults" :key="index">
                        <li>
                            <User :i="i"/>
                        </li>
                    </div>
                    <div v-if="!searchResults && !waiting">
                        <p class="no-results-found">No results found!</p>
                    </div>
                </ul>
                <div v-if="waiting" class="spinner center">
                    <div class="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>

            </div>
            <div v-else class="sidebar_content">


                <!-- SUBSCRIBED CHANNELS -->
                <div class="sidebar_padding nav-heading">
                    <div class="left">SUBSCRIPTIONS</div>
                    <div class="right">
                        <div class="mini_info"><span>0</span>
                            <div class="mini_text">/DAY</div>
                        </div>
                        <div class="mini_info"><span>{{subscriptions.length}}</span>
                            <div class="mini_text">TOTAL</div>
                        </div>
                    </div>
                </div>

                <ul class="subscriptions" id="sortable_ul">
                    <li v-for="(i, index) in subscriptions" :key="index">
                        <User :i="i"/>
                    </li>
                </ul>
                <!-- END SUBSCRIBED CHANNELS -->

                <!-- SUGGESTED CHANNELS -->
                <!-- <div class="sidebar_padding nav-heading">
                    <div class="left">SUGGESTED CREATORS</div>
                </div>
                <ul  class="subscriptions">
                    <div v-for="i in suggested" :key="i.id">
                       <li><User :i="i"/></li>
                    </div>

                    <br/><br/><br/><br/>
                </ul> -->
                <!-- END SUGGESTED CHANNELS -->


            </div>
        </div>
        <div class="sidebar_footer">
            <div v-if="sidebarOpen">
                <div @click="closeSidebar(true)" class="open_sidebar coolbtn borderless"><i
                        class="fa fa-angle-left"></i></div>
            </div>
            <div v-else>
                <div @click="closeSidebar(false)" class="open_sidebar coolbtn borderless"><i
                        class="fa fa-angle-right"></i></div>
            </div>
			<div class="mobile_dash">
				<!-- <button v-if="userHasChannel === true" class="coolbtn borderless" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	                <div v-bind:style="{ 'background-image': 'url(' + $store.getters.getCurrentChannel.avatar + ')' }" class="avatar"></div>
	            </button> -->
				<button @click="openMobileNav" class="coolbtn borderless" type="button" id="dropdownMenuButton">
	            <i class="fa fa-cog"></i>
				</button>
			</div>
        </div>
    </div>



</template>


<script>
// import { server } from '@/main.js'
import { randomBytes } from 'crypto'
import { debounce } from 'lodash'
import * as methods from '@/utils/methods'
import Channel from '@/core/channel.core'
import * as Search from '@/core/search.core'
import Post from '@/core/post.core'
import { setTimeout } from 'timers'

import User from '@/components/sidebar/user'

import Sortable from 'sortablejs'
import { watch } from 'fs'

import Search2 from '@/components/search2'

export default {
    components: {
        User,
        Search2
    },
    data() {
        return {
            query: '',
            showHeading: false
        }
    },
    mounted() {
        // var list = document.getElementById('sortable_ul')
        // var sortable = new Sortable(list, { animation: 150, delay: 50 })
    },
    methods: {
        clearQuery() {
            this.query = ''
        },
        searchBar() {
            let query = this.query

            if (query.length === 0) return

            Search.init(query).then(res => {
                // do nothing lol
            })
        },
        focusUp() {
            setTimeout(() => {
                this.focus = false
            }, 300)
        },
        openSubscriptionManger() {
            this.$store.commit('subscriptionManagerToggle')
            // if (subscriptionManagerOpened) this.$store.state.sidebarClosed = false
        },
        closeSidebar(x) {
            this.$store.state.sidebarClosed = x
        },
        toggleSearchOverlay() {
            this.$store.commit('toggleSearchOverlay')
        },
        openMobileNav() {
            this.$root.$emit('modal', 'MobileNav')
        }
        // sortByCategory() {
        //     this.subscriptions.sort((a, b) => {
        //         return a.
        //     })
        // }
    },
    computed: {
        subscriptions: {
            get() {
                return this.$store.getters.getSubscriptions
            },
            set(value) {
                return value
            }
        },
        suggested() {
            return this.$store.getters.getSuggested
        },
        searching() {
            return this.query.length > 0
        },
        searchOverlay() {
            return this.$store.state.searchOverlay
        },
        waiting() {
            return this.$store.state.searchWaiting
        },
        searchResults() {
            return this.$store.state.searchResults
        },
        isHeaderOpen() {
            return this.$store.getters.channelOpened
        },
        subscriptionManagerOpened() {
            return this.$store.getters.subscriptionManagerOpened
        },
        sidebarOpen() {
            if (this.$store.state.sidebarClosed === false) {
                document.getElementById('search').focus()
                return true
            }
            return false
        }
    }
}
</script>


<style lang="scss">
@import '../../assets/css/responsive.scss';
@import '../../assets/css/colors.scss';

.topleftlogo {
    height: 20px !important;
    margin: 17px 21px;
}
/* ----------------------------------------------
     * Generated by Animista on 2018-7-27 12:23:30
     * w: http://animista.net, t: @cssanimista
     * ---------------------------------------------- */

/**
     * ----------------------------------------
     * animation vibrate-1
     * ----------------------------------------
     */
@keyframes vibrate {
    0% {
        transform: translate(0);
    }
    20% {
        transform: translate(-2px, 2px);
    }
    40% {
        transform: translate(-2px, -2px);
    }
    60% {
        transform: translate(2px, 2px);
    }
    80% {
        transform: translate(2px, -2px);
    }
    100% {
        transform: translate(0);
    }
}

.leftsidebar {
    float: left;
    width: 270px;
    // height: 100vh;
    margin-top: -93px;
}
.dark .leftsidebar {
    background: $backgroundDark !important;
}

.searchbox {
    transition: 200ms;
    .fas {
        position: absolute;
        right: 22px;
        top: 16px;
        opacity: 0.2;
    }
}

// .searchbox input {
// 	margin-left: 44px !important;
// }
.searchicon {
    padding: 9px 10px 0 10px;
    margin-bottom: 18px;
    display: none;
}

.leftsidebar.sub_manager {
    margin-top: 0;
}

.leftsidebar.sub_manager .searchbox {
    width: 239px;
    padding: 10px !important;
    margin: 0px 0 0 16px;
    border-radius: 7px;
    box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.12), inset 0px 0px 0px 0px rgba(205, 205, 205, 0.5), inset 0px 1px 0px 0px rgba(255, 255, 255, 0.5) !important;
}

.leftsidebar ul {
    padding: 0 !important;
}

.collapseicon {
    position: absolute;
    z-index: 999999;
    margin-left: 14px;
    margin-top: 7px;
    opacity: 0.3;
}

.leftsidebar.sub_manager .collapseicon {
    margin-left: 224px;
}

.sidebar_scroll::-webkit-scrollbar {
    display: none;
    width: 0px; /* remove scrollbar space */
    background: transparent; /* optional: just make scrollbar invisible */
}

.sidebar_content {
    padding: 5px 0;
    padding-bottom: 50px;
}

.sidebar_padding {
    padding: 0 15px;
}

.subscriptions {
    float: left;
    width: 100%;
    margin-top: 5px;
    margin-bottom: 0px;
}

.no-results-found {
    text-align: center;
    margin-top: 30px;
    color: #a7a7a7;
}

.sortbuttons .coolbtn {
    padding: 5px 11px !important;
    width: 36px;
}
</style>
