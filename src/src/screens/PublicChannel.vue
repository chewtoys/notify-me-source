
<template>
    <div>
        <div class="public_channel_cover">
            <div :style="{ 'background-image': 'url(' + theChannelData.avatar + ')' }" class="avatar avatar_larger"></div>
        </div>
        <div ref="channel_page" class="scroll channel_page container">
    
            <!-- <Nav></Nav> -->
            <!-- {{ theChannelData }} -->
            <div class="channel_content">
    
                <div class="public_channel_header">
    
                    <div class="public_channel_meta">
    
                        <div class="topnav_container">
                            <div class="container">
                                <ul class="topnav">
                                    <router-link :to="'/' + theChannelData.username + '/'">
                                        <li class="tab_button"><i class="fa fa-bell"></i> <span> Notifications</span></li>
                                    </router-link>
                                    <!-- <router-link :to="'/' + theChannelData.username + '/content'"> -->
                                    <li class="tab_button"><i class="fa fa-th-large"></i> <span>Content</span></li>
                                    <!-- </router-link> -->
                                    <!-- <router-link :to="'/' + theChannelData.username + '/about'"> -->
                                    <li class="tab_button"><i class="fa fa-user"></i> <span>About</span></li>
                                    <!-- </router-link> -->
    
                                </ul>
                            </div>
                        </div>
    
                        <div class="stats">
                            <div class="stat_item">
                                <div class="stat_number">{{theChannelData.subCount || 0}}</div>
                                <div class="stat_label">SUBS</div>
                            </div>
                            <div class="stat_item">
                                <div class="stat_number">{{theChannelData.subCount || 0}}</div>
                                <div class="stat_label">NOTIFIED</div>
                            </div>
                            <div class="stat_item">
                                <div class="stat_number">1</div>
                                <div class="stat_label">EST. PER DAY</div>
                            </div>
                        </div>
                        <h3 class="display_name">{{ trimmedString(theChannelData.displayName, 30) }} <span v-if="theChannelData.verified === 'true'" class="verified verified_tick"></span></h3>
                        <div class=" bio">{{theChannelData.bio}}</div>
                        <div class="connected_platforms">
                            <a href="#"><i class="fab fa-youtube" /></a>
                            <a href="#"><i class="fab fa-twitter" /></a>
                            <a href="#"><i class="fab fa-instagram" /></a>
                            <a href="#"><i class="fab fa-github" /></a>
                            <a href="#"><i class="fab fa-twitch" /></a>
                        </div>
                        <button style="margin-top:30px;" class="coolbtn thiccbtn">Get Notified</button>
                    </div>
                </div>
    
    
                <!-- <div class="channel_about">
                        
                    </div> -->
    
    
    
    
    
                <div class="post_container">
                    <div :class="'post_item post_' + i.platform.toLowerCase()" v-for="(i, index) in theChannelPosts" :key="index">
                        <div class="post_platforms">
                            <PlatformIcon :platforms="i.platform" />
                        </div>
                        <div class="post_thumbnail_container" :style="{ 'background-image': 'url(' + i.thumbnail + ')' }">
                        </div>
                        <div class="post_content">
                            <div class="post_caption">{{i.title}}</div>
                            <small class="post_meta"><i class="far fa-clock"/> &nbsp; {{niceTime(i.createdAt)}} &nbsp;&nbsp;&nbsp; <i class="far fa-bell"/>&nbsp; 23,004</small>
    
                        </div>
                    </div>
                </div>
    
            </div>
        </div>
    
    </div>
</template>

<script>
import * as api from '@/core/api'
import PlatformIcon from '@/components/utils/PlatformIcon'
import TopicText from '@/components/TopicText'
import { Nav } from '@/components/container'
import { setInterval } from 'timers'

export default {
    props: ['username'],
    components: {
        PlatformIcon,
        TopicText,
        Nav
    },
    data() {
        return {
            theChannelData: {},
            theChannelPosts: []
        }
    },
    beforeRouteEnter: async (to, from, next) => {
        try {
            const res = await api.getPublicChannel(to.params.username)
            next(vm => {
                vm.theChannelData = res.data.channel
                vm.theChannelPosts = res.data.posts
            })
        } catch (e) {
            next(vm => {
                console.log('Channel not found', e)
                vm.$root.$emit('alert', 'error', 'Channel not found!')
                vm.$router.push('/')
            })
        }
    },
    mounted() {
        this.$refs.channel_page.addEventListener('scroll', e => {
            // console.log(this.scroll)
            this.scroll = this.$refs.channel_page.scrollTop
            if (this.scroll !== 0) document.body.classList.add('scrolling')
            else document.body.classList.remove('scrolling')

            if (this.scroll > 70) document.body.classList.add('scroll_70')
            else document.body.classList.remove('scroll_70')

            if (this.scroll > 110) document.body.classList.add('scroll_110')
            else document.body.classList.remove('scroll_110')
        })
    },
    methods: {
        trimTitle(title) {
            if (title.length > 45) {
                return title.substring(0, 45) + '...'
            }

            return title
        }
    },
    watch: {
        scroll() {
            console.log(this.scroll)
        }
    }
}
</script>

<style lang="scss">
@import '../assets/css/responsive.scss';
@import '../assets/css/colors.scss';
body {
    background: #efeeee;
}

.scrolling {
    .stats {
        // margin-top: -50px;
    }
}

.scroll_70 {
    .display_name,
    .bio {
        opacity: 0;
    }
}

.scroll_110 {
    .connected_platforms,
    .thiccbtn {
        opacity: 0;
    }
}

$transition: 400ms;
$highlightCustom: #222222;
.public_channel_cover {
    width: 100%;
    height: 80px;
    background: lighten($highlightCustom, 80%);
    padding-top: 15px;
    box-shadow: 0 60px 20px 0px #f6f6f6;
    z-index: 99;
    position: relative;
    .avatar {
        margin: auto;
        float: none;
        margin-bottom: 20px;
        display: block;
        // border: 5px solid $highlightCustom;
        position: relative;
        z-index: 99;
    }
}

.channel_page {
    display: flex;
    .channel_content {
        margin: 0 auto;
        width: 90%;
        .public_channel_header {
            .public_channel_meta {
                text-align: center;
                position: relative;
                .topnav {
                    background: none;
                    width: 50%;
                    position: fixed;
                    margin: auto;
                    border: none;
                    font-weight: 500;
                    display: flex;
                    .tab_button {
                        padding-top: 10px;
                    }
                    .router-link-exact-active {
                        i,
                        span {
                            color: $highlightCustom;
                        }
                        .tab_button {
                            border-color: $highlightCustom;
                        }
                    }
                }
                .stats {
                    position: absolute;
                    margin-left: calc(50% + 60px);
                    width: calc(50% - 60px);
                    margin-top: 5px;
                    z-index: 9999;
                }
                .stat_item {
                    min-width: 60px;
                    .stat_number {
                        color: $highlightCustom;
                        font-size: 1.1rem;
                    }
                }
                .thiccbtn {
                    margin: 7px 0 40px 0 !important;
                    background: $highlightCustom;
                    transition: $transition;
                    &:hover {
                        background: darken($highlightCustom, 5%) !important;
                    }
                }
                h3 {
                    font-size: 1.7rem;
                }
                .display_name {
                    padding-top: 90px;
                    transition: $transition;
                }
                .username {
                    text-align: center;
                    font-size: 0.9rem;
                    span {
                        opacity: 0.5;
                    }
                }
                .verified {
                    width: 18px;
                    height: 14px;
                    display: inline-block;
                    opacity: 0.6;
                }
                .bio {
                    margin: 10px 0;
                    font-size: 1rem;
                    font-weight: 500;
                    letter-spacing: -1px;
                    transition: $transition;
                }
                .connected_platforms {
                    transition: $transition;
                    i {
                        margin: 10px;
                    }
                }
            }
        }
        .stats {
            width: 50%;
            margin: auto;
            margin-bottom: 10px;
            transition: 200ms;
            // .stat_number {
            //     font-size: 31px;
            // }
            // .stat_label {
            //     font-size: 12px;
            // }
        }
    }
}

// $postHeight: 170px;
// $thumbWidth: ($postHeight / 9) * 16;
// .post_container {
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     margin-bottom: 200px;
//     .post_item {
//         position: relative;
//         // height: $postHeight;
//         width: 100%;
//         margin-bottom: 15px;
//         transition: 300ms;
//         cursor: pointer;
//         border-radius: 8px;
//         // padding: 10px;
//         box-shadow: 0px 2px 23px 0px rgba(0, 0, 0, 0.043);
//         background: #f8f8f8;
//         display: flex;
//         overflow: hidden;
//         &:hover {
//             transform: scale(1.02);
//         }
//     }
//     .post_meta {
//         margin-bottom: 10px;
//         opacity: 0.4;
//         display: block;
//         position: absolute;
//         bottom: 1px;
//         font-size: 0.7rem;
//     }
//     .post_topics {
//         position: absolute;
//         bottom: 0px;
//         right: 0px;
//     }
//     .post_content {
//         padding: 0 30px;
//         flex-direction: column;
//         flex-grow: 1;
//         justify-content: center;
//         .post_title {
//             font-size: 1.1rem;
//         }
//         .post_caption {
//             font-size: 0.9rem;
//             margin-top: 13px;
//             height: 30px;
//             width: 350px;
//             overflow: hidden;
//             white-space: nowrap;
//             text-overflow: ellipsis;
//         }
//         .post_message {
//             font-size: 0.8rem;
//             opacity: 0.5;
//         }
//     }
//     .post_platforms {
//         max-width: 75px;
//         min-width: 75px;
//         .platformImages {
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             height: $postHeight;
//             .platformImage {
//                 width: 22px;
//                 height: 22px;
//             }
//         }
//     }
//     .post_thumbnail_container {
//         height: $postHeight;
//         min-width: $thumbWidth;
//         max-width: $thumbWidth;
//         background-size: cover;
//         background-position: center;
//         background-repeat: no-repeat;
//         &:hover {
//             // background-size: contain;
//         }
//         img {
//             width: auto;
//             height: $postHeight;
//             margin: auto;
//             display: block;
//             // border-radius: 5px 0px 0px 5px;
//         }
//     }
// }
// .dark .post_item {
//     background: $boxDark;
// }
</style>
