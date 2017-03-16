<template>
	<div id="playlist">
		<h3>全部歌单</h3>
		<div class="playlist-list">
			<div class="list-item" v-for="list in playList">
				<div class="img">
					<img :src="list.cover">
					<p class="author"><i class="fa fa-user-o"></i> {{ list.author }}</p>
				</div>
				<p class="name">{{ list.name }}</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: () => {
			return {
				playList : [
					{
						cover : 'https://p.qpic.cn/music_cover/hVUsfUFG2DV466URqw7PT06HzicL1d5EU1pfmiau0N1UTs8OUyZh7eHw/600',
						name : '编辑推荐｜哎呦，这个调调永远那么的周杰伦',
						author : '风动云动'
					},
					{
						cover : 'https://p.qpic.cn/music_cover/xy585mIRLoGjBb9SibEqA5ng8ENKCAWEheDKGyPor1PV2NSIPNTicDwQ/600',
						name : '我落泪情绪零碎，周杰伦',
						author : '飒然风影'
					},
					{
						cover : 'https://p.qpic.cn/music_cover/VhiacR5mggSiaLuvDtyVoqZuDCLT5aYdtpHFPHUGJz9AqAv0QlEtvA1g/600',
						name : '华语最强现场：林俊杰Live歌曲精选',
						author : 'zimmmming'
					},
					{
						cover : 'https://p.qpic.cn/music_cover/CJ35Z2cnZA0kWwtIMrxsbtYdQVmicKHvbrXB3xDd3Eh2rWX6yvkMiaww/600',
						name : '盘点林俊杰亲自谱写并演绎的歌曲',
						author : '霜'
					},
					{
						cover : 'https://p.qpic.cn/music_cover/e4us58fDgLVdxdbgmSUdTJGGr1Avk8sJneW2QCZnokSfbm7ctibHFpA/600',
						name : '幽幽古风 音拂心田',
						author : '锦瑟浮生'
					},
					{
						cover : 'https://p.qpic.cn/music_cover/ZDzylthJUx5Iia2n1lmQhrZZZlyz7vBQcv69QGwgEHPupm30GVVialdg/600',
						name : '古风之韵，淡薄之境',
						author : '荼蘼花事了'
					}
				]
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../sass/playlist.scss';
</style>