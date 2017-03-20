<template>
	<div id="search">
		<MessageBox v-if="hasMessage" :mes="message"></MessageBox>
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
			<div v-for="(song, index) in songList" class="song-item" @click="getSongMes(index)">
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
	import dealLyric from '../js/dealLyric.js'
	import MessageBox from './MessageBox.vue'
	export default {
		data: () => {
			return {
				songList : [
					{
						singer : '周杰伦',
						name: '告白气球',
						album: '周杰伦的床边故事',
						songId: '418603077',
						isAdd: false
					},
					{
						singer : '周杰伦',
						name: '红尘客栈',
						album: '十二星座',
						songId: '25641368',
						isAdd: false
					},
					{
						singer : '周杰伦',
						name: '七里香',
						album: '叶惠美',
						songId: '186001',
						isAdd: false
					},
					{
						singer: '玄殇',
						name: '陌上花开',
						alnum: '天涯明月刀相关歌曲',
						songId: '420400798',
						isAdd: false
					},
					{
						singer: '孙晔/喵☆酱',
						name: '天涯',
						alnum: '热门华语244',
						songId: '29567104',
						isAdd: false						
					},
					{
						singer: '银临/云の泣',
						name: '锦鲤抄',
						alnum: '锦鲤抄',
						songId: '28138493',
						isAdd: false							
					},
					{
						singer: '银临/慕寒',
						name: '东风志',
						alnum: '东风志',
						songId: '435306744',
						isAdd: false						
					}
				],
				hasMessage: false,
				message: ''
			}
		},
		components: {
			MessageBox
		},
		methods: {
			getSongMes (index) {
				if(!this.songList[index].isAdd) {
					let resource = this.$resource('http://localhost:3000/getSongMes');
					let _this = this;
					_this.message = '添加到播放列表';
					_this.hasMessage = true;
					setTimeout(function() {
						_this.hasMessage = false;
					}, 2000);
					resource.save({ songId: this.songList[index].songId, songName: this.songList[index].name }).then((response) => {	
						var song = {};
						song.id = this.songList[index].songId;
						song.name = this.songList[index].name;
						song.singer = this.songList[index].singer;
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
	@import '../sass/search.scss';
</style>