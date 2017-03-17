function dealLyric(lyric) {
	lyric = lyric.split('\n');
	var lyricArr = [];
	var timeArr = [];
	for(var i in lyric) {
	    var time = lyric[i].slice(1, lyric[i].indexOf(']'));
	    time = time.replace('.', ':');
	    var singleLyric = lyric[i].slice(lyric[i].indexOf(']') + 1);
	    time = time.split(':');
	    time.pop();
	    time = time.join(':');
	    lyricArr.push(singleLyric);
	    timeArr.push(time);
	}	
	
	return {
		timeArr : timeArr,
		lyricArr : lyricArr
	}
}

module.exports = dealLyric;