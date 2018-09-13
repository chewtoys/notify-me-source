<template>
    <div>
        <div class="modal-header">
            <!-- <span class="title">Super Secret Admin Stuff</span> -->
             <div class="admin_tabs ">
                    <button @click="changeTab('tags')" class="coolbtn topic_tag mr admin_tab" :class="{'active': currentTab === 'tags'}">Categories</button>
                    <button @click="changeTab('dummy')" class="coolbtn topic_tag mr admin_tab" :class="{'active': currentTab === 'dummy'}">Dummy Accounts</button>
                    <button @click="changeTab('reports')" class="coolbtn topic_tag mr admin_tab" :class="{'active': currentTab === 'reports'}">Reports</button>
                </div>
            <div class="close"></div>
        </div>
        <div class="modal_content">
            <div class="setting_content_inner">
               
                <!-- Current tab {{currentTab}} -->
                <div v-if="currentTab === 'tags'">
                <CategoryEditor :admin="true" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// This modal is displayed after a user creates a channel.
// import topics from '@/core/topics.js'
import CategoryEditor from '@/components/FormFields/CategoryEditor'

export default {
    components: {
        CategoryEditor
    },
    data() {
        return {
            currentTab: 'tags'
        }
    },
    created() {},
    methods: {
        changeTab(tab) {
            this.currentTab = tab
        }
    },
    computed: {}
}
</script>

<style>
.modal_container.CategoryModal {
    width: 800px;
    height: 70vh;
}

.modal_container.CategoryModal .modal_content {
    /* padding: 20px 60px 240px 60px;
        height: 100vh;
        overflow: scroll; */
}

.admin_tabs {
    margin-top: -7px;
}
</style>
