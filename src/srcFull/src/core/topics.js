import Vue from 'vue'
import Taggle from 'taggle'
import $ from 'jquery'

import debounce from 'debounce'

Vue.mixin({
    data() {
        return {
            taggle: ' ',
            topicSearchResults: []
        }
    },
    mounted() {},
    methods: {
        initTopicForm(div, source) {
            var vm = this

            this.taggle = new Taggle(div, {
                placeholder: 'Add up to 3 topics',
                tags: source,
                allowDuplicates: false,
                allowedTags: this.arrayOfTopics,
                // maxTags: 3,
                onTagAdd: function() {
                    if (vm.taggle.getTagValues().length === 3) {
                        $('.taggle_input').hide()
                    }
                },
                onTagRemove: function() {
                    if (vm.taggle.getTagValues().length < 3) {
                        $('.taggle_input').show()
                    }
                }
            })
            if (this.taggle.getTagValues().length === 3) {
                $('.taggle_input').hide()
            }
            $('.taggle_input')
                .focus(function() {
                    $('.results').show()
                    var val = $('.taggle_input').val()
                    debounce(vm.getTopics(val), 200)
                    vm.getTopics()
                })
                .blur(function() {
                    setTimeout(function() {
                        $('.results').hide()
                    }, 300)
                })

            $('.taggle_input').keyup(function() {
                var val = $('.taggle_input').val()
                debounce(vm.getTopics(val), 200)
            })
        },
        addTopic(x) {
            this.taggle.add(x)
        },
        getTopics(val) {
            // change this to search server, eventually
            var results = []
            var topics = this.$store.state.tempTopics
            if (val == undefined) {
                results = topics
                return
            }
            var lowerVal = val.toLowerCase()
            for (var i in topics) {
                var t = topics[i].topic.toLowerCase()
                if (t.includes(lowerVal)) {
                    results.push(topics[i])
                }
            }
            this.topicSearchResults = results
        }
    },
    computed: {
        channel() {
            return this.$store.getters.getUserChannel
        },
        arrayOfTopics() {
            var array = []
            var topics = this.$store.getters.getTempTopics
            for (var i in topics) {
                array.push(topics[i].topic)
            }
            return array
        },
        taggleTopics() {
            return this.taggle.getTags()
        }
    }
})