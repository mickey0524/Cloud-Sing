<template>
    <div id="app">
        <audio :src="songAddress"></audio>
        <transition enter-active-class="animated fadeIn" mode="out-in">
            <router-view @beginPlay="beginPlay" @nextSong="nextSong" @changeSong="changeSong" @deleteSong="deleteSong"></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        mounted () {
            var _this = this;
            setInterval(function() {
                if(_this.$store.state.audio.playStatus == 'play') {
                    if(document.getElementsByTagName('audio')[0].ended) {
                        _this.nextSong();
                    }
                }
            }, 1000);
        },        
        name: 'app',
        data: function() {
            return {
                songAddress: ''
            }
        },
        methods: {
            beginPlay: function(songAddress) {
                this.songAddress = songAddress;
                var _this = this;
                var timer = setInterval(function() {
                    if(document.getElementsByTagName('audio')[0].readyState) {
                        document.getElementsByTagName('audio')[0].play();
                        _this.$store.commit('beginPlay');              
                        clearInterval(timer);          
                    }
                }, 1000 / 60);
            },
            nextSong: function(direction) {
                this.$store.commit('changeNowTime', '00:00');
                let index;
                if(this.$store.state.audio.playWay == 'singleCircle') {
                    document.getElementsByTagName('audio')[0].currentTime = '0';
                    document.getElementsByTagName('audio')[0].play();
                }
                else {
                    if(this.$store.state.audio.playWay == 'random') {
                        index = Math.floor(Math.random() * this.$store.state.audio.playList.length);
                    }
                    else {
                        if(direction == 'right') {
                            index = (this.$store.state.audio.playIndex + 1) % this.$store.state.audio.playList.length;
                        }
                        else {
                            index = (this.$store.state.audio.playIndex - 1) % this.$store.state.audio.playList.length;
                            if(index < 0) {
                                index += this.$store.state.audio.playList.length;
                            }
                        }
                    }
                    if(this.$store.state.audio.playIndex == index) {
                        document.getElementsByTagName('audio')[0].currentTime = '0';
                        document.getElementsByTagName('audio')[0].play();
                    }
                    else {
                        this.$store.commit('changePlayIndex', index);
                        this.beginPlay(this.$store.state.audio.playList[index].songAddress);                    
                    }
                }
            },
            changeSong: function(index) {
                this.$store.commit('changePlayIndex', index);
                this.beginPlay(this.$store.state.audio.playList[index].songAddress);  
            },
            deleteSong: function(index) {
                if(index == this.$store.state.audio.playList.length - 1) {
                    index = 0;
                    this.$store.commit('changePlayIndex', index);
                }
                this.$store.commit('deleteSong', index);
                this.beginPlay(this.$store.state.audio.playList[index].songAddress);  
            }
        }
    }
</script>


<style>
    @import url("../css/animate.css");
    @import url("../css/font-awesome.min.css");
    * {
        margin: 0;
        padding: 0;
        font-family: 'Microsoft Yahei';
    }

    a {
        text-decoration:none;
    }

    ::-webkit-scrollbar{ width: 0; }   
</style>
