const express = require('express');
const musicAPI = require('music-api');
const superAgent = require('superagent');
const eventProxy = require('eventproxy');
const bodyParser = require('body-parser');
const router = express.Router();

router.post('/getPlaylist', bodyParser.json(), (req, res) => {
    musicAPI.getPlaylist('netease', {
        id: req.body.playlistId,
        raw: false
    })
    .then((response) => {
        let songAvatar = response.author.avatar;
        let songList = response.songList;
        let songResult = [];
        for(var i = 0; i < songList.length && i < 20; i++) {
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
        res.send({
            songAvatar,
            songResult
        });
    })
    .catch((err) => { console.log(err); })
});

module.exports = router;