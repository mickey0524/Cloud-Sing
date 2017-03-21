<template>
	<div id="list">
		<MessageBox v-if="hasMessage" :mes="message"></MessageBox>
		<div class="top-controls">
			<i class="fa fa-random" aria-hidden="true" v-if="playWay == 'random'" @click="changeStatus('random')"></i>
			<i class="fa fa-rotate-right" aria-hidden="true" v-if="playWay == 'listCircle'" @click="changeStatus('listCircle')"></i>
			<i class="fa fa-history" aria-hidden="true" v-if="playWay == 'singleCircle'" @click="changeStatus('singleCircle')"></i>
			<span v-if="playWay == 'random'" @click="changeStatus('random')">随机播放</span>
			<span v-if="playWay == 'listCircle'" @click="changeStatus('listCircle')">列表循环</span>
			<span v-if="playWay == 'singleCircle'" @click="changeStatus('singleCircle')">单曲循环</span>
			<span>({{ listNum }})</span>
			<div class="clear" @click="deleteAll">
				<i class="fa fa-trash-o" aria-hidden="true"></i>
				<span>清空</span>
			</div>
		</div>
		<div class="playList">
			<div class="playList-item" v-for="(item, index) in playlist">
				<div class="song-mes" @click="changeSong(index)" :class="{'active' : index == playIndex}">
					<i class="fa fa-volume-up" aria-hidden="true" v-if="index == playIndex"></i>
					<span>{{ item.name }}</span>
					<span> - {{ item.singer }}</span>				
				</div>
				<span @click="deleteSong(index)">X</span>
			</div>
		</div>
		<div class="bottom-controls" @click="$emit('close');">
			<p>关闭</p>
		</div>
	</div>
</template>

<script>
	import MessageBox from './MessageBox.vue'
	export default {
		computed: {
			listNum () {
				return this.$store.state.audio.playList.length;
			},
			playWay () {
				return this.$store.state.audio.playWay;
			},
			playlist () {
				return this.$store.state.audio.playList;
			},
			playIndex () {
				return this.$store.state.audio.playIndex;
			}
		},
		data () {
			return {
				message: '',
				hasMessage: false
			}
		},
		components: {
			MessageBox
		},
		methods: {
			changeStatus (status) {
				var _this = this;
				switch(status) {
					case 'random': this.$store.commit('changePlayWay', 'listCircle'); this.message = '列表循环'; break;
					case 'listCircle': this.$store.commit('changePlayWay', 'singleCircle'); this.message = '单曲循环'; break;
					case 'singleCircle': this.$store.commit('changePlayWay', 'random'); this.message = '随机播放'; break;
					default: break;
				}
				this.hasMessage = true;
				setTimeout(function() {
					_this.hasMessage = false;
				}, 2000);
			},
			changeSong (index) {
				if(index != this.playIndex) {
					this.$emit('changeSong', index);
				}
			},
			deleteSong (index) {
				// console.log('asd');
				var _this = this;
				if(this.playlist.length == 1) {
					this.message = '只有一首歌不让删';
					this.hasMessage = true;
					setTimeout(function() {
						_this.hasMessage = false;
					}, 2000);
				}
				else {
					if(index == this.playIndex) {
						this.$emit('deleteSong', index);
					}
					else {
						this.$store.commit('deleteSong', index);
					}					
					this.message = '成功删除';
					this.hasMessage = true;
					setTimeout(function() {
						_this.hasMessage = false;
					}, 2000);
				}
			},
			deleteAll () {
				let _this = this;
				this.$store.commit('deleteAll');
				this.message = '全部清空';
				this.hasMessage = true;
				setTimeout(function() {
					_this.hasMessage = false;
				}, 2000);
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../sass/list.scss';
</style>