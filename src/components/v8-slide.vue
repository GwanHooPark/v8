<template>
  <div class="reveal">
    <div class="slides">
      <section class="present" style="display: block;">
        <h1>V8</h1>
        <h2>V8 JavaScript Engine</h2>
        <p>
          <small>비즈서비스 개발팀  <a href="">박관후</a> / <a href="">ghpark@daou.co.kr</a></small>
        </p>
        <p class="subtitle fragment fade-in-then-out">안녕하세요. 이틀차 첫번째 발표를 맡게된 비즈서비스 개발팀 박관후 입니다.</p>
        <p class="subtitle fragment fade-in-then-out">저는 자바스크립트엔진의 한 종류인 V8엔진에 대해 말씀드리려 합니다.</p>
      </section>
      <section>
        <div class="title">Index</div>

        <h3>1.Javascript Engine</h3>
        <h3>2.V8 특징</h3>
        <h3>3.Javascript engine 작동원리</h3>
        <h3>4.최적화 조건</h3>
        <h3>5.처리성능 향상 기법</h3>
        <p class="subtitle fragment fade-in-then-out">목차를 말슴드리면</p>
        <p class="subtitle fragment fade-in-then-out">첫번째는 자바스크립트엔진이란 무엇인가</p>
        <p class="subtitle fragment fade-in-then-out">첫번째는 자바스크립트엔진이란 무엇인가</p>
      </section>
      <section><img src="../assets/logo.png"/></section>
      <section data-markdown>
        <textarea data-template>
          ```js [1-2|3|4]
          let a = 1;
          let b = 2;
          let c= x => 1 + 2 + x;
          c(3);
          ```
        </textarea>
      </section>
      <section>
        <h2>test</h2>
        <pre><code class="javascript" data-trim data-line-numbers="1|1-2|1-3|1-4">
          let a = 1;
          let b = 2;
          let c= x => 1 + 2 + x;
          c(3);
        </code></pre>
      </section>
    </div>
  </div>
</template>
<script>
import Reveal from 'reveal.js/dist/reveal'
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown'
import RevealHighLight from 'reveal.js/plugin/highlight/highlight'
export default {
  name: 'V8Engine',
  mounted() {
    Reveal.initialize({
      plugins: [ RevealMarkdown, RevealHighLight]
    })
  }
}
</script>
<style scoped>
  @import url('../../node_modules/reveal.js/dist/reveal.css');
  @import url('../../node_modules/reveal.js/dist/theme/moon.css');
  @import url('../../node_modules/reveal.js/plugin/highlight/monokai.css');
  .reveal h2 {
    text-transform: none !important;
  }
  section div.title {
    position: absolute;
    top : 0px;
    left : 0px;
    border-bottom: 3px solid #ccc;
    padding: 25px 10px 10px 0;
    margin: 0 0 25px 0;
  }
  .subtitle {
    position : absolute;
    font-family: "Nanum Gothic";
    font-size: 30px;
    background : black;

  }
</style>
