<template>
    <router-view />
</template>
<style>
    @import url('../node_modules/reveal.js/dist/reveal.css');
    @import url('../node_modules/reveal.js/dist/theme/moon.css');
    @import url('../node_modules/reveal.js/plugin/highlight/monokai.css');
    .reveal {
        font-family: 'Noto Sans KR', sans-serif;
    }
    .reveal img {
        margin : 10px 0 0 0 !important;
    }
    .reveal pre {
        font-size: 0.47em;
    }
    .reveal h2, .reveal h3, .reveal h4 {
        text-transform: none !important;
    }
    .reveal ul {
        list-style-type: none;
    }
    section div.title {
        position: fixed;
        top : -70px;
        border-bottom: 2px solid #ccc;
        display: block;
        text-align: left;
        margin-left: 100px;
    }
    div.title {
        padding: 20px;
        font-size: 30px;
    }
    .subtitle {
        position : absolute;
        font-family: "D2Coding";
        font-size: 30px;
        background : black;
    }
    ol li, ul li {
        margin: 15px 0;
    }
</style>