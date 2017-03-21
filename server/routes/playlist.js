const express = require('express');
const musicAPI = require('music-api');
const superAgent = require('superagent');
const eventProxy = require('eventproxy');
const bodyParser = require('body-parser');
const router = express.Router();

router.post('/getPlaylist', bodyParser.json(), (req, res) => {
    musicAPI.getPlaylist('netease', {
        id: req.body.playlistId
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
    .catch((err) => { 
        musicAPI.getPlaylist('netease', {
            id: req.body.playlistId,
            raw: true
        })
        .then((response) => {
            let songAvatar = response.playlist.creator.avatarUrl;
            let songList = response.playlist.tracks;
            let songResult = [];
            for(var i = 0; i < songList.length && i < 20; i++) {
                let singer = '';
                for(var j in songList[i].ar) {
                    singer += songList[i].ar[j].name + '/';
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
        .catch((err) => { console.log(err) })
    })
});

router.post('/searchPlaylist', bodyParser.json(), (req, res) => {
    musicAPI.searchPlaylist('netease', {
        key: req.body.searchContent,
        limit: 8,
        page: 1,
        raw: false
    })
    .then((response) => {
        let result = [];
        for(var i in response.playlists) {
            result.push({
                cover: response.playlists[i].coverBig,
                name: response.playlists[i].name,
                author: response.playlists[i].author.name,
                playlistId: response.playlists[i].id
            });
        }
        res.send(result);
    })
    .catch((err) => { console.log(err) })
});

module.exports = router;