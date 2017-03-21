const express = require('express');
const musicAPI = require('music-api');
const bodyParser = require('body-parser');
const router = express.Router();

router.post('/getAlbum', bodyParser.json(), (req, res) => {
    musicAPI.getAlbum('netease', {
        id: req.body.albumId,
        raw: false
    })
    .then((response) => {
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
        res.send({
            author,
            avatar,
            songResult
        });
    })
    .catch((err) => { console.log(err); })
});

router.post('/searchAlbum', bodyParser.json(), (req, res) => {
    musicAPI.searchAlbum('netease', {
        key: req.body.searchContent,
        limit: 8,
        page: 1
    })
    .then((response) => {
        let result = [];
        for(var i in response.albumList) {
            result.push({
                name: response.albumList[i].name,
                cover: response.albumList[i].coverBig,
                albumId: response.albumList[i].id
            });
        }
        res.send(result);
    })
    .catch((err) => console.log(err))
})

module.exports = router;