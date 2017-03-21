<template>
	<div id="singer">
		<Loading v-if="loading"></Loading>
		<div class="singer-list">
			<div class="singer-item" v-for="(singer, index) in singerList" @click="routeToDetail(index)">
				<img :src="singer.avatar">
				<p>{{ singer.name }}</p>
				<span>></span>
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
			singerList () {
				return this.$store.state.singerList;
			}
		},
		methods: {
			routeToDetail (index) {
				this.loading = true;
				var _this = this;
				let resource = this.$resource('http://localhost:3000/getSinger');
				resource.save({ singerName : this.singerList[index].name }).then((response) => {
					_this.loading = false;
					let detail = {
						authorAvatar : _this.singerList[index].avatar,
						playListName : _this.singerList[index].name + '的歌曲',
						authorName : _this.singerList[index].name,
						cover : response.body.cover,
						songList : response.body.songResult,
						isAdd: false
					}
					this.$store.commit('setDetail', detail);
					this.$router.push('/detail');
				})
				.catch((err) => { console.log(err); })
			},
			search (singerList) {
				this.$store.commit('changeSingerList', singerList);
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../sass/singer.scss';
</style>