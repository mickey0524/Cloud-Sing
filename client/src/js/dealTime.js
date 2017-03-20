/**
 * 每秒更改当前时间
 */
exports.changeNowtime = function(time) {
	time = time.split(':');
	var minute = parseInt(time[0]);
	var second = parseInt(time[1]);
	second += 1;
	if(second == 60) {
		second = 0;
		minute += 1;
	}
	second = addZero(second);
	minute = addZero(minute);
	return minute + ':' + second;
}

/**
 * 移动进度条(45是因为总进度条是45rem)
 */
exports.calDistance = function(nowTime, allTime) {
	allTime = changeTimeFormat(allTime);
	nowTime = changeTimeFormat(nowTime);
	return nowTime / allTime * 45;
}

/**
 * 计算歌词需要移动的距离
 */
exports.lyricMove = function(timeArray, nowTime) {
	//console.log(timeArray);
	var distance = 0;
	nowTime = changeTimeFormat(nowTime);
	for(var i in timeArray) {
		if(changeTimeFormat(timeArray[i]) <= nowTime) {
			distance += 4.2;
		}
	}
	distance = (distance > 0) ? distance - 4.2 : 0;
	return distance;
}

/**
 * 从Home页面切换到Play页面的时候，记录当前歌曲时间
 */
exports.getNowTime = function(second) {
	second = Math.round(second);
	var minute = addZero(parseInt(second / 60));
	second = addZero(second % 60);
	return minute + ':' + second;
}

/**
 * 点击进度条计算当前时间
 */
exports.clickProgress = function(nowWidth, allWidth, allTime) {
	allTime = allTime.split(':');
	let allSecond = parseInt(allTime[0]) * 60 + parseInt(allTime[1]);
	let nowTime = parseInt(allSecond * (nowWidth / allWidth));
	let minute = addZero(parseInt(nowTime / 60));
	let second = addZero(nowTime % 60);
	return [ minute + ':' + second, nowTime ];
}

/**
 * 给数字加上前导零
 */
function addZero(num) {
	return (num <= 9) ? '0' + num : num;
}

function changeTimeFormat(time) {
	time = time.split(':');
	return parseInt(time[0]) * 60 + parseInt(time[1]);
}