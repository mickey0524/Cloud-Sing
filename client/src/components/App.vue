<template>
    <div id="app">
        <Index></Index>
    </div>
</template>

<script>
    import Index from './Index.vue'
    export default {
        name: 'app',
        components: {
            Index
        }
    }
</script>


<style>
    @import url("../css/animate.css");
    * {
        margin: 0;
        padding: 0;
        font-family: 'Microsoft Yahei';
    }

    a {
        text-decoration:none;
    }

    ::-webkit-scrollbar{width: 0;}
</style>
