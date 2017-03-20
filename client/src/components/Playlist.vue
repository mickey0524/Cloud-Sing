<template>
	<div id="playlist">
		<Loading v-if="loading"></Loading>
		<h3>全部歌单</h3>
		<div class="playlist-list">
			<div class="list-item" v-for="(list, index) in playList" @click="routeToDetail(index)">
				<div class="img">
					<img :src="list.cover">
					<p class="author"><i class="fa fa-user-o"></i> {{ list.author }}</p>
				</div>
				<p class="name">{{ list.name }}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import Loading from './Loading.vue'
	export default {
		components: {
			Loading
		},
		data: () => {
			return {
				loading: false,
				playList : [
					{
						cover : 'https://p3.music.126.net/9igIxyAEGyWW35H6qxStew==/7713074069619085.jpg?param=400y400',
						name : '周杰伦',
						author : '风动云动',
						playlistId: '70269414'
					},
					{
						cover : 'https://p4.music.126.net/BvyL9PIrr9Te_zNETctYaQ==/3419481170032175.jpg?param=400y400',
						name : '☾歌手☽周杰伦',
						author : '飒然风影',
						playlistId: '377261935'
					},
					{
						cover : 'https://p4.music.126.net/XrDN8PC8wrWBaLYUko1LPg==/1400777815583105.jpg?param=400y400',
						name : '林俊杰最全歌曲合辑',
						author : 'VeeLau',
						playlistId: '172276778'
					},
					{
						cover : 'https://p4.music.126.net/J9amdumIvLVTYi2hpKghrA==/7947270046270086.jpg?param=400y400',
						name : '薛之谦',
						author : '郑ab',
						playlistId: '1909092'
					},
					{
						cover : 'https://p3.music.126.net/uAL5qDUsMlJOwnAlEmgu-Q==/18601537720493144.jpg?param=400y400',
						name : '幽幽古风 音拂心田',
						author : '锦瑟浮生',
						playlistId: '593705618'
					},
					{
						cover : 'https://p.qpic.cn/music_cover/ZDzylthJUx5Iia2n1lmQhrZZZlyz7vBQcv69QGwgEHPupm30GVVialdg/600',
						name : '古风之韵，淡薄之境',
						author : '荼蘼花事了',
						playlistId: '360644327'
					}
				]
			}
		},
		methods: {
			routeToDetail (index) {
				this.loading = true;
				var _this = this;
				let resource = this.$resource('http://localhost:3000/getPlaylist');
				resource.save({ playlistId : this.playList[index].playlistId }).then((response) => {
					_this.loading = false;
					let detail = {
						cover : _this.playList[index].cover,
						playListName : _this.playList[index].name,
						authorName : _this.playList[index].author,
						authorAvatar : response.body.songAvatar,
						songList : response.body.songResult,
						isAdd: false
					}
					this.$store.commit('setDetail', detail);
					this.$router.push('/detail');
				})
				.catch((err) => { console.log(err); })
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../sass/playlist.scss';
</style>