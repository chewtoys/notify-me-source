<template>
    <div class="setting_content_inner">
        <h4 class="setting_title">Change Log</h4>  
		<div class="setting_section" v-for="change in changes" :key="change.id">
			<div class="setting_information">
				<div class="setting_item_heading">{{ change.heading }}</div>
				<div class="setting_item_title" v-if="change.title">{{ change.title }}</div>
				<div class="setting_desc">{{ change.description }}</div>
			</div>
		</div>
    </div>
</template>
<script>
import Account from '@/core/account.core'

export default {
    data() {
        return {
            changes: [
                {
                    heading: 'Change Logs',
                    title: null,
                    description: 'Well I was added, Well you are looking at me right now.'
                }
            ]
        }
    }
}
</script>
