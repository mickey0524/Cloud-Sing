<template>
	<div>
		<div class="top-control">
			<div class="logo">
				<i class="fa fa-music" aria-hidden="true"></i>
			</div>
			<input type="text" id="search" placeholder="搜索音乐、歌单、歌手、专辑">
			<div class="play-flag">
				<span class="active_1"></span>
				<span class="active_2"></span>
				<span class="active_3"></span>
				<span class="active_4"></span>
			</div>
		</div>
		<nav>
			<ul>
				<li>新歌</li>
				<li class="active">歌单</li>
				<li>歌手</li>
				<li>专辑</li>
			</ul>
		</nav>
		<!-- <Search></Search> -->
		<!-- <Playlist></Playlist> -->
		<!-- <Singer></Singer> -->
		<Album></Album>
		<div class="bottom-control">
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
		</div>
	</div>
</template>

<script>
	import Search from './Search.vue'
	import Playlist from './Playlist.vue'
	import Singer from './Singer.vue'
	import Album from './Album.vue'
	export default {
		components: {
			Search,
			Playlist,
			Singer,
			Album
		},
		data: () => {
			return {

			}
		}
	}
</script>

<style lang="sass" scoped>
	@import url('../css/font-awesome.min.css');
	@import '../sass/index.scss';
</style>