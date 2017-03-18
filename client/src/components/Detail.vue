<template>
	<div id="detail">
		<div class="detail-mes">
			<img :src="cover" class="blur-background">
			<!-- <div class="mask"></div> -->
			<div class="top-control">
				<i class="fa fa-angle-left" aria-hidden="true" @click="$router.go(-1)"></i>
				<span>歌单</span>
				<div class="play-flag">
					<span class="active_1"></span>
					<span class="active_2"></span>
					<span class="active_3"></span>
					<span class="active_4"></span>
				</div>
			</div>
			<div class="playList-mes">
				<img :src="cover">
				<div class="author-mes">
					<p>{{ playListName }}</p>

					<img :src="authorAvatar">
					<p>{{ authorName }}</p>
				</div>
			</div>
		</div>
		<div class="song-list">
			<div v-for="(song, index) in songList" class="song-item">
				<div class="number">
					{{ index + 1 }}
				</div>
				<div class="song-mes">
					<p>{{ song.songName }}</p>
					<span>{{ song.author }}</span>					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: () => {
			return {
				cover: 'https://p3.music.126.net/QQvVwj2_A_1dX8z52AkKJQ==/2152843767213633.jpg?param=400y400',
				playListName: '那些年，我们听的周杰伦',
				authorName: 'shooting丶star',
				authorAvatar: 'http://p1.music.126.net/xlhFhIkHGXZtprIodYR_kA==/18554258720428069.jpg',
				songList: [
					{
						songName: '最长的电影(Live)',
						author: '周杰伦'
					},
					{
						songName: '星晴+回到过去+最后的战役+爱我别走(Live)',
						author: '周杰伦'
					},
					{
						songName: '最长的电影(Live)',
						author: '周杰伦'
					},
					{
						songName: '星晴+回到过去+最后的战役+爱我别走(Live)',
						author: '周杰伦'
					},
					{
						songName: '最长的电影(Live)',
						author: '周杰伦'
					},
					{
						songName: '星晴+回到过去+最后的战役+爱我别走(Live)',
						author: '周杰伦'
					},
					{
						songName: '最长的电影(Live)',
						author: '周杰伦'
					},
					{
						songName: '星晴+回到过去+最后的战役+爱我别走(Live)',
						author: '周杰伦'
					},
					{
						songName: '最长的电影(Live)',
						author: '周杰伦'
					},
					{
						songName: '星晴+回到过去+最后的战役+爱我别走(Live)',
						author: '周杰伦'
					},
					{
						songName: '最长的电影(Live)',
						author: '周杰伦'
					},
					{
						songName: '星晴+回到过去+最后的战役+爱我别走(Live)',
						author: '周杰伦'
					},
					{
						songName: '最长的电影(Live)',
						author: '周杰伦'
					},
					{
						songName: '星晴+回到过去+最后的战役+爱我别走(Live)',
						author: '周杰伦'
					}
				]
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../sass/detail.scss';
</style>