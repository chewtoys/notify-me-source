<template>
    <!-- <transition name="fade"> -->
    <div v-shortkey="['esc']" @shortkey="close()">
        <transition name="fade">
            <div v-if="modalStack.length > 0" @click="close" class="backdrop"></div>
        </transition>

        <transition-group name="fade" tag="div" mode="out-in">
            <div v-for="(i, index) in modalStack" :key="index" >
                <div class="modal_container" :class="`${i.modalContent} level_${index}`" >
                    <component :is="i.modalContent" />
                </div>
            </div>
        </transition-group>
       
    </div>
    <!-- </transition> -->
</template>


<script>
import CreateChannel from '@/components/modals/CreateChannel'
import EditChannel from '@/components/modals/EditChannel'
import SwitchChannel from '@/components/modals/SwitchChannel'
import NewNotification from '@/components/modals/NewNotification'
import NewTip from '@/components/modals/NewTip'
import Settings from '@/components/modals/Settings'
import MoreInfo from '@/components/modals/MoreInfo'
import MobileNav from '@/components/modals/MobileNav'
import TransferChannel from '@/components/modals/TransferChannel'

export default {
    name: 'modal',
    components: {
        CreateChannel,
        EditChannel,
        SwitchChannel,
        NewNotification,
        NewTip,
        Settings,
        MoreInfo,
        MobileNav,
        TransferChannel
    },
    created() {
        // const ps = new PerfectScrollbar('.modal_container')
    },
    mounted() {
        this.$root.$on('modal', (modalContent, id) => {
            // this.id = id
            this.open(modalContent)
        })
        this.$root.$on('closeModal', () => {
            this.close()
        })
        this.$root.$on('modalBack', () => {
            this.modalStack.shift()
        })
    },
    data() {
        return {
            // show: false,
            // modalContent: ' ',
            id: ' ',
            modalStack: []
        }
    },
    methods: {
        open(modalContent) {
            this.modalStack.unshift({
                modalContent: modalContent
            })
        },
        close() {
            this.modalStack.splice(0, this.modalStack.length)
        }
    }
}
</script>

<style>
.level_0 {
    z-index: 900099 !important;
}
.level_1 {
    z-index: 900098 !important;
}
.level_2 {
    z-index: 900097 !important;
}
.level_3 {
    z-index: 900096 !important;
}
.level_5 {
    z-index: 900095 !important;
}
.backdrop {
    position: absolute;
    width: 100%;
    height: 100vh;
    background: rgb(255, 255, 255);
    opacity: 0.95;
    z-index: 900090;
    transition: 1s;
}

.modal_container {
    left: 0;
    right: 0;
    margin: auto;
    width: 500px;
    min-height: 200px;
    margin-top: 100px;
    box-shadow: 0px 2px 120px 0px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    background: #fff;
    position: absolute;
    z-index: 900091;
    overflow: hidden;
}

.modal_content {
    padding: 20px;
}
.modal_content.full_length {
    height: calc(100vh - 200px);
    overflow: scroll;
}

.modal-header {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #f5f5f5;
}

.modal-header .title {
    color: #9e9e9e;
    font-size: 13px;
    margin-left: 10px;
}

.dark .modal-header {
    border-bottom: 1px solid #222222;
}

.dark .modal_container {
    background: rgb(26, 26, 26);
}

.modal_content .result {
    padding: 5px 5px 5px 5px;
    font-size: 13px;
}

::-webkit-scrollbar {
    display: none;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 10.5s;
}

.fade-enter,
    .fade-leave-to
    /* .fade-leave-active below version 2.1.8 */
    
 {
    opacity: 0;
}

.slideup-enter-active,
.slideup-enter {
    transition: all 0.5s;
}

.slideup-leave-active,
.slideup-leave-to {
    transition: all 0.3s reverse;
}

@keyframes slideup {
    0% {
        transform: translateY(100px);
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    60% {
        transform: translateY(-5px);
    }
    100% {
        transform: translateY(0);
    }
}
</style>
