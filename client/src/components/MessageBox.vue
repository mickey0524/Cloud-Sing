<template>
	<div id="messageBox">
		<p>{{ message }}</p>
	</div>
</template>

<script>
	export default {
		data: () => {
			return {
				message : '单曲循环'
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../sass/messageBox.scss'
</style>