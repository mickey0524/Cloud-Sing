const musicAPI = require('music-api');
const superAgent = require('superagent');

var getPlaylist = async (ctx, next) => {
    let playlistId = ctx.request.body.playlistId;
    let list = await getSongList(playlistId);
    ctx.body = list;
    await next();
}

var getSongList = async (playlistId) => {
    return new Promise((resolve, reject) => {
        musicAPI.getPlaylist('netease', {
            id: playlistId
        })
        .then((response) => {
            let songAvatar = response.author.avatar;
            let songList = response.songList;
            let songResult = [];
            for(let i = 0; i < songList.length && i < 20; i++) {
                let singer = '';
                for(var j in songList[i].artists) {
                    singer += songList[i].artists[j].name + '/';
                }
                songResult.push({
                    songId: songList[i].id,
                    songName: songList[i].name,
                    author: singer.slice(0, singer.length - 1)
                });
            }
            resolve({
                songAvatar,
                songResult
            });            
        })
        .catch((err) => {
            musicAPI.getPlaylist('netease', {
                id: playlistId,
                raw: true
            })
            .then((response) => {
                let songAvatar = response.playlist.creator.avatarUrl;
                let songList = response.playlist.tracks;
                let songResult = [];
                for(let i = 0; i < songList.length && i < 20; i++) {
                    let singer = '';
                    for(let j in songList[i].ar) {
                        singer += songList[i].ar[j].name + '/';
                    }
                    songResult.push({
                        songId: songList[i].id,
                        songName: songList[i].name,
                        author: singer.slice(0, singer.length - 1)
                    });
                }
                resolve({
                    songAvatar,
                    songResult
                });             
            })
            // .catch((err) => { console.log(err) })
        });
    });
}

var searchPlaylist = async (ctx, next) => {
    let searchContent = ctx.request.body.searchContent;
    let response = await musicAPI.searchPlaylist('netease', {
        key: searchContent,
        limit: 8,
        page: 1,
        raw: false
    });
    let result = [];
    for(let i in response.playlists) {
        result.push({
            cover: response.playlists[i].coverBig,
            name: response.playlists[i].name,
            author: response.playlists[i].author.name,
            playlistId: response.playlists[i].id
        });
    }
    ctx.body = result;
    // .then((response) => {
    //     let result = [];
    //     for(let i in response.playlists) {
    //         result.push({
    //             cover: response.playlists[i].coverBig,
    //             name: response.playlists[i].name,
    //             author: response.playlists[i].author.name,
    //             playlistId: response.playlists[i].id
    //         });
    //     }     
        
    // })
     //ctx.body = result;  
    await next();
}

module.exports = {
    'POST /getPlaylist': getPlaylist,
    'POST /searchPlaylist': searchPlaylist
}