<template>
	<div>
		<Loading v-if="loading"></Loading>
		<MessageBox v-if="hasMessage" :mes="message"></MessageBox>
		<div class="top-control">
			<div class="logo">
				<i class="fa fa-music" aria-hidden="true"></i>
			</div>
			<input type="text" id="search" placeholder="搜索音乐、歌单、歌手、专辑" v-model="searchContent"  @keyup.enter="search">
			<!-- <button style="display: none" @keyup.enter="search">搜索</button> -->
			<div class="play-flag" :class="{'active' : playStatus}" @click="routeToPlay">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
		<nav>
			<ul>
				<li :class="{'active' : $store.state.indexCurrentPage == 'search'}" @click="routeToSearch">新歌</li>
				<li :class="{'active' : $store.state.indexCurrentPage == 'playlist'}" @click="routeToPlaylist">歌单</li>
				<li :class="{'active' : $store.state.indexCurrentPage == 'singer'}" @click="routeToSinger">歌手</li>
				<li :class="{'active' : $store.state.indexCurrentPage == 'album'}" @click="routeToAlbum">专辑</li>
			</ul>
		</nav>
		<transition enter-active-class="animated slideInLeft">
			<router-view @beginPlay="beginplay" @nextSong="nextSong"></router-view>
		</transition>
<!-- 		<div class="bottom-control">
			<div class="search active">		
				<i class="fa fa-headphones" aria-hidden="true"></i>
				<span>发现</span>
			</div>
			<div class="friend">
				<i class="fa fa-paper-plane-o"></i>
				<span>朋友</span>
			</div>
			<div class="account">		
				<i class="fa fa-home" aria-hidden="true"></i>
				<span>账号</span>
			</div>
		</div> -->
	</div>
</template>

<script>
	// import Search from './Search.vue'
	// import Playlist from './Playlist.vue'
	// import Singer from './Singer.vue'
	// import Album from './Album.vue'
	import dealTime from '../js/dealTime.js'
	import MessageBox from './MessageBox.vue'
	import Loading from './Loading.vue'

	export default {
		components: {
			// Search,
			// Playlist,
			// Singer,
			// Album,
			MessageBox,
			Loading
		},
		mounted: function() {
			var path = this.$route.path.slice(1);
			switch(path) {
				case '' : this.$store.commit('routeToHomeChild', 'search'); break;
				case 'playlist' : this.$store.commit('routeToHomeChild', 'playlist'); break;
				case 'singer' : this.$store.commit('routeToHomeChild', 'singer'); break;
				case 'album' : this.$store.commit('routeToHomeChild', 'album'); break;
				default: break;
			}
		},
		data: function() {
			return {
				// currentPage: 'search',
				// isPlaying: this.$store.state.audio.isPlaying,
				hasMessage: false,
				message: '',
				searchContent: '',
				loading: false
			}
		},
		computed: {
			isPlaying: function() {
				return this.$store.state.audio.isPlaying;
			},
			playStatus: function() {
				return this.$store.state.audio.isPlaying && this.$store.state.audio.playStatus == 'play';
			}
		},
		methods: {
			routeToSearch: function() {
				this.$store.commit('routeToHomeChild', 'search');
				this.$router.push('/');
			},
			routeToPlaylist: function() {
				this.$store.commit('routeToHomeChild', 'playlist');
				this.$router.push('/playlist');
			},
			routeToSinger: function() {
				this.$store.commit('routeToHomeChild', 'singer');
				this.$router.push('/singer');
			},
			routeToAlbum: function() {
				this.$store.commit('routeToHomeChild', 'album');
				this.$router.push('/album');
			},
			routeToPlay: function() {
				if(this.isPlaying) {
					this.$store.commit('changeNowTime', dealTime.getNowTime(document.getElementsByTagName('audio')[0].currentTime));
					this.$router.push('/play');
				}
				else {
					this.message = '当前暂时无歌曲播放';
					this.hasMessage = true;
					var _this = this;
					setTimeout(function() {
						_this.hasMessage = false;
					}, 2000);
				}
			},
			beginplay: function(songAddress) {
				this.$emit('beginPlay', songAddress);
			},
			nextSong: function(direction) {
				this.$emit('nextSong', direction);
			},
			search: function() {
				let page = this.$route.path;
				let resource;
				let _this = this;
				switch(page) {
					case '/' : resource = this.$resource('http://localhost:3000/searchSong'); break;
					case '/playlist' : resource = this.$resource('http://localhost:3000/searchPlaylist'); break;
					case '/singer' : resource = this.$resource('http://localhost:3000/searchSinger'); break;
					case '/album' : resource = this.$resource('http://localhost:3000/searchAlbum'); break; 
					default: break;
				}
				this.loading = true;
				resource.save({ searchContent : this.searchContent }).then((response) => {
					_this.$children[0].search(response.body);
					_this.loading = false;
				})
				.catch((err) => { console.log(err); })
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../sass/home.scss';
</style>