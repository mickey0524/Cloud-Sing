const express = require('express');
const superAgent = require('superagent');
const musicAPI = require('music-api');
const bodyParser = require('body-parser');
const router = express.Router();

router.post('/getSinger', bodyParser.json(), (req, res) => {
    musicAPI.searchSong('netease', {
        key: req.body.singerName,
        limit: 20,
        page: 1,
        raw: false
    })
    .then((response) => {
        let songResult = [];
        let cover = response.songList[1].album.coverBig;
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
        res.send({
            cover,
            songResult
        });
    })
    .catch((err) => { console.log(err); })
})

router.post('/searchSinger', bodyParser.json(), (req, res) => {
    musicAPI.searchSong('netease', {
        key: req.body.searchContent,
        limit: 2,
        page: 1
    })
    .then((response) => {
        res.send([{
            name: req.body.searchContent,
            avatar: response.songList[0].album.coverSmall
        }]);
    })
    .catch((err) => console.log(err))
});

module.exports = router;
