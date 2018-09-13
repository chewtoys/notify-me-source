<template>
    <div class="setting_section">
        <div class="setting_information">
            <div class="setting_item_heading">{{heading}}</div>
            <div class="setting_item_title">{{title}}</div>
            <div class="setting_desc">{{desc}}</div>
        </div>
        <div class="setting_toggle">
            <button class="coolbtn">{{button}}</button>

        </div>
    </div>
</template>


<script>
export default {
	props: ['title', 'desc', 'button', 'heading'],
	data() {
		return {}
	}
}
</script>

<style>
.setting_toggle .coolbtn {
	width: 150px;
}
</style>
