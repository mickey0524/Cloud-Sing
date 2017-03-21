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
				loading: false
			}
		},
		computed: {
			albumList () {
				return this.$store.state.albumList;
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
			},
			search (albumList) {
				this.$store.commit('changeAlbumList', albumList);
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../sass/album.scss'
</style>