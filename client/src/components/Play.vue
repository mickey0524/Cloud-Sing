<template>
	<div id="play">
		<MessageBox v-if="hasMessage" :mes="message"></MessageBox>
		<!-- <audio id="audio" :src="songAddress"></audio> -->
		<img :src="$store.state.audio.playList[0].songCover">
		<div class="mask"></div>
		<div class="top-control">
			<i class="fa fa-angle-left" aria-hidden="true" @click="$router.go(-1)"></i>
			<div class="song-mes">
				<p>{{ $store.state.audio.playList[0].name }}</p>
				<p>{{ $store.state.audio.playList[0].author }}</p>
			</div>
		</div>
		<div class="song">
			<img :src="$store.state.audio.playList[0].songCover">
			<div class="lyric">
				<div class="lyric-item" v-for="item in $store.state.audio.playList[0].lyric.lyricArr">
					<p>{{ item }}</p>
				</div>
			</div>
		</div>
		<div class="hand-audio">
			<span id="now-time">{{ nowTime }}</span>
			<div id="time-axis-all"></div>
			<div id="time-axis-now"></div>
			<div id="time-ball"></div>
			<span id="all-time">{{ $store.state.audio.playList[0].allTime }}</span>
		</div>
		<div class="bottom-control">
			<i class="fa fa-random" aria-hidden="true" v-if="playWay == 'random'" @click="changeStatus('random')"></i>
			<i class="fa fa-rotate-right" aria-hidden="true" v-if="playWay == 'listCircle'" @click="changeStatus('listCircle')"></i>
			<i class="fa fa-history" aria-hidden="true" v-if="playWay == 'singleCircle'" @click="changeStatus('singleCircle')"></i>
			<i class="fa fa-step-backward" aria-hidden="true"></i>
			<i class="fa fa-pause-circle-o" aria-hidden="true" @click="pauseAndPlay" v-if="playSatus == 'play'"></i>
			<i class="fa fa-play-circle-o" aria-hidden="true" @click="pauseAndPlay" v-if="playSatus == 'paused'"></i>
			<i class="fa fa-step-forward" aria-hidden="true"></i>
			<i class="fa fa-list-ul" aria-hidden="true"></i>
		</div>
	</div>
</template>

<script>
	import dealLyric from '../js/dealLyric.js'
	import dealTime from '../js/dealTime.js'
	import MessageBox from './MessageBox.vue'
	export default {
		mounted: function() {
			var _this = this;
			this.nowTime = this.$store.state.audio.nowTime;
			this.playSatus = this.$store.state.audio.playStatus;
			setTimeout(function circle() {
				try {
					if(!document.getElementsByTagName('audio')[0].ended && _this.playSatus == 'play') {
						_this.nowTime = dealTime.changeNowtime(_this.nowTime);
						console.log(_this.nowTime);
						let distance = dealTime.calDistance(_this.nowTime, _this.$store.state.audio.playList[0].allTime);
						//console.log(distance);
						document.getElementById('time-ball').style.left = 7.5 + distance + 'rem';
						document.getElementById('time-axis-now').style.width = distance + 'rem';
						var sliceDis = dealTime.lyricMove(_this.$store.state.audio.playList[0].lyric.timeArr, _this.nowTime);
						for(var i = 0; i < document.getElementsByClassName('lyric-item').length; i++) {
							//console.log(i);
							document.getElementsByClassName('lyric-item')[i].style.transform = 'translateY(' + (-sliceDis) + 'rem)';
						}						
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
				playWay : 'random',
				nowTime: '',
				playSatus: 'play',
				hasMessage: false,
				message: ''
			}
		},
		components: {
			MessageBox
		},
		methods: {
			pauseAndPlay: function() {
				let audio = document.getElementsByTagName('audio')[0];
				if(audio.paused) {
					audio.play();
					this.playSatus = 'play';
				}
				else {
					audio.pause();
					this.playSatus = 'paused';
				}
			},
			changeStatus : function(status) {
				this.hasMessage = true;
				switch(status) {
					case 'random': this.playWay = 'listCircle'; this.message = '列表循环'; break;
					case 'listCircle': this.playWay = 'singleCircle'; this.message = '单曲循环'; break;
					case 'singleCircle': this.playWay = 'random'; this.message = '随机播放'; break;
					default: break;
				}
				var _this = this;
				setTimeout(function() {
					_this.hasMessage = false;
				}, 2000);
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../sass/play.scss';
</style>