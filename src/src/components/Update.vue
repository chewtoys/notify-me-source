<template>
    <figure :class="'platform_' + i.platform" class="update">
        <div class="update_inner">
            <div class="update_top">
                <div class="right">
                    <div class="dropdown">
                        <div class="dropdown-toggle-ellipsis" id="dropdownMenuButton" data-toggle="dropdown"
                             aria-haspopup="true" aria-expanded="false">
                            <i class="fa fa-ellipsis-v"></i>
                        </div>
                        <DropdownUpdate :i='i'/>
                    </div>
                </div>
                <div @click="openChannel(i.channel)" class="creator_meta">
                    <div v-bind:style="{ 'background-image': 'url(' + i.channel.avatar + ')' }"
                         class="creator_avatar avatar"></div>
                    <div class="creator_name">{{ trimmedString(i.channel.displayName, 15) }}</div>
                    <div class="post_time"> </div>
                </div>
            </div>
            <a @click="openInfo(i)" >
                <div class="thumbnail_container">
                    <!-- <a :href="i.link" target="blank"> -->

                    <div v-if="i.platform !== 'unknown' && i.platform !== 'youtube'" class="thumbicon icon " :class="i.platform.toLowerCase() + '-icon'"></div>

                    <!-- <div v-if="i.platform == 'Instagram'" class="thumbicon icon instagram"></div>
                    <div v-if="i.platform == 'Soundcloud'" class="thumbicon icon soundcloud"></div> -->
                    <!-- <div v-if="i.platform == 'Soundcloud'" class="thumbicon icon soundcloud"></div> -->

                    <div v-if="i.duration" class="duration">{{convertDuration(i.duration)}}</div>
                    <div class="update_thumb">

                        <!-- <div class="thumb_img" v-if="i.thumbnail.medium"
                             :style="{ 'background-image': 'url(' + i.thumbnail.medium.url + ')' }"></div> -->
                        <div class="thumb_img mobile_hide" :style="{ 'background-image': 'url(' + i.thumbnail + ')' }"></div>

						<div class="mobile_only thumb_img">
							<img :src="i.thumbnail"/>
						</div>
                    </div>

                </div>
                <!-- <div class="right">
                    <div class="dropdown">
                        <div class="dropdown-toggle-ellipsis" id="dropdownMenuButton" data-toggle="dropdown"
                             aria-haspopup="true" aria-expanded="false">
                            <i class="fa fa-ellipsis-v"></i>
                        </div>
                        <DropdownUpdate :i='i'/>
                    </div>
                </div> -->
                <div class="update_title"> {{ trimmedString(i.title, 55) }}</div>
                <small class="bottom_name creator_name">{{ niceTime(i.createdAt) }} • 0 Notified</small>
            </a>
            <a target="_blank" :href="i.link"><div class="more duration"><i class="fa fa-link"></i>
            <!-- <div>{{ trimmedString(i.link, 20) }}</div> -->
            </div></a>

        </div>
    </figure>
</template>


<script>
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

import Post from '@/core/post.core'

import DropdownUpdate from '@/components/dropdowns/DropdownUpdate'
import { method } from 'bluebird'
// import { setTimeout } from 'timers'

export default {
    components: {
        DropdownUpdate
    },
    props: ['i'],
    methods: {
        openInfo(i) {
            this.$root.$emit('player', 'MoreInfo')
            this.$store.commit('moreInfo', i)
        },

        convertDuration(duration) {
            if (duration === undefined) return null
            return moment.duration(duration, 'minutes').format()
            // return dur.format('HH:mm:ss', {trim: false})
        }
    }
}
</script>


<style lang="scss">
.creator_avatar {
    border: 1px solid #fff;
    box-shadow: 0px 0px 0px 2px #dddddd;
    margin: 2px 9px 6px 2px;
    transition: 300ms;
}

/* .Instagram .update_thumb img {
        height: 170px;
     }
     .Instagram .update_title {
         display: none;
     } */

.update_inner {
    position: relative;
}

// .creator_meta {
//     display: none;
// }
.bottom_name.creator_name {
    margin-top: 10px;
    opacity: 0.5;
}

.more {
    left: 10px;
    top: 117px;
    height: 25px;
    width: 26px;
    display: flex;
    justify-content: center;
    padding: 7px !important;
    opacity: 0;
    transition: 100ms;
    transform: translateY(10px);
}

.update:hover .more {
    opacity: 1;
    transform: translateY(0);
}

.update_top {
    margin-bottom: 12px;
    z-index: 9000;
    position: relative;
}

.update:hover {
    /* transform: scale(1.01) */
}

.creator_meta {
}

a:hover {
    text-decoration: none !important;
}

.creator_name {
    padding-top: 1px;
    float: left;
}

.post_time {
    font-size: 10px;
    float: left;
    margin-left: 11px;
    color: #adadad;
    margin-top: 5px;
}

.update_thumb {
    height: 123px;
    width: 214px;
    background: #efefef;
    overflow: hidden;
}

.thumb_img {
    width: 126px;
    height: 122px;
    background-size: cover;
    background-position: center center;
}
.mobile_only.thumb_img {
    width: 100%;
    height: auto;
}

.youtube .thumb_img {
    width: 214px;
}

.unknown .thumb_img {
    width: 214px;
}

.update .icon {
    position: absolute;
    right: 28px;
    top: 76px;
    height: 30px;
    width: 30px;
    padding: 0;
}

.update img {
    // height: 100%;
    width: 100%;
    display: block;
    /* box-shadow: 1px 0px 30px #00000094; */
}

.update:hover img {
}

.update_title {
    margin-top: 7px;
    max-height: 40px;
    overflow: hidden;
}

.update .dropdown {
    margin-left: 0;
    margin-top: 0px;
    opacity: 0;
    z-index: 9999;
}

.update:hover .dropdown {
    opacity: 1;
}

.update button {
    padding: 0 5px;
}

.dropdown-toggle-ellipsis {
    margin-top: 4px;
    opacity: 0.3;
    width: 20px;
    height: 20px;
    padding: 0px 13px;
    transition: 1s;
}

.dropdown-toggle-ellipsis:hover {
    opacity: 0.6;
}

/*
    .youtube .update:hover .creator_avatar {
        box-shadow: 0px 0px 0px 2px #ff1515;
     }
     .Soundcloud .update:hover .creator_avatar {
         box-shadow: 0px 0px 0px 2px #ff7700;
      }
      .Instagram .update:hover .creator_avatar {
         box-shadow: 0px 0px 0px 2px #2600ff;
      } */

.Instagram .update_thumb {
    /* height: 170px; */
    /* background: #efefef; */
}

.platform_Instagram .thumb_img {
    // width: 123px;
    // height: 123px;
    // img {
    // 	height: 123px;
    // }
}

.dark .update_thumb {
    background: #141414;
}
</style>
