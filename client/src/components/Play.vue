<template>
	<div id="play">
		<MessageBox v-if="hasMessage" :mes="message"></MessageBox>
		<List v-if="checkList" @close="checkList = false;" @changeSong="listChangeSong" @deleteSong="deleteSong"></List>
		<!-- <audio id="audio" :src="songAddress"></audio> -->
		<img :src="cover">
		<div class="mask"></div>
		<div class="top-control">
			<i class="fa fa-angle-left" aria-hidden="true" @click="$router.go(-1)"></i>
			<div class="song-mes">
				<p>{{ name }}</p>
				<p>{{ author }}</p>
			</div>
		</div>
		<div class="song">
			<img :src="cover">
			<div class="lyric">
				<div class="lyric-item" v-for="item in lyric.lyricArr">
					<p>{{ item }}</p>
				</div>
			</div>
		</div>
		<div class="hand-audio">
			<span id="now-time">{{ nowTime }}</span>
			<div id="time-axis-all" @click="changeProgress"></div>
			<div id="time-axis-now" @click="changeProgress"></div>
			<div id="time-ball"></div>
			<span id="all-time">{{ allTime }}</span>
		</div>
		<div class="bottom-control">
			<i class="fa fa-random" aria-hidden="true" v-if="playWay == 'random'" @click="changeStatus('random')"></i>
			<i class="fa fa-rotate-right" aria-hidden="true" v-if="playWay == 'listCircle'" @click="changeStatus('listCircle')"></i>
			<i class="fa fa-history" aria-hidden="true" v-if="playWay == 'singleCircle'" @click="changeStatus('singleCircle')"></i>
			<i class="fa fa-step-backward" aria-hidden="true" @click="nextSong('left')"></i>
			<i class="fa fa-pause-circle-o" aria-hidden="true" @click="pauseAndPlay" v-if="playSatus == 'play'"></i>
			<i class="fa fa-play-circle-o" aria-hidden="true" @click="pauseAndPlay" v-if="playSatus == 'paused'"></i>
			<i class="fa fa-step-forward" aria-hidden="true" @click="nextSong('right')"></i>
			<i class="fa fa-list-ul" aria-hidden="true" @click="checkList = true;"></i>
		</div>
	</div>
</template>

<script>
	import dealLyric from '../js/dealLyric.js'
	import dealTime from '../js/dealTime.js'
	import MessageBox from './MessageBox.vue'
	import List from './List.vue'
	export default {
		mounted: function() {
			var _this = this;
			this.progressAndLyric();
			this.playSatus = this.$store.state.audio.playStatus;
			this.offsetLeft = parseInt(document.getElementById('time-axis-all').offsetLeft);
			this.progressWidth = parseInt(document.getElementById('time-axis-all').offsetWidth);
			setTimeout(function circle() {
				try {
					if(_this.playSatus == 'play') {
						let time = dealTime.changeNowtime(_this.nowTime)
						_this.$store.commit('changeNowTime', time);
						_this.progressAndLyric();
					}
					setTimeout(circle, 1000);
				}
				catch(err) {
					console.log('循环中途组件close');
				}
			}, 1000);
		},
		data: () => {
			return {
				// playWay : 'random',
				playSatus: '',
				hasMessage: false,
				message: '',
				offsetLeft: '',
				progressWidth: '',
				checkList: false
			}
		},
		computed: {
			name () {
				return this.$store.state.audio.playList[this.$store.state.audio.playIndex].name;
			},
			author () {
				return this.$store.state.audio.playList[this.$store.state.audio.playIndex].singer;
			},
			allTime () {
				return this.$store.state.audio.playList[this.$store.state.audio.playIndex].allTime;
			},
			lyric (){
				return this.$store.state.audio.playList[this.$store.state.audio.playIndex].lyric;
			},
			cover () {
				return this.$store.state.audio.playList[this.$store.state.audio.playIndex].songCover;
			},
			nowTime () {
				return this.$store.state.audio.nowTime;
			},
			playWay () {
				return this.$store.state.audio.playWay;
			}
		},
		components: {
			MessageBox,
			List
		},
		methods: {
			deleteSong: function(index) {
				this.$emit('deleteSong', index);
			},
			listChangeSong: function(index) {
				this.$emit('changeSong', index);
				this.$store.commit('changeNowTime', '00:00');
				document.getElementById('time-ball').style.left = '7.5rem';
				document.getElementById('time-axis-now').style.width = '0';
			},
			changeProgress: function(event) {
				let nowWidth = parseInt(event.pageX) - this.offsetLeft;
				let time = dealTime.clickProgress(nowWidth, this.progressWidth, this.allTime);
				this.$store.commit('changeNowTime', time[0]);
				this.progressAndLyric();
				document.getElementsByTagName('audio')[0].currentTime = time[1];
			},	
			nextSong: function(direction) {
				this.$store.commit('changeNowTime', '00:00');
				document.getElementById('time-ball').style.left = '7.5rem';
				document.getElementById('time-axis-now').style.width = '0';
				this.$emit('nextSong', direction);
			},
			pauseAndPlay: function() {
				let audio = document.getElementsByTagName('audio')[0];
				if(audio.paused) {
					audio.play();
					this.playSatus = 'play';
					this.$store.commit('changePlayStatus', 'play');
				}
				else {
					audio.pause();
					this.playSatus = 'paused';
					this.$store.commit('changePlayStatus', 'paused');
				}
			},
			changeStatus : function(status) {
				this.hasMessage = true;
				switch(status) {
					case 'random': this.$store.commit('changePlayWay', 'listCircle'); this.message = '列表循环'; break;
					case 'listCircle': this.$store.commit('changePlayWay', 'singleCircle'); this.message = '单曲循环'; break;
					case 'singleCircle': this.$store.commit('changePlayWay', 'random'); this.message = '随机播放'; break;
					default: break;
				}
				var _this = this;
				setTimeout(function() {
					_this.hasMessage = false;
				}, 2000);
			},
			progressAndLyric: function() {
				let distance = dealTime.calDistance(this.nowTime, this.allTime);
				document.getElementById('time-ball').style.left = 7.5 + distance + 'rem';
				document.getElementById('time-axis-now').style.width = distance + 'rem';
				var sliceDis = dealTime.lyricMove(this.lyric.timeArr, this.nowTime);
				for(var i = 0; i < document.getElementsByClassName('lyric-item').length; i++) {
					document.getElementsByClassName('lyric-item')[i].style.transform = 'translateY(' + (-sliceDis) + 'rem)';
				}	
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../sass/play.scss';
</style>