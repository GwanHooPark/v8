<template>
  <div class="reveal">
    <div class="title" id="title"></div>
    <div class="slides">
      <section class="present" style="display: block;">
        <h1>V8</h1>
        <h2>V8 JavaScript Engine</h2>
        <p>
          <small>비즈서비스 개발팀  <a href="">박관후</a> / <a href="">ghpark@daou.co.kr</a></small>
        </p>
        <p class="subtitle fragment fade-in-then-out">안녕하세요. 이틀차 첫번째 발표를 맡게된 비즈서비스 개발팀 박관후 입니다.</p>
        <p class="subtitle fragment fade-in-then-out">저는 JavaScript Engine의 한 종류인 V8엔진에 대해 말씀드리려 합니다.</p>
      </section>
      <section data-title="Index">
        <ol>
          <li>JavaScript Engine</li>
          <li>JavaScript Engine 작동원리</li>
          <li>최적화의 조건</li>
          <li>처리성능 향상 기법</li>
        </ol>
        <p class="subtitle fragment fade-in-then-out">순서를 보시면</p>
        <p class="subtitle fragment fade-in-then-out">첫번째로 자바스크립트 엔진이란 무엇이고 어떤것들이 있는지</p>
        <p class="subtitle fragment fade-in-then-out">그리고 이중에서 V8의 특징에 대해 간단히 알아보겠습니다.</p>
        <p class="subtitle fragment fade-in-then-out">두번째 순서는 공통적인 자바스크립트 엔진의 작동원리를 보시고</p>
        <p class="subtitle fragment fade-in-then-out">V8엔진에서는 어떻게 자바스크립트 코드를 최적화 하는지 알아보겠습니다.</p>
        <p class="subtitle fragment fade-in-then-out">세번째에서는 V8엔진에서 어떤조건을 만족할때 최적화를 하는지 알아보겠습니다.</p>
        <p class="subtitle fragment fade-in-then-out">그리고 마지막으로 V8엔진 입장에서 자바스크립트 처리성능 향상 팁을 알아보겠습니다.</p>
      </section>
      <section data-title="1.JavaScript Engine">
        <h3>JavaScript Engine 이란?</h3>
        <p>javascript 를 실행하는 프로그램 또는 인터프리터</p>
        <p class="subtitle fragment fade-in-then-out">자바스크립트 엔진이란 javascript 를 실행하는 프로그램 또는 인터프리터인데요.</p>
        <p class="subtitle fragment fade-in-then-out">가능한 짧은 시간 내에 가장 최적화된 코드를 생성하는 것이 목표입니다</p>
        <p class="subtitle fragment fade-in-then-out">일반적인 인터프리터로 구현될수도 있고, 뒤에서 설명하겠지만 JIT컴파일러로 구현할 수도 있습니다.</p>
        <p class="subtitle fragment fade-in-then-out">주로 웹브라우저를 위해 사용됩니다.</p>
      </section>
      <section data-title="1.JavaScript Engine">
        <h3>Javascript 엔진의 종류</h3>
        <ul>
          <li>- SpiderMonkey</li>
          <li>- Rhino </li>
          <li>- Chakra </li>
          <li>- JavaScript Core</li>
          <li>- V8</li>
        </ul>
        <p class="subtitle fragment fade-in-then-out">자바스크립트 엔진의 종류는 여러가지가 있습니다.</p>
        <p class="subtitle fragment fade-in-then-out">그중에서 대표적인 몇가지만 간단히 소개해드리면</p>
        <p class="subtitle fragment fade-in-then-out">SpiderMonkey라는 엔진은 최초의 자바스크립트 엔진이고 FireFox에서 사용합니다.</p>
        <p class="subtitle fragment fade-in-then-out">Rhino라는 엔진은 모질라 재단이 운영하고 자바로 개발되어있는것이 특징이고요.</p>
        <p class="subtitle fragment fade-in-then-out">Chakra는 마이크로소프트가 개발했고, Edge브라우저에서 사용중입니다.</p>
        <p class="subtitle fragment fade-in-then-out">그리고 JavaScript Core라는 엔진인데요.</p>
        <p class="subtitle fragment fade-in-then-out">WebKit 프레임워크에 포함되어있고 애플에서 개발하고 Safari와 React Native App에서 사용중입니다.</p>
        <p class="subtitle fragment fade-in-then-out">마지막으로 오늘 알아볼 V8 엔진이 있는데요.</p>
        <p class="subtitle fragment fade-in-then-out">구글에서 개발했고, C++로 작성되었습니다.</p>
        <p class="subtitle fragment fade-in-then-out">Chrome, Electron, Node.js에서 사용중입니다.</p>
        <p class="subtitle fragment fade-in-then-out">그러면 오늘 주제인 V8엔진에 대해 조금더 자세히 알아보겠습니다.</p>
      </section>
      <section data-title="1.JavaScript Engine">
        <h3>V8 특징</h3>
        <ul>
          <li>- 2006년 말 만들어진 JavaScript 엔진.</li>
          <li>- 오픈 소스 이며 C++로 만들어짐.</li>
          <li>- Chrome아 아니더라도 독립적으로 실행 가능하다.(Node.js, Electron) </li>
        </ul>
        <p class="subtitle fragment fade-in-then-out">V8의 특징을 조금더 보면</p>
        <p class="subtitle fragment fade-in-then-out">2006년말 구글에서 만든 자바스크립트 엔진입니다.</p>
        <p class="subtitle fragment fade-in-then-out">오픈소스 이며, C++로 만들어졌고요.</p>
        <p class="subtitle fragment fade-in-then-out">웹 브라우저 안에서 실행되는 javascript의 성능을 높이기 위해 처음 고안되었고요.</p>
        <p class="subtitle fragment fade-in-then-out">ECMA-262에 기재된 ECMAScript 및 WebAssembly를 처리할수 있습니다.</p>
        <p class="subtitle fragment fade-in-then-out">Chrome이 아니더라도 Node.js나 Electron에서 독립적으로 실행이 가능합니다.</p>
        <p class="subtitle fragment fade-in-then-out">한마디로 V8은 C++로 작성된 Google의 오픈소스 고성능 Javascript 및 웹 어셈블리 엔진 입니다.</p>
        <p class="subtitle fragment fade-in-then-out">실제로 v8은 C++프로그램으로 javascirpt 코드를 받아서 컴파일하고 실행합니다.</p>
      </section>
      <section data-title="2.JavaScript Engine 작동원리">
        <h3>JavaScript 엔진의 작동원리</h3>
        <ul>
          <li>- Just-in-Time Compilation (JITC)</li>
          <li>- JITC보다 interpreter가 더 낫다?</li>
          <li>- Adaptive JIT Compilation</li>
        </ul>
      </section>
      <section data-title="2.JavaScript Engine 작동원리"><img src="../assets/engine.png"/></section>
      <section data-title="2.JavaScript Engine 작동원리">
        <h3>V8</h3>
        <img src="../assets/engine2.png"/>
      </section>
      <section data-title="2.JavaScript Engine 작동원리">
        <h3>인터프리터(Ignition)</h3>
        <pre><code class="javascript" data-trim>
          function hello(name) {
            return `Hello, ${name}`;
          }
          console.log(hello('hoo');
        </code></pre>
        <pre><code class="shell" data-trim>
          $ node --print-bytecode hello.js
          [generated bytecode for function: SafeSet (0x02abe12c5871 &lt;SharedFunctionInfo SafeSet&gt;)]
          Parameter count 1
          Register count 5
          Frame size 40
                   000003325AA2BA8E @    0 : 89                CreateRestParameter
                   000003325AA2BA8F @    1 : 26 f9             Star r2
                   000003325AA2BA91 @    3 : 27 fe fa          Mov &lt;closure&gt;, r1
           3153 E> 000003325AA2BA94 @    6 : a7                StackCheck
           3153 S> 000003325AA2BA95 @    7 : 25 fa             Ldar r1
                   000003325AA2BA97 @    9 : 55 f7             GetSuperConstructor r4
                   000003325AA2BA99 @   11 : 25 fb             Ldar r0
           3153 E> 000003325AA2BA9B @   13 : 66 f7 f9 01 00    ConstructWithSpread r4, r2-r2, [0]
           3153 S> 000003325AA2BAA0 @   18 : ab                Return
          Constant pool (size = 0)
          Handler Table (size = 0)
        </code></pre>
      </section>
      <section data-title="2.JavaScript Engine 작동원리">
        <h3>Optimizing Compiler(TurboFan)</h3>
        <pre><code class="javascript" data-trim>
          function test() {
              const array = Array.from(arguments);
              return array.map(el => el * el)
                          .filter(el => el &lt; 20)
                          .reverse();
          }
          for (let i=0; i &lt; 100000; i++) {
              test(1,2,3,4,5);
          }
        </code></pre>
        <pre><code class="shell" data-trim data-line-numbers="1,2,11">
          $ node --trace-opt test.js
          [marking 0x02f422f09221 &lt;JSFunction (sfi = 00000021CFCD0F39)&gt; for optimized recompilation, reason: small function]
          [marking 0x0303a76b3b21 &lt;JSFunction (sfi = 00000021CFCD1891)&gt; for optimized recompilation, reason: small function]
          [compiling method 0x0303a76b3b21 &lt;JSFunction (sfi = 00000021CFCD1891)&gt; using TurboFan]
          [marking 0x0303a76b3bb1 &lt;JSFunction (sfi = 00000021CFCD18E1)&gt; for optimized recompilation, reason: small function]
          [compiling method 0x0303a76b3bb1 &lt;JSFunction (sfi = 00000021CFCD18E1)&gt; using TurboFan]
          [optimizing 0x0303a76b3b21 &lt;JSFunction (sfi = 00000021CFCD1891)&gt; - took 0.349, 0.382, 0.021 ms]
          [completed optimizing 0x0303a76b3b21 &lt;JSFunction (sfi = 00000021CFCD1891)&gt;]
          [optimizing 0x0303a76b3bb1 &lt;JSFunction (sfi = 00000021CFCD18E1)&gt; - took 0.095, 0.203, 0.012 ms]
          [completed optimizing 0x0303a76b3bb1 &lt;JSFunction (sfi = 00000021CFCD18E1)&gt;]
          [marking 0x02f422f091e1 &lt;JSFunction test (sfi = 00000021CFCD1001)&gt; for optimized recompilation, reason: hot and stable]
          [compiling method 0x02f422f091e1 &lt;JSFunction test (sfi = 00000021CFCD1001)&gt; using TurboFan]
        </code></pre>
      </section>
      <section data-title="3.최적화의 조건">
        <h4>https://github.com/v8/v8/blob/master/src/execution/runtime-profiler.cc</h4>
        <pre><code class="javascript" data-trim data-line-numbers="8,9,10,11,12,13,14">
          OptimizationReason RuntimeProfiler::ShouldOptimize(JSFunction function,
                                                   BytecodeArray bytecode) {
          if (function.HasOptimizedCode()) return OptimizationReason::kDoNotOptimize;
          int ticks = function.feedback_vector().profiler_ticks();
          int ticks_for_optimization =
              kProfilerTicksBeforeOptimization +
              (bytecode.length() / kBytecodeSizeAllowancePerTick);
          if (ticks >= ticks_for_optimization) {
            return OptimizationReason::kHotAndStable;
          } else if (!any_ic_changed_ &&
                     bytecode.length() &lt; kMaxBytecodeSizeForEarlyOpt) {
            // If no IC was patched since the last tick and this function is very
            // small, optimistically optimize it now.
            return OptimizationReason::kSmallFunction;
          } else if (FLAG_trace_opt_verbose) {
            PrintF("[not yet optimizing ");
            function.PrintName();
            PrintF(", not enough ticks: %d/%d and ", ticks,
                   kProfilerTicksBeforeOptimization);
            if (any_ic_changed_) {
              PrintF("ICs changed]\n");
            } else {
              PrintF(" too large for small function optimization: %d/%d]\n",
                     bytecode.length(), kMaxBytecodeSizeForEarlyOpt);
            }
          }
          return OptimizationReason::kDoNotOptimize;
        }
        </code></pre>
      </section>
      <section data-title="3.최적화의 조건">
        <h3>Hidden Class</h3>
        <img src="../assets/hiddenclass.png"/>
      </section>
      <section data-title="3.최적화의 조건">
        <h3>Inline Caching</h3>
        <pre><code class="javascript" data-trim>
          // Inline Caching
          function hello(user) {
            return `Hello, ${user.firstName} ${user.lastName}`;
          }
          const user = {
            firstName : 'gwanhoo',
            lastName : 'park'
          }
          hello(user); // 'Hello. park gwanhoo' 로 대체됩니다.
        </code></pre>
      </section>
      <section data-title="3.최적화의 조건">
        <h3>Inline Caching</h3>
        <pre><code class="javascript" data-trim>
          // Inline Caching
          for (let i=0; i&lt;10; i++) {
            arr[i].x = i;
          }
        </code></pre>
      </section>
      <section data-title="4.처리성능 향상 기법">
        <h3>어떻게 최적화된 자바스크립트 코드를 작성할 것인가.</h3>
        <p>
          변수 스코프
          가볍고 적은 코드
          쓸데없는 반복문 쓰지 않기
          이벤트 위임
          Gzip 압축
          객체를 캐싱하여 성능 향상

          똑같은 코드여도 실행환경에 따라 퍼포먼스는 천차만별이다.
          각기다른 자바스크립트 엔진을 사용하는 브라우저가 서로 다른 결과를 내는 것은 어쩌면 아주 당연한 일일지도 모른다.
          구현방법에 대한 표준화가 딱히 이루어져있는 것은 아닐테니까 말이다.
        </p>
      </section>
      <section>
        <h3>감사합니다.</h3>
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
      });
      Reveal.on( 'slidechanged', event => {
        console.log(event.currentSlide);
        var target = event.currentSlide;
        document.getElementById("title").innerText = target.getAttribute("data-title");
      } );
    }
  }
</script>