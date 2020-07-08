<template>
  <div class="reveal">
    <div class="slides">
      <section class="present" style="top: 169px; display: block;">
        <h1>V8</h1>
        <h3>V8 javascript engine</h3>
        <p>
          <small>비즈서비스 개발팀  <a href="">박관후</a> / <a href="">ghpark@daou.co.kr</a></small>
        </p>
      </section>
      <section>Slide1</section>
      <section>Slide2</section>
    </div>
  </div>
</template>
<script>
import Reveal from 'reveal.js/dist/reveal'
export default {
  name: 'V8Engine',
  mounted() {
    Reveal.initialize()
  }
}
</script>
<style scoped>
  @import url('../../node_modules/reveal.js/dist/reveal.css');
  @import url('../../node_modules/reveal.js/dist/theme/black.css');
</style>
