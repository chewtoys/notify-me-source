<template>
    <!-- <transition name="fade"> -->
    <div>
        <transition name="fade">
            <div v-if="show" @click="close()" class="backdrop"></div>
        </transition>
        <transition name="slideup">
            <div v-if="show" class="modal_container">

                <div class="modal-header">
			<span class="title">
				<div>Hold up-</div>
			</span>
                    <div class="close"></div>
                </div>
                <div class="modal_content">
                    <div class="dialog-body">
                        <p>{{ title }}</p>
                        <!-- <p>{{ message }}</p> -->
                    </div>

                    <div class="yesno no">
                        <button v-shortkey="['enter']" @shortkey="$close(true)" class="coolbtn coolbtn-danger"
                                @click="$close(true)">
                            <span v-if="buttonLabel">{{ buttonLabel }}</span>
                            <span v-else>Delete</span>
                        </button>
                    </div>
                    <div class="yesno ">
                        <button class="coolbtn" @click="$close(false)">Cancel</button>
                    </div>

                </div>
            </div>
        </transition>


    </div>
    <!-- </transition> -->

</template>


<script>
export default {
    mounted() {
        this.show = true
    },
    data() {
        return {
            show: false
        }
    },
    methods: {
        close() {
            this.show = false
        }
    }
}
</script>

<style scoped>
.dialog-body {
    margin: -3px 7px 7px 7px;
}

.yesno {
    width: 50%;
    padding: 5px;
    float: left;
    margin-bottom: 10px;
}

.yesno button {
    width: 100%;
}

.no {
    float: left;
}

.channel_card {
    height: 70px;
    width: 100%;
    padding: 5px 5px 5px 15px;
    cursor: pointer;
    transition: 0.2s;
}

.delchan .avatar {
    height: 45px;
    width: 45px;
}

.backdrop {
    position: absolute;
    width: 100%;
    height: 100vh;
    background: rgb(255, 255, 255);
    opacity: 0.7;
    z-index: 90000;
    transition: 1s;
}

.dark .backdrop {
    background: rgb(0, 0, 0);
}

.modal_container {
    left: 0;
    right: 0;
    margin: auto;
    min-height: 200px;
    margin-top: 100px;
    box-shadow: 0px 2px 120px 0px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    background: #fff;
    position: absolute;
    z-index: 90001;
    /* max-height: 80vh; */
    overflow: hidden;
    width: 320px;
}

.modal_content {
    padding: 20px;
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

/* .modal_container::-webkit-scrollbar {
        display: none;
    } */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
 {
    opacity: 0;
}

.slideup-enter-active {
    animation: slideup 0.5s;
}

.slideup-leave-active {
    animation: slideup 0.3s reverse;
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
