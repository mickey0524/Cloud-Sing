<template>
	<div id="play">
		<MessageBox v-if="hasMessage"></MessageBox>
		<audio id="audio" :src="songAddress"></audio>
		<img :src="songCover">
		<div class="mask"></div>
		<div class="top-control">
			<i class="fa fa-angle-left" aria-hidden="true"></i>
			<div class="song-mes">
				<p>{{ name }}</p>
				<p>{{ author }}</p>
			</div>
		</div>
		<div class="song">
			<img :src="songCover">
			<div class="lyric">
				<div class="lyric-item" v-for="item in lyric.lyricArr">
					<p>{{ item }}</p>
				</div>
			</div>
		</div>
		<div class="hand-audio">
			<span id="now-time">{{ nowTime }}</span>
			<div id="time-axis-all"></div>
			<div id="time-axis-now"></div>
			<div id="time-ball"></div>
			<span id="all-time">{{ allTime }}</span>
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
			document.getElementsByTagName('audio')[0].play();
			setInterval(function() {
				if(_this.playSatus == 'play') {
					_this.nowTime = dealTime.changeNowtime(_this.nowTime);
					let distance = dealTime.calDistance(_this.nowTime, _this.allTime);
					//console.log(distance);
					document.getElementById('time-ball').style.left = 7.5 + distance + 'rem';
					document.getElementById('time-axis-now').style.width = distance + 'rem';
					var sliceDis = dealTime.lyricMove(_this.lyric.timeArr, _this.nowTime);
					for(var i = 0; i < document.getElementsByClassName('lyric-item').length; i++) {
						//console.log(i);
						document.getElementsByClassName('lyric-item')[i].style.transform = 'translateY(' + (-sliceDis) + 'rem)';
					}
				}
			}, 1000);
		},
		data: () => {
			return {
				marginDistance: 0,
				name : '告白气球',
				author : '周杰伦',
				playWay : 'random',
				songCover : 'https://p4.music.126.net/cUTk0ewrQtYGP2YpPZoUng==/3265549553028224.jpg?param=400y400',
				lyric: dealLyric('[00:00.00] 作曲 : 周杰伦\n[00:01.00] 作词 : 方文山\n[00:24.32]塞纳河畔 左岸的咖啡\n[00:26.67]我手一杯 品尝你的美\n[00:30.08]留下唇印的嘴\n[00:35.02]花店玫瑰 名字写错谁\n[00:37.74]告白气球 风吹到对街\n[00:40.71]微笑在天上飞\n[00:44.79]你说你有点难追 想让我知难而退\n[00:49.84]礼物不需挑最贵 只要香榭的落叶\n[00:55.22]喔 营造浪漫的约会 不害怕搞砸一切\n[01:00.54]拥有你就拥有 全世界\n[01:05.92]亲爱的 爱上你 从那天起\n[01:12.19]甜蜜的很轻易\n[01:16.57]亲爱的 别任性 你的眼睛\n[01:22.59]在说我愿意\n[01:28.59]\n[01:34.00]\n[01:40.69]\n[01:49.68]塞纳河畔 左岸的咖啡\n[01:52.08]我手一杯 品尝你的美\n[01:55.80]留下唇印的嘴\n[01:59.89]花店玫瑰 名字写错谁\n[02:02.64]告白气球 风吹到对街\n[02:05.91]微笑在天上飞\n[02:09.95]你说你有点难追 想让我知难而退\n[02:14.84]礼物不需挑最贵 只要香榭的落叶\n[02:20.09]喔 营造浪漫的约会 不害怕搞砸一切\n[02:25.65]拥有你就拥有 全世界\n[02:30.86]亲爱的 爱上你 从那天起\n[02:37.03]甜蜜的很轻易\n[02:41.97]亲爱的 别任性 你的眼睛\n[02:47.89]在说我愿意\n[02:52.58]亲爱的 爱上你 恋爱日记\n[02:58.61]飘香水的记忆\n[03:03.11]一整瓶 的梦境 全都有你\n[03:09.15]搅拌在一起\n[03:13.55]亲爱的别任性 你的眼睛\n[03:21.91]在说我愿意'),
				allTime: '03:35',
				nowTime: '00:00',
				songAddress: 'http://m10.music.126.net/20170317212224/0e17fc37b5dd799569973a7016c8338a/ymusic/6e01/a4d4/bbef/2dda07904eb54d44abb278165e1c6ead.mp3',
				playSatus: 'play',
				hasMessage: false
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
					case 'random': this.playWay = 'listCircle'; break;
					case 'listCircle': this.playWay = 'singleCircle'; break;
					case 'singleCircle': this.playWay = 'random'; break;
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