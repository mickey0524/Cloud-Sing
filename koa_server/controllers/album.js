const musicAPI = require('music-api');

var getAlbum = async (ctx, next) => {
    let response = await musicAPI.getAlbum('netease', {
        id: ctx.request.body.albumId,
        raw: false
    });
    let author = response.artist.name;
    let avatar = response.coverSmall;
    let songResult = [];
    for(var i in response.songList) {
        let singer = '';
        for(var j in response.songList[i].artists) {
            singer += response.songList[i].artists[j].name + '/';
        }
        songResult.push({
            songId: response.songList[i].id,
            songName: response.songList[i].name,
            author: singer.slice(0, singer.length - 1)
        })
    }  
    ctx.body = {
        author,
        avatar,
        songResult
    }
    await next();
}

var searchAlbum = async (ctx, next) => {
    let response = await musicAPI.searchAlbum('netease', {
        key: ctx.request.body.searchContent,
        limit: 8,
        page: 1
    })
    let result = [];
    for(let i in response.albumList) {
        result.push({
            name: response.albumList[i].name,
            cover: response.albumList[i].coverBig,
            albumId: response.albumList[i].id
        });
    }
    ctx.body = result;
    await next();
}

module.exports = {
    'POST /getAlbum': getAlbum,
    'POST /searchAlbum': searchAlbum
}