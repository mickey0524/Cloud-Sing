import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// import Index from '../components/Index.vue'
import Home from '../components/Home.vue'
import Play from '../components/Play.vue'
import Detail from '../components/Detail.vue'
import Search from '../components/Search.vue'
import Playlist from '../components/Playlist.vue'
import Singer from '../components/Singer.vue'
import Album from '../components/Album.vue'

export default new VueRouter({
	mode: 'history',
	routes: [
		// {
		// 	path: '',
		// 	component: Index,
		// 	children: [
				{ 
					path: '', 
					component: Home,
				    children: [
				  		{ path: '', component: Search },
				  		{ path: 'playlist', component: Playlist },
				  		{ path: 'singer', component: Singer },
				  		{ path: 'album', component: Album }
				  	]
				},
				{ path: '/play', component: Play },
				{ path: '/detail', component: Detail },
				{ path: '*', redirect: '/home' }
			// ]
		// }
	],
	scrollBehavior: (to, from, savedPosition) => ({ x: 0, y: 0 })
});
