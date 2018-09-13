<template>
    <div v-if="!dataLoaded" class="loading-container">
        <div class="login_box margin-center loading">
            <i class="fa fa-cog fa-spin fa-3x fa-fw"></i>
            <span>{{chosenLine.line}}</span>
            <small>Submitted by @{{chosenLine.user}}</small>
        </div>
    </div>
</template>


<script>
export default {
	props: ['dataLoaded', 'chosen-line']
}
</script>

<style lang="scss">
.loading-container {
	display: flex;
	justify-content: center;
	.login_box.loading {
		margin-top: 200px;
		background: none;
		box-shadow: none;
		width: 500px;
		height: 400px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: rgb(41, 41, 41);
		span {
			margin: 10px;
			opacity: 0.8;
			font-size: 24px;
			font-weight: 200;
			text-align: center;
		}
		small {
			font-size: 0.6rem;
			font-weight: 500;
			opacity: 0.5;
		}
	}
}

.dark .loading-container .login_box.loading {
	color: rgb(255, 255, 255);
}
</style>
