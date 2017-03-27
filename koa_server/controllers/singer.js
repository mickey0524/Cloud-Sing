const musicAPI = require('music-api');
const superAgent = require('superagent');

var getSinger = async (ctx, next) => {
    let singerName = ctx.request.body.singerName;
    let response = await musicAPI.searchSong('netease', {
        key: singerName,
        limie: 20,
        page: 1,
        raw: false
    });
    let songResult = [];
    let cover = response.songList[1].album.coverBig;
    for (let i in response.songList) {
        let singer = '';
        for (var j in response.songList[i].artists) {
            singer += response.songList[i].artists[j].name + '/';
        }
        songResult.push({
            songId: response.songList[i].id,
            songName: response.songList[i].name,
            author: singer.slice(0, singer.length - 1)
        })
    }
    ctx.body = {
        cover,
        songResult
    }
    await next();
}

var searchSinger = async (ctx, next) => {
    let searchContent = ctx.request.body.searchContent;
    let response = await musicAPI.searchSong('netease', {
        key: searchContent,
        limit: 2,
        page: 1
    });
    ctx.body = [{
        name: searchContent,
        avatar: response.songList[0].album.coverSmall
    }];
    await next();
}

module.exports = {
    'POST /getSinger': getSinger,
    'POST /searchSinger': searchSinger
}