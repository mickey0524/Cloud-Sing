<template>
	<div id="search">
		<div class="banner">
			<div class="swipe-photos"> 
				<div class="swipe-item">
					<img :src="require('../assets/banner1.jpg')">
				</div>
				<div class="swipe-item">
					<img :src="require('../assets/banner2.jpg')">
				</div>
				<div class="swipe-item">
					<img :src="require('../assets/banner3.jpg')">
				</div>
				<div class="swipe-item">
					<img :src="require('../assets/banner4.jpg')">
				</div>
			</div>
		</div>
		<div class="song-list">
			<div v-for="(song, index) in songList" class="song-item">
				<div class="number">
					{{ index + 1 }}
				</div>
				<div class="song-mes">
					<p>{{ song.name }}</p>
					<span>{{ song.singer }}</span>
					<span> - {{ song.album }}</span>					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: () => {
			return {
				songList : [
					{
						singer : '周杰伦',
						name: '告白气球',
						album: '周杰伦的床边故事'
					},
					{
						singer : '周杰伦',
						name: '红尘客栈',
						album: '十二星座'
					},
					{
						singer : '周杰伦',
						name: '七里香',
						album: '叶惠美'
					},
					{
						singer : '周杰伦',
						name: '告白气球',
						album: '周杰伦的床边故事'
					},
					{
						singer : '周杰伦',
						name: '红尘客栈',
						album: '十二星座'
					},
					{
						singer : '周杰伦',
						name: '七里香',
						album: '叶惠美'
					},
					{
						singer : '周杰伦',
						name: '告白气球',
						album: '周杰伦的床边故事'
					},
					{
						singer : '周杰伦',
						name: '红尘客栈',
						album: '十二星座'
					},
					{
						singer : '周杰伦',
						name: '七里香',
						album: '叶惠美'
					},
					{
						singer : '周杰伦',
						name: '告白气球',
						album: '周杰伦的床边故事'
					},
					{
						singer : '周杰伦',
						name: '红尘客栈',
						album: '十二星座'
					},
					{
						singer : '周杰伦',
						name: '七里香',
						album: '叶惠美'
					}
				]
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../sass/search.scss';
</style>