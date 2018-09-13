<template>
 <div class="page container ">
		<br/>
		<h1 style="text-align:center;" class="heading">Coming soon...</h1>
		<p style="text-align:center;">For now, check these guys out!</p>
		<br/>
		<br/>
			<Suggested/>
		<ul>
		</ul>
    
    </div>
</template>
<script>
import Suggested from '@/components/discover/Suggested'

export default {
    components: {
        Suggested
    },
    name: 'Discover'
}
</script>
