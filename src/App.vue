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
        border-bottom: 3px solid #ccc;
        padding: 25px 10px 10px 0;
        margin: 0 0 25px 0;
        display: block;
        width: 100%;
        text-align: left;
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