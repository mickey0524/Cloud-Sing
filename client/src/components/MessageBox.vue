<template>
	<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
		<div id="messageBox">
			<p>{{ mes }}</p>
		</div>
	</transition>
</template>

<script>
	export default {
		props: ['mes']
		// data: () => {
		// 	return {
		// 		mes : this.message 
		// 	}
		// }
	}
</script>

<style lang="sass" scoped>
	@import '../sass/messageBox.scss'
</style>