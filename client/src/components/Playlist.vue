<template>
	<div id="playlist">
		<List></List>
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
	import List from './List.vue'
	export default {
		components: {
			Loading,
			List
		},
		data: () => {
			return {
				loading: false
			}
		},
		computed: {
			playList () {
				return this.$store.state.playList;
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
			},
			search (playList) {
				this.$store.commit('changePlayList', playList);
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../sass/playlist.scss';
</style>