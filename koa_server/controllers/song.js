const musicAPI = require('music-api');
const superAgent = require('superagent');

var getSongMes = async (ctx, next) => {
    let { songId, songName } = ctx.request.body;
    let [ address, duration, lyric, cover ] = await Promise.all([ getAddress(songId), getDuration(songId), getLyric(songId), getCover(songId, songName) ]);
    ctx.body = {
        songAddress: address.url,
        songDuration: changeTime(duration),
        songLyric: lyric,
        songCover: cover       
    }
    await next();
}

var getAddress = async (songId) => {
    return musicAPI.getSong('netease', {
        id: String(songId),
        raw: false
    })
}

var getDuration = async (songId) => {
    let url = 'http://music.163.com/api/song/detail/?ids=[' + encodeURIComponent(songId) + ']';
    return new Promise((resolve, reject) => {
        superAgent.get(url)
            .end(function(err, result) {
                if(!err) {
                    let obj = JSON.parse(result.text);
                    let duration = obj['songs'][0].duration;
                    resolve(duration);
                }
            })
    })
}

var getLyric = async (songId) => {
    let url = 'http://music.163.com/api/song/lyric?os=pc&id=' + encodeURIComponent(songId) + '&lv=-1&kv=-1&tv=-1';
    return new Promise((resolve, reject) => {
        superAgent.get(url)
            .end(function(err, result) {
                if(!err) {
                    let obj = JSON.parse(result.text);
                    let lyric = obj.lrc.lyric;
                    resolve(lyric.slice(0, lyric.length - 1));
                }
            })        
    })
}

var getCover = async (songId, songName) => {
    return new Promise((resolve, reject) => {
        musicAPI.searchSong('netease', {
            key: songName,
            limit: 20,
            page: 1,
        })
        .then((response) => { 
            for(var i in response.songList) {
                if(response.songList[i].id == songId) {
                    let cover = response.songList[i].album.coverBig;
                    resolve(cover);
                }
                if(i == response.songList[i].length - 1) {
                    cover = response.songList[0].album.coverBig;
                    resolve(cover);
                }
            }    
        })
    });
}

var searchSong = async (ctx, next) => {
    let searchContent = ctx.request.body.searchContent;
    let songList = await getSongList(searchContent);
    ctx.body = songList;
    await next();
}

var getSongList = async (searchContent) => {
    return new Promise((resolve, reject) => {
        musicAPI.searchSong('netease', {
            key: searchContent,
            limit: 20,
            page: 1,
            raw: false
        })
        .then((response) => {
            let result = [];
            for(var i in response.songList) {
                let singer = '';
                for(var j in response.songList[i].artists) {
                    singer += response.songList[i].artists[j].name + '/';
                }
                result.push({
                    singer: singer.slice(0, singer.length - 1),
                    name: response.songList[i].name,
                    album: response.songList[i].album.name,
                    songId: response.songList[i].id,
                    isAdd: false
                });
            }
            resolve(result);
        });     
    }); 
}

function changeTime(time) {
    time = parseInt(time / 1000);
    let minute = parseInt(time / 60);
    let second = time % 60;
    if(second < 10) {
        second = '0' + second;
    }
    return '0' + minute + ':' + second;
}

module.exports = {
    'POST /getSongMes': getSongMes,
    'POST /searchSong': searchSong
}