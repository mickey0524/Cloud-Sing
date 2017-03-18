<template>
    <div id="app">
        <audio :src="songAddress"></audio>
        <transition enter-active-class="animated fadeIn" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'app',
        mounted: function() {
            document.getElementsByTagName('audio')[0].play();
            this.$store.commit('beginPlay');
        },
        data: function() {
            return {
                songAddress: this.$store.state.audio.playList[0].songAddress
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
