<template>
	<div id="album">
		<Loading v-if="loading"></Loading>
		<h3>精选专辑</h3>
		<div class="album-list">
			<div class="album-item" v-for="(item, index) in albumList" @click="routeToDetail(index)">
				<img :src="item.cover">
				<p>{{ item.name }}</p>
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
				albumList : [
					{
						name : '周杰伦的床边故事',
						cover : 'https://p3.music.126.net/cUTk0ewrQtYGP2YpPZoUng==/3265549553028224.jpg?param=400y400',
						albumId: '34720827'
					},
					{
						name : '七里香',
						cover : 'https://p4.music.126.net/P1goeQ7SoxEkFsb4ZDijMw==/7746059418324672.jpg?param=400y400',
						albumId: '18903'
					},
					{
						name : '十一月的萧邦',
						cover : 'https://p4.music.126.net/J8AsjYfu2Ugr7Q4ub0Yv0Q==/43980465123047.jpg?param=400y400',
						albumId: '18896'
					},
					{
						name : '几个薛之谦',
						cover : 'https://p3.music.126.net/GbD4EIwWeeQlO65jsDzywA==/60473139533044.jpg?param=400y400',
						albumId: '17072'
					},
					{
						name : '和自己对话',
						cover : 'https://p4.music.126.net/CKcTyKux_UTt0sO_5VWR9w==/16561943649388272.jpg?param=400y400',
						albumId: '3438282'
					}
				]
			}
		},
		methods: {
			routeToDetail (index) {
				this.loading = true;
				var _this = this;
				let resource = this.$resource('http://localhost:3000/getAlbum');
				resource.save({ albumId : this.albumList[index].albumId }).then((response) => {
					_this.loading = false;
					let detail = {
						cover : _this.albumList[index].cover,
						playListName : _this.albumList[index].name,
						authorName : response.body.author,
						authorAvatar : response.body.avatar,
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
	@import '../sass/album.scss'
</style>