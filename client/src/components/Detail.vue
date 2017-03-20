<template>
	<div id="detail">
		<MessageBox v-if="hasMessage" :mes="message"></MessageBox>
		<div class="detail-mes">
			<img :src="cover" class="blur-background">
			<!-- <div class="mask"></div> -->
			<div class="top-control">
				<i class="fa fa-angle-left" aria-hidden="true" @click="$router.go(-1)"></i>
				<span>歌单</span>
				<div class="play-flag" :class="{'active' : playStatus}" @click="routeToPlay">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
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
			<div v-for="(song, index) in songList" class="song-item" @click="getSongMes(index)">
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
	import dealTime from '../js/dealTime.js'
	import MessageBox from './MessageBox.vue'
	import dealLyric from '../js/dealLyric.js'
	export default {
		computed: {
			cover () { return this.$store.state.detail.cover },
			playListName () { return this.$store.state.detail.playListName },
			authorName () { return this.$store.state.detail.authorName },
			authorAvatar () { return this.$store.state.detail.authorAvatar },
			songList () { return this.$store.state.detail.songList },
			isPlaying () { return this.$store.state.audio.isPlaying },
			playStatus () { return this.$store.state.audio.isPlaying && this.$store.state.audio.playStatus == 'play' }
		},
		data: () => {
			return  {
				hasMessage: false,
				message: ''				
			}
		},
		components: {
			MessageBox
		},
		methods: {
			routeToPlay () {
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
			getSongMes (index) {
				if(!this.songList[index].isAdd) {
					let resource = this.$resource('http://localhost:3000/getSongMes');
					let _this = this;
					_this.message = '添加到播放列表';
					_this.hasMessage = true;
					setTimeout(function() {
						_this.hasMessage = false;
					}, 2000);
					resource.save({ songId: this.songList[index].songId, songName: this.songList[index].songName }).then((response) => {	
						var song = {};
						song.id = this.songList[index].songId;
						song.name = this.songList[index].songName;
						song.singer = this.songList[index].author;
						song.songCover = response.body.songCover;
						song.lyric = dealLyric(response.body.songLyric);
						song.allTime = response.body.songDuration;
						song.songAddress = response.body.songAddress;
						_this.$store.commit('addToPlayList', song);
						if(!_this.$store.state.audio.isPlaying || _this.$store.state.audio.playStatus == 'pause') {
							_this.$store.commit('changePlayIndex', _this.$store.state.audio.playList.length - 1);
							_this.$emit('beginPlay', response.body.songAddress);
						}
						_this.songList[index].isAdd = true;
					})
					.catch((err) => {
						console.log(err);
					})
				}
				else {
					var _this = this;
					_this.message = '已经存在于播放列表';
					_this.hasMessage = true;
					setTimeout(function() {
						_this.hasMessage = false;
					}, 2000);					
				}				
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../sass/detail.scss';
</style>