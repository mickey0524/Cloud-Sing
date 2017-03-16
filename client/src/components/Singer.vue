<template>
	<div id="singer">
		<div class="singer-list">
			<div class="singer-item" v-for="singer in singerList">
				<img :src="singer.avatar">
				<p>{{ singer.name }}</p>
				<span>></span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: () => {
			return {
				singerList : [
					{
						name : '周杰伦',
						avatar : 'https://p4.music.126.net/cUTk0ewrQtYGP2YpPZoUng==/3265549553028224.jpg?param=140y140'
					},
					{
						name : '林俊杰',
						avatar : 'https://p3.music.126.net/WDtmDgph6NKuKNbiwTDXHw==/18362943695761234.jpg?param=140y140'
					},
					{
						name : '萧敬腾',
						avatar : 'https://p4.music.126.net/kM0bdmhoJwtjx6PV5A3T1A==/91259465118157.jpg?param=140y140'
					},
					{
						name : '田馥甄',
						avatar : 'https://p4.music.126.net/3u-hAcxthaMpLaNvA9KJmg==/6038517860296999.jpg?param=140y140'
					},
					{
						name : '薛之谦',
						avatar : 'https://p3.music.126.net/4-1tot-c9uW1qzeGMc0CQQ==/19217264230279490.jpg?param=140y140'
					},
					{
						name : '周杰伦',
						avatar : 'https://p4.music.126.net/cUTk0ewrQtYGP2YpPZoUng==/3265549553028224.jpg?param=140y140'
					},
					{
						name : '林俊杰',
						avatar : 'https://p3.music.126.net/WDtmDgph6NKuKNbiwTDXHw==/18362943695761234.jpg?param=140y140'
					},
					{
						name : '萧敬腾',
						avatar : 'https://p4.music.126.net/kM0bdmhoJwtjx6PV5A3T1A==/91259465118157.jpg?param=140y140'
					},
					{
						name : '田馥甄',
						avatar : 'https://p4.music.126.net/3u-hAcxthaMpLaNvA9KJmg==/6038517860296999.jpg?param=140y140'
					},
					{
						name : '薛之谦',
						avatar : 'https://p3.music.126.net/4-1tot-c9uW1qzeGMc0CQQ==/19217264230279490.jpg?param=140y140'
					}
				]
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../sass/singer.scss';
</style>