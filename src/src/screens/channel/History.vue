<template>
    <div class="page container ">
		<br/><br/><p style="text-align:center;">No notifications have been sent from this channel.</p>
       
    </div>
</template>
<script>
export default {
    props: ['username'],
    mounted() {
        if (this.username) this.loadChannel(this.username)
    }
}
</script>
