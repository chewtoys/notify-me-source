<template>
    <div>

        <div class="modal-header">
            <span class="title">Create</span>
            <div class="close"></div>
        </div>

        <div class="modal_content">

            <div class="alert alert-primary" role="alert">
                We're currently in Alpha, this process is being made much easier. <a href="#">Find out more.</a>
            </div>

            <form class="form-horizontal" role="form">

                <div class="form-group thicc">
                    <label class="control-label">Link: (YouTube Video, Twitch Stream, Twitter Post)</label>
                    <div class="">
                        <input id="newNotificationTextBox" v-model="notification.link" class="form-control" type="text">
                        <div class="formLoadingSpinner" v-if="type == 'loading'"></div>
                    </div>
                </div>

                <!-- <div @click="importURL" class="action-button">Import</div> -->


                <div v-if="notification.platform" class="linkDetector">
                    <div class="platformIcon" :class="notification.platform + '-icon'"></div>
                    <div class="platformName">This post will open the {{ notification.platform }} app.</div>
                    <div class="right platformActions">
                        <!-- <div class="btn btn-default">Remove</div> -->
                        <label class="notificationLabel">Send Notification</label>
                        <input v-model="sendNotification" type="checkbox" class="toggle" id="notifiationToggle"/>

                    </div>

                </div>

                <div v-if="notification.platform == 'Soundcloud'">
                    <!-- LINK TEST -->

                </div>


                <div class="notificationPreview">

                    <div class="hidden" v-bind:class="{ show: notification.data }">
                        <div class="right">
                            <label>Thumbnail</label>
                            <div v-if="notification.data"
                                 v-bind:style="{ 'background-image': 'url(' + notification.data.thumbnail + ')' }"
                                 class="thumbnail"></div>
                        </div>
                        <!-- {{notification.data.thumbnail}} -->

                        <div class="form-group editNotif">
                            <label>Notification Message</label>
                            <input v-if="notification.data" v-model="notification.data.title" class="form-control"
                                   type="text">

                            <div class="topic_adder topic_adder_margin">
                                <label>Topics</label>

                                <CategoryEditor :categories="myChannel.topics" :ownerChannel="myChannel" :newPost="true" @updateCategories="updateCategories"/>

                                <!-- <div id="editTopicsContainer">
                                    <div id="editTopicsForNotification"></div>
                                </div>

                                <div class="results editTopicsResults">
                                    <div v-for="i in topicSearchResults" :key="i.id">
                                        <div @click="addTopic(i.topic)" class="result">{{ i.topic }}</div>
                                    </div>
                                </div> -->
                                

                            </div>

                            <!-- <div class="notifiationInfo"><b>23,943</b> subscribers will recieve this notification</div><br/> -->

                            <!-- <label>Optional Feed Message</label> -->
                            <!-- <input v-if="notification.data" v-model="notification.data.message" class="form-control" type="text" > -->

                            <div class="action_buttons">
                                <input :class="{ 'buttonWaiting': buttonWaiting }" @click="createNotification" type="button" class="coolbtn mr" value="Send">
                                <input type="reset" @click="$root.$emit('closeModal')" class="coolbtn" value="Cancel">
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>


<script>
// import topics from '@/core/topics.js'
import CategoryEditor from '@/components/FormFields/CategoryEditor'

import Post from '@/core/post.core.js'
import * as api from '@/core/api'
import debounce from 'debounce'

// import Switch from '@/assets/js/toggle.min.js'

//import debounce from 'lodash/debounce'

// import LinkPreview from 'node-link-preview'
// import linkPreview from "@nunkisoftware/link-preview";

export default {
    components: {
        CategoryEditor
    },
    data() {
        return {
            notification: {},
            type: 'loading',
            platform: '',
            sendNotification: true,
            buttonWaiting: false,
            categories: []
        }
    },
    created() {},
    mounted() {
        // this.initTopicForm('editTopicsForNotification', this.$store.getters.getTopicsForChannel || [])

        this.categories = this.myChannel.topics

        var textInput = document.getElementById('newNotificationTextBox')
        var timeout = null

        // Listen for keystroke events
        textInput.onchange = () => {
            this.importURL()
        }
    },
    methods: {
        importURL() {
            this.type = 'loading'
            debounce(this.checkLink(), 200)
        },
        checkLink() {
            if (!this.notification.link) return this.clear()

            const platform = Post.analyseURL(this.notification.link)

            if (platform === 'unknown') this.clear()

            this.notification.platform = platform
            this.linkPreview(this.notification.link)
        },
        linkPreview(x) {
            Post.scrape(x).then(response => {
                this.notification.data = response.data
                console.log(this.notification.data)
                this.type = 'preview'
            })
        },
        updateCategories(value) {
            this.categories = value
        },
        createNotification() {
            this.buttonWaiting = true

            const newPost = {
                owner: this.$store.getters.getCurrentChannel.id,
                platform: this.notification.platform,
                title: this.notification.data.title,
                link: this.notification.link,
                message: this.notification.message || '',
                thumbnail: this.notification.data.thumbnail,
                datePublished: this.notification.data.dateCreated,
                duration: this.notification.data.duration,
                topics: this.categories || [],
                //new
                sendNotification: true
            }

            console.log(newPost)

            // console.log(newPost.topics) // outputs the value
            // console.log(Array.isArray(newPost.topics)) // shows the type (hint: it's an array)
            // console.log(typeof newPost.topics)

            api
                .newPost(newPost)
                .then(res => {
                    this.buttonWaiting = false
                    // var x = this.$store.getters.getFeed
                    // console.log(x)
                    // x.unshift(newPost)
                    // this.$store.commit('populateFeed', x)

                    res.data.post.channel = this.$store.getters.getCurrentChannel

                    this.$store.commit('addNewPosts', [res.data.post])

                    console.log(res)
                    this.$root.$emit('closeModal')
                })
                .catch(err => {
                    this.buttonWaiting = true
                    console.log(err)
                })
        },
        scheduleNotification() {
            //
        },
        clear() {
            this.notification.data = null
            this.notification.platform = null
            this.type = 'unknown'
        },

        youtubeData(url) {
            var jefjeff = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
            var match = this.notification.link.match(jefjeff)

            if (match && match[7].length == 11) {
                var videoID = match[7]

                // server
                Post.youtube(videoID)
                    .then(response => {
                        this.notification.data = response.item.video
                        this.type = 'preview'
                        console.log(response)
                    })
                    .catch(e => {
                        console.log(e)
                        this.$root.$emit('alert', 'error', 'Failed to connect to server, check API status')
                    })
            } else {
                this.type = 'unknown'
            }
        }
    },
    computed: {}
}
</script>

<style>
.modal_container.NewNotification {
    width: 800px;
}

.show {
    display: block !important;
}

.hidden {
    display: none;
}

.thumbnail {
    width: 213px;
    background-size: cover !important;
    height: 119px;
    margin: 0px 20px 20px 0px;
    background-position: 0px 0px;
}

.formLoadingSpinner {
    width: 30px;
    right: 25px;
    position: absolute;
    height: 30px;
    margin-top: -30px;
    background: url('https://loading.io/ee796859-66c2-4fc6-9e0b-ec137cc34cec');
}

.editNotif {
    width: 400px !important;
}

.notifiationInfo {
    padding: 10px;
    background: #f7f7f7;
    margin-top: 10px;
    border-radius: 5px;
    font-size: 13px;
}

.thicc {
    background: #fafafa !important;
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.12), inset 0px -1px 0px 0px rgba(205, 205, 205, 0.5), inset 0px 1px 0px 0px rgba(255, 255, 255, 0.5) !important;
    border-radius: 5px !important;
    padding: 14px !important;
}

input:-webkit-autofill {
    background-color: #efefef !important;
}
</style>
