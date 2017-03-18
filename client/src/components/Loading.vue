<template>
	<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
		<div id="loading">
			<div class="loading-spin"></div>
			<p>Loading...</p>
		</div>
	</transition>
</template>

<script>
	export default {}
</script>

<style lang="sass" scoped>
	@import '../sass/loading.scss'
</style>