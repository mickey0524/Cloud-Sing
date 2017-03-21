import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import dealLyric from '../js/dealLyric.js'
import initData from '../js/initData.json'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		indexCurrentPage: '',
		audio: {
			playList: [],
			nowTime: '00:00',
			isPlaying: false,   //代表当前是否有歌曲进入audio标签，与歌曲播放状态和暂停状态无关
			playStatus: 'paused',  //播放还是暂停
			playWay: 'random', //代表播放模式
			playIndex: 0 //代表当前audio内在播放playList中索引为playIndex的歌曲
		},
		detail: {},
		songList: initData.songList,
		playList: initData.playList,
		singerList: initData.singerList,
		albumList: initData.albumList
	},
	mutations: {
		routeToHomeChild (state, child) {
			state.indexCurrentPage = child;
		},
		beginPlay (state) {
			state.audio.isPlaying = true;  
			state.audio.playStatus = 'play';
		},
		changeNowTime (state, nowTime) {
			state.audio.nowTime = nowTime;
		},
		changePlayStatus (state, status) {
			state.audio.playStatus = status;
		},
		addToPlayList (state, song) {
			state.audio.playList.push(song);
		},
		changePlayIndex (state, index) {
			state.audio.playIndex = index;
		},
		changePlayWay (state, way) {
			state.audio.playWay = way;
		},
		setDetail (state, detail) {
			state.detail = detail;
		},
		changeSongList (state, songList) {
			state.songList = songList;
		},
		changePlayList (state, playList) {
			state.playList = playList;
		},
		changeSingerList (state, singerList) {
			state.singerList = singerList;
		},
		changeAlbumList (state, albumList) {
			state.albumList = albumList;
		},
		deleteSong (state, index) {
			state.audio.playList.splice(index, 1);
		},
		deleteAll (state) {
			state.audio.playList.splice(state.audio.playIndex + 1, state.audio.playList.length - state.audio.playIndex - 1);
			state.audio.playList.splice(0, state.audio.playIndex);
			state.audio.playIndex = 0;
		}
	}
});