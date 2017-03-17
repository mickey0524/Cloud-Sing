exports.changeNowtime = function(time) {
	time = time.split(':');
	var minute = parseInt(time[0]);
	var second = parseInt(time[1]);
	second += 1;
	if(second == 60) {
		second = 0;
		minute += 1;
	}
	if(second <= 9) {
		second = '0' + String(second);
	}
	if(minute <= 9) {
		minute = '0' + String(minute);
	}
	return minute + ':' + second;
}

exports.calDistance = function(nowTime, allTime) {
	allTime = changeTimeFormat(allTime);
	nowTime = changeTimeFormat(nowTime);
	return nowTime / allTime * 45;
}

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

function changeTimeFormat(time) {
	time = time.split(':');
	return parseInt(time[0]) * 60 + parseInt(time[1]);
}