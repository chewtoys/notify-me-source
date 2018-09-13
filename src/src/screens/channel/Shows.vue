<template>
 <div class="page container ">
		<br/>
		<h1 class="heading">Coming soon...</h1>
		<ul>
		<li>Shows are a formal way to present a series of content, such as a podcast or web show to your audience.</li>
		<li>Shows can be shared between multiple channels. E.G: four members of a podcast can have the same show linked to their channel, meaning new subscribers of theirs will also subscribe to the show.</li>
		<li>Viewers can mute shows on your channel, but still get notified about regular posts. This helps if you make a variety of content, and your viewer just wants a portion of it.</li>
		<li>Shows will have their own pages reachable at notify.me/shows/</li>
		<li>The UI is optimised depending on the desired content, E.G: a podcast is formmated differently to a web series.</li>
		</ul>
       
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
