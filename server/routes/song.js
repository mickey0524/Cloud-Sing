const express = require('express');
const musicAPI = require('music-api');
const superagent = require('superagent');
const bodyParser = require('body-parser');
const eventProxy = require('eventproxy');
const router = express.Router();

router.post('/getSongMes', bodyParser.json(), (req, res) => {
    let ep = new eventProxy();
    ep.all('address', 'duration', 'lyric', 'cover', function(address, duration, lyric, cover) {
        res.send({
            songAddress: address,
            songDuration: changeTime(duration),
            songLyric: lyric.slice(0, lyric.length - 1),
            songCover: cover
        });
    });
    musicAPI.getSong('netease', {
        id: String(req.body.songId),
        raw: false
    })
    .then((response) => {
        let address = response.url;
        ep.emit('address', address);
    })
    .catch((err) => { console.log(err); })
    let addresUrl = 'http://music.163.com/api/song/detail/?ids=[' + encodeURIComponent(req.body.songId) + ']';
    superagent.get(addresUrl)
        .end(function(err, result) {
            if(!err) {
                let obj = JSON.parse(result.text);
                let duration = obj['songs'][0].duration;
                ep.emit('duration', duration);
            }
        })
    let lyricUrl = 'http://music.163.com/api/song/lyric?os=pc&id=' + encodeURIComponent(req.body.songId) + '&lv=-1&kv=-1&tv=-1';
    superagent.get(lyricUrl)
        .end(function(err, result) {
            if(!err) {
                let obj = JSON.parse(result.text);
                let lyric = obj.lrc.lyric;
                ep.emit('lyric', lyric);
            }
        })
        // console.log(req.body.songName);
    musicAPI.searchSong('netease', {
        key: req.body.songName,
        limit: 10,
        page: 1,
    })
    .then((response) => { 
        for(var i in response.songList) {
            if(response.songList[i].id == req.body.songId) {
                let cover = response.songList[i].album.coverBig;
                ep.emit('cover', cover);
                break;
            }
        }    
    })
    .catch((err) => { console.log(err); })
});

function changeTime(time) {
    time = parseInt(time / 1000);
    let minute = parseInt(time / 60);
    let second = time % 60;
    if(second < 10) {
        second = '0' + second;
    }
    return '0' + minute + ':' + second;
}

module.exports = router;