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
          <li>처리성능 향상을 위한 방법</li>
        </ol>
        <p class="subtitle fragment fade-in-then-out">순서를 보시면</p>
        <p class="subtitle fragment fade-in-then-out">첫번째로 자바스크립트 엔진이란 무엇이고 어떤것들이 있는지</p>
        <p class="subtitle fragment fade-in-then-out">그리고 이중에서 V8의 특징에 대해 간단히 알아보겠습니다.</p>
        <p class="subtitle fragment fade-in-then-out">두번째 순서는 공통적인 자바스크립트 엔진의 작동원리를 보시고</p>
        <p class="subtitle fragment fade-in-then-out">V8엔진에서는 어떻게 자바스크립트 코드를 최적화 하는지 알아보겠습니다.</p>
        <p class="subtitle fragment fade-in-then-out">세번째에서는 V8엔진에서 어떤조건을 만족할때 최적화를 하는지 알아보겠습니다.</p>
        <p class="subtitle fragment fade-in-then-out">그리고 마지막으로 V8엔진 입장에서 자바스크립트 처리성능 향상 방법을 알아보겠습니다.</p>
        <p class="subtitle fragment fade-in-then-out">물론 이 방법을 적용하시더라도 현재 담당하시는 어플리케이션의 속대롤 대폭 향상시키진 않습니다.</p>
        <p class="subtitle fragment fade-in-then-out">아! 이런 마음가짐? 으로 개발을 하시면 될 듯합니다.</p>
      </section>
      <section data-title="1.JS Engine">
        <h3>JavaScript Engine 이란?</h3>
        <p>JavaScript 를 실행하는 프로그램 또는 인터프리터</p>
        <p class="subtitle fragment fade-in-then-out">자바스크립트 엔진이란 자바스크립트를 실행하는 프로그램 또는 인터프리터인데요.</p>
        <p class="subtitle fragment fade-in-then-out">엔진의 목표는 가능한 짧은 시간 내에 가장 최적화된 코드를 생성하는 것입니다</p>
        <p class="subtitle fragment fade-in-then-out">주로 웹브라우저를 위해 사용되며</p>
        <p class="subtitle fragment fade-in-then-out">일반적인 인터프리터로 구현될수도 있고, 뒤에서 설명하겠지만 JIT컴파일러로 구현할 수도 있습니다.</p>
      </section>
      <section data-title="1.JS Engine">
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
        <p class="subtitle fragment fade-in-then-out">SpiderMonkey라는 엔진은 최초의 자바스크립트 엔진이며 FireFox에서 사용합니다.</p>
        <p class="subtitle fragment fade-in-then-out">Rhino라는 엔진은 모질라 재단이 운영하고 자바로 개발되어있는 것이 특징이고요.</p>
        <p class="subtitle fragment fade-in-then-out">Chakra는 마이크로소프트가 개발했고, Edge 브라우저에서 사용중입니다.</p>
        <p class="subtitle fragment fade-in-then-out">그리고 JavaScript Core라는 엔진이 있는데요.</p>
        <p class="subtitle fragment fade-in-then-out">WebKit 프레임워크에 포함되어있고 애플에서 개발하고 Safari와 React Native App에서 사용중입니다.</p>
        <p class="subtitle fragment fade-in-then-out">마지막으로 오늘 알아볼 V8 엔진이 있는데요.</p>
        <p class="subtitle fragment fade-in-then-out">구글에서 개발했고, C++로 작성되었습니다.</p>
        <p class="subtitle fragment fade-in-then-out">Chrome, Electron, Node.js에서 사용중입니다.</p>
        <p class="subtitle fragment fade-in-then-out">그러면 오늘 주제인 V8엔진에 대해 조금더 자세히 알아보겠습니다.</p>
      </section>
      <section data-title="1.JS Engine">
        <h3>V8 특징</h3>
        <ul>
          <li>- 2006년 말 만들어진 JavaScript 엔진.</li>
          <li>- 오픈 소스 이며 C++로 만들어짐.</li>
          <li>- Chrome아 아니더라도 독립적으로 실행 가능하다.(Node.js, Electron) </li>
        </ul>
        <p class="subtitle fragment fade-in-then-out">V8의 특징을 조금더 보면</p>
        <p class="subtitle fragment fade-in-then-out">2006년말 구글에서 만든 자바스크립트 엔진입니다.</p>
        <p class="subtitle fragment fade-in-then-out">오픈소스 이며, C++로 만들어졌고요.</p>
        <p class="subtitle fragment fade-in-then-out">웹 브라우저 안에서 실행되는 자바스크립트의 성능을 높이기 위해 처음 고안되었습니다.</p>
        <p class="subtitle fragment fade-in-then-out">ECMA-262에 기재된 ECMAScript 및 WebAssembly를 처리할수 있다고 하네요.</p>
        <p class="subtitle fragment fade-in-then-out">Chrome이 아니더라도 Node.js나 Electron에서 독립적으로 실행이 가능합니다.</p>
        <p class="subtitle fragment fade-in-then-out">한마디로 V8은 C++로 작성된 Google의 오픈소스 고성능 Javascript 및 웹 어셈블리 엔진 입니다.</p>
        <p class="subtitle fragment fade-in-then-out">실제로 V8은 C++프로그램으로 자바스크립트 코드를 받아서 컴파일하고 실행합니다.</p>
      </section>
      <section data-title="2.JS Engine 작동원리">
        <h3>JavaScript 엔진의 작동원리</h3>
        <p>Just-in-Time Compilation (JITC)</p>
        <p class="subtitle fragment fade-in-then-out">자바스크립트 엔진의 컴파일 흐름을 보기전에 먼저 최근 대부분의 자바스크립트 엔진에서 사용하는 컴파일 방식을 보겠습니다.</p>
        <p class="subtitle fragment fade-in-then-out">먼저 Just in Time Compilation 이라고하는 방식입니다. JIT컴파일 이라고도 하는데요.</p>
        <p class="subtitle fragment fade-in-then-out">JITC의 수행과정을 보면 처음에 text형태로 입력된 소스코드를 파싱하여 바이트코드로 변환합니다.</p>
        <p class="subtitle fragment fade-in-then-out">그리고 인터프리터모드면 바이트코드를 하나씩 읽어가며 수행하고</p>
        <p class="subtitle fragment fade-in-then-out">JIT모드면 생성된 바이트코드를 네이티브코드로 컴파일하여 수행합니다.</p>
        <p class="subtitle fragment fade-in-then-out">인터프리터로 바이트코드를 수행하는것보다 네이티브코드로 수행하는것이 빠르지만</p>
        <p class="subtitle fragment fade-in-then-out">문제는 JITC은 컴파일과정이 수행중에 발생하기 때문에 이것 자체가 오버헤드의 원인이 됩니다.</p>
        <p class="subtitle fragment fade-in-then-out">그래서 컴파일에 많은 시간을 쓰지 못하고 아주 최소한의 최적화만 적용하여 네이티브코드를 생성합니다.</p>
      </section>
      <section data-title="2.JS Engine 작동원리">
        <p>JITC or interpreter ?</p>
        <p class="subtitle fragment fade-in-then-out">자바스크립트에서 JITC는 최소한의 최적화만 진행한다고 했는데요.</p>
        <p class="subtitle fragment fade-in-then-out">이것 말고도 문제점이 두가지 더 있습니다.</p>
        <p class="subtitle fragment fade-in-then-out">자바스크립트는 변수의 타입이 수행 도중 달라질 수 있는 매우 동적인 언어입니다.</p>
        <p class="subtitle fragment fade-in-then-out">그래서 자바스크립트 JITC는 모든 예외적인 케이스를 다 고려하여 코드를 생성해야합니다.</p>
        <p class="subtitle fragment fade-in-then-out">그러면 많은 양의 네이티브코드가 생기게 되고 이는 결국엔 인터프리터와 별다른 차이가 없다고 합니다.</p>
        <p class="subtitle fragment fade-in-then-out">게다가 바이트코드를 네이티브코드로 변환하는 오버헤드 까지 더해지니 비효율적이라고 할 수 있습니다.</p>
        <p class="subtitle fragment fade-in-then-out">또 다른 문제는 자바스크립트는 연산을 많이하기 보다는 주로 DOM을 조작하거나 사용자의 입력에 반응하는 프로그램이 많습니다.</p>
        <p class="subtitle fragment fade-in-then-out">이는 자주 반복돼서 수행되는 구간, 즉 hotspot이라고 부르는 구간이 적기때문에 성능 향상에 기여하는 부분이 매우 적다고 할 수 있습니다.</p>
        <p class="subtitle fragment fade-in-then-out">그러면 자바스크립트에서는 JITC보다 인터프리터가 더 좋은것이 아니냐고 할 수 있는데요.</p>
        <p class="subtitle fragment fade-in-then-out">최근에는 꼭 그렇다고만 할 수도 없습니다.</p>
        <p class="subtitle fragment fade-in-then-out">최근 자바스크립트 프로그램들은 단순히 웹페이지의 DOM조작이나 이벤트 처리뿐만 아니라</p>
        <p class="subtitle fragment fade-in-then-out">비즈니스로직에도 어느정도 관여하며 연산이 많은 프로그램들도 구현되고 있습니다.</p>
        <p class="subtitle fragment fade-in-then-out">그래서 JITC방식도 완전히 버릴수 없어 최근의 엔진들은 대부분 Adaptive JIT Compilation 방식을 사용합니다.</p>
      </section>
      <section data-title="2.JS Engine 작동원리">
        <p>
          JITC + interpreter =
          Adaptive JIT Compilation
        </p>
        <p class="subtitle fragment fade-in-then-out">Adaptive JIT Compilation 방식은 모든 코드를 일괄적으로 같은 수준의 최적화를 진행하는것이 아닙니다.</p>
        <p class="subtitle fragment fade-in-then-out">반복되는 수행 정도에 따라 유동적으로 최적화를 진행하는 방식입니다.</p>
        <p class="subtitle fragment fade-in-then-out">정리하면 최근의 자바스크립트엔진은 JITC 방식과 인터프리터 방식을 혼용해서 사용합니다.</p>
        <p class="subtitle fragment fade-in-then-out">다음장의 그림에서 간단히 살펴보겠습니다.</p>
      </section>
      <section data-title="2.JS Engine 작동원리(공통)">
        <img src="../assets/engine.png"/>
        <p class="subtitle fragment fade-in-then-out">지금 보시는 아키텍쳐는 자바스크립트 엔진의 공통적인 최적화 방법입니다.</p>
        <p class="subtitle fragment fade-in-then-out">자바스크립트 엔진은 소스코드를 파싱해서 추상구문트리라는 형태로 만듭니다.</p>
        <p class="subtitle fragment fade-in-then-out">추상구문트리는 DOM트리와 비슷하다고 보시면 됩니다.</p>
        <p class="subtitle fragment fade-in-then-out">파서에서 분해된 token을 기반으로 트리구조를 만듭니다.</p>
        <p class="subtitle fragment fade-in-then-out">인터프리터는 코드를 한줄한줄 읽어가며 최적화 되지 않은</p>
        <p class="subtitle fragment fade-in-then-out">바이트코드를 빠르게 생성합니다.</p>
        <p class="subtitle fragment fade-in-then-out">이때 runtime profiler가 함수의 빈도를 기록하고</p>
        <p class="subtitle fragment fade-in-then-out">사용되는 변수의 타입이나 값을 저장합니다.</p>
        <p class="subtitle fragment fade-in-then-out">그리고 바이트코드와 함께 optimizing compiler로 보내집니다.</p>
        <p class="subtitle fragment fade-in-then-out">optimizing compiler에서는 프로파일링된 데이터를 기반으로</p>
        <p class="subtitle fragment fade-in-then-out">최적화된 네이티브코드를 생성합니다.</p>
        <p class="subtitle fragment fade-in-then-out">만약 정확하지 않은 결과가 나오면 다시 deoptimize하여 바이트코드로 되돌립니다.</p>
        <p class="subtitle fragment fade-in-then-out">이 원리의 핵심은 profiling을 수행하는 동안 특정 변수의 타입이 변하지 않았다면</p>
        <p class="subtitle fragment fade-in-then-out">그 이후로도 변하지 않을 가능성이 크다는 전제를 기본으로 합니다.</p>
        <p class="subtitle fragment fade-in-then-out">따라서 동적인 변화가 발생했을때 페널티는 있더라도 변하지 않았을때</p>
        <p class="subtitle fragment fade-in-then-out">더 큰 이득을 얻을수 있는 최적화 방식을 사용합니다.</p>
        <p class="subtitle fragment fade-in-then-out">이런 대표적인 최적화로 대부분의 JITC에서 사용하는 방식인</p>
        <p class="subtitle fragment fade-in-then-out">hidden class나 inline caching이 있는데 이는 뒤에서 다시 알아보겠습니다.</p>
      </section>
      <section data-title="2.JS Engine 작동원리(V8)">
        <img src="../assets/engine3.png"/>
        <p class="subtitle fragment fade-in-then-out">지금 보시는 그림은 V8엔진의 최적화 방식을 나타낸 그림입니다.</p>
        <p class="subtitle fragment fade-in-then-out">여기서 인터프리터는 Ignition이라고 부르며, 런타임중에  Profiler에게 함수나 변수들의 호출 빈도, 길이 등을 수집하도록 지시합니다.</p>
        <p class="subtitle fragment fade-in-then-out">이렇게 모인 바이트코드와 프로파일링 데이터를 TurboFan이라고 부르는 optimizing compiler로 보내서 </p>
        <p class="subtitle fragment fade-in-then-out">프로파일링 된 데이터를 기반으로 매우 최적화된 네이티브코드를 만들어냅니다. </p>
        <p class="subtitle fragment fade-in-then-out">이때 TurboFan의 최적화 조건은 반복 수행되는 정도나 바이트코드의 길이 입니다.</p>
        <p class="subtitle fragment fade-in-then-out">처음에 모든 코드는 인터프리터에 의해 바이트 코드로 변환되지만, 자주 반복되는 부분이 발견되면 여기에 대해서만 JITC를 적용합니다.</p>
        <p class="subtitle fragment fade-in-then-out">참고로 spiderMonkey와 Chakra에서는 두 개의 최적화 컴파일러가 사용되고 Javascript Core는 세번까지 최적화한다고 합니다.</p>
        <p class="subtitle fragment fade-in-then-out">시간이 조금 더 걸리더라도 효율적인 네이티브코드를 생산하느냐 아니면 시간을 조금 더 아껴 덜 효율적인 네이티브코드를 생산하느냐의 차이입니다.</p>
        <p class="subtitle fragment fade-in-then-out">엔진마다 최적화 과정은 조금씩 다르지만 파서,인터프리터,컴파일러가 있는 동일한 아키텍쳐로 구성되어 있습니다.</p>
        <p class="subtitle fragment fade-in-then-out">그러면 여태 말해왔던 인터프리터가 변환하는 바이트코드와 JITC가 어떤 조건으로 최적화하는지 잠시 보겠습니다.</p>
      </section>
      <section data-title="2.JS Engine 작동원리">
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
        <p class="subtitle fragment fade-in-then-out">인터프리터가 바이트코드로 어떻게 변경되는지 보면 그림과 같습니다.</p>
        <p class="subtitle fragment fade-in-then-out">간단한 인자를 받아서 출력해주는 함수이고요.</p>
        <p class="subtitle fragment fade-in-then-out">node환경에서 --print-bytecode 옵션으로 파일을 실행하면 아래와 같은 결과를 보실 수 있습니다.</p>
        <p class="subtitle fragment fade-in-then-out">레지스터에 값을 할당하는 모습을 볼수있는데요. 자세한 설명은 생략하겠습니다.</p>
      </section>
      <section data-title="2.JS Engine 작동원리">
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
        <p class="subtitle fragment fade-in-then-out">이번 코드는 V8의 최적화 컴파일러인 TurboFan이 어떤 조건으로 최적화 대상을 구분하는지 보실수 있습니다.</p>
        <p class="subtitle fragment fade-in-then-out">test 함수는 그냥 인자를 받아서 변형하고 걸러내고</p>
        <p class="subtitle fragment fade-in-then-out">순서를 뒤집어서 반환하는 역할을 수행합니다.</p>
        <p class="subtitle fragment fade-in-then-out">여기서 Turbofan이 감시하고 있는 최적화 대상은 test, map,</p>
        <p class="subtitle fragment fade-in-then-out">filter, reverse, Array.from 입니다</p>
        <p class="subtitle fragment fade-in-then-out">TurboFan이 함수를 최적화 대상으로 marking 하는 부분을 보면</p>
        <p class="subtitle fragment fade-in-then-out">최적화의 이유가 small function,</p>
        <p class="subtitle fragment fade-in-then-out">hot and stable이라고 나오는 것을 볼 수 있습니다.</p>
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
        <p class="subtitle fragment fade-in-then-out">지금 보시는 코드는 github에 올라와있는 V8 코드중에 최적화의 대상을 선정하는 로직입니다.</p>
        <p class="subtitle fragment fade-in-then-out">흰색으로 잘 보이는 부분인데요.</p>
        <p class="subtitle fragment fade-in-then-out">이 함수가 몇번 호출되었는지(ticks_for_optimization을 넘길때)</p>
        <p class="subtitle fragment fade-in-then-out">이 코드가 인라인 캐싱되지 않았고 바이트 코드의 길이가 작을때</p>
        <p class="subtitle fragment fade-in-then-out">각각 최적화 대상을 선정하는 로직입니다.</p>
        <p class="subtitle fragment fade-in-then-out">정리하면 kHotAndStable은 코드가 자주 호출되고 변경되지 않으며</p>
        <p class="subtitle fragment fade-in-then-out">kSmallFunction은 바이트코드의 길이를 보고 특정 바이트를 넘지 않으면 작은 함수라 판단하고 최적화를 진행합니다.</p>
      </section>
      <section data-title="3.최적화의 조건">
        <h4>Hidden Class</h4>
        <img src="../assets/hiddenclass.png"/>
        <p class="subtitle fragment fade-in-then-out">앞에서도 말씀드린 최적화 방식중에 Hidden Class를 보겠습니다.</p>
        <p class="subtitle fragment fade-in-then-out">자바스크립트는 동적 타입 언어이기 때문에 객체를 생성할때 메모리를 얼마나 할당해야하는지 모릅니다.</p>
        <p class="subtitle fragment fade-in-then-out">따라서 속성이 추가될 때마다 랜덤한 주소에 메모리를 할당하고</p>
        <p class="subtitle fragment fade-in-then-out">그 속성을 다루기 위해 위해 dictionary random한 메모리에 접근해야 합니다.</p>
        <p class="subtitle fragment fade-in-then-out">자바스크립트 내에서 dictionary에 정의된 속성값을 찾는것은 느리기 때문에,</p>
        <p class="subtitle fragment fade-in-then-out">V8 엔진에서는 Hidden class라는 다른 방식으로 검색합니다.</p>
        <p class="subtitle fragment fade-in-then-out">객체를 만들고 속성을 추가할 때 마다 새로운 클래스가 만들어지며, </p>
        <p class="subtitle fragment fade-in-then-out">다음에 같은 생성자를 사용하여 다시 객체를 만든다면 이미 만들어 두었던 히든 클래스를 사용하게 됩니다.</p>
        <p class="subtitle fragment fade-in-then-out">또한 히든클래스는 순서에 의존적이기 때문에 만약 위의 예제와 같이</p>
        <p class="subtitle fragment fade-in-then-out">x, y 순서로 할당하는 것이 아닌 y, x 순서로 속성을 할당한다면</p>
        <p class="subtitle fragment fade-in-then-out">또 다른 클래스가 만들어지게 됩니다.</p>
        <p class="subtitle fragment fade-in-then-out">이렇게 만들어진 히든클래스에는 각 속성의 정적인 Offset이 저장되며 </p>
        <p class="subtitle fragment fade-in-then-out">속성의 위치 정보를 해석할 필요가 없어지기 때문에 정적 타입 언어와 같은 성능을 낼 수 있습니다.</p>
      </section>
      <section data-title="3.최적화의 조건">
        <h3>Inline Caching</h3>
        <pre><code class="javascript" data-trim>
          // Inline Caching
          function hello(user) {
            return `Hello, ${user.firstName} ${user.lastName}`;
          }
          const user = {
            firstName : 'hoo',
            lastName : 'park'
          }
          hello(user); // 'Hello. park hoo' 로 대체됩니다.
        </code></pre>
        <p class="subtitle fragment fade-in-then-out">다음으로 inline caching을 보겠습니다.</p>
        <p class="subtitle fragment fade-in-then-out">위 코드에서 hello(user) 함수를 만번 반복적으로 실행한다면 컴파일러는</p>
        <p class="subtitle fragment fade-in-then-out">user객체를 만번찾는 대신 hello(user)를 'Hello. park hoo' 라는 텍스트로 대체하여 실행속도를 대폭 향상시킵니다. </p>
        <p class="subtitle fragment fade-in-then-out">앞에서 설명했던 객체 필드에 접근할때 hidden class를 사용한다면 결국 우리가 얻고 싶은 값은 필드의 오프셋 값입니다.</p>
        <p class="subtitle fragment fade-in-then-out">inline caching은 이 오프셋값을 캐싱하는 동작입니다.</p>
        <p class="subtitle fragment fade-in-then-out">동적인 언어라고 해도 실제로 객체가 바뀌는 일은 거의없고 </p>
        <p class="subtitle fragment fade-in-then-out">성능을 빠르게하려면 반복문을 최적화 해야한다는 가정이 바탕에 깔려있습니다.</p>
      </section>
      <section data-title="3.최적화의 조건">
        <h3>Inline Caching</h3>
        <pre><code class="javascript" data-trim>
          // Inline Caching
          for (let i=0; i&lt;10; i++) {
            arr[i].x = i;
          }
        </code></pre>
        <p class="subtitle fragment fade-in-then-out">inline caching의 효과가 있는 간단히 코드를 보시겠습니다.</p>
        <p class="subtitle fragment fade-in-then-out">우리가 신결쓸 부분은 위 예제 코드처럼 배열 내의 객체들을 반복해서 접근할때, </p>
        <p class="subtitle fragment fade-in-then-out">하나의 배열 안에는 모두 같은 필드 구조를 가지는 객체들만 넣어서 접근해야합니다.</p>
        <p class="subtitle fragment fade-in-then-out">for문 중간에 새로운 필드가 조건에 의해 추가된다거나 하면 inline caching 의 효과가 없습니다.</p>
        <p class="subtitle fragment fade-in-then-out">inline caching이 적용되려면 루프안에서 필드 접근을 하려는 객체가 </p>
        <p class="subtitle fragment fade-in-then-out">모두 같은 hidden class를 가리키고 있어야 하기 때문입니다.</p>
        <p class="subtitle fragment fade-in-then-out">여러가지의 최적화 방법이 있지만 hidden class와 inline caching만 주의하면 생각보다 간단합니다.</p>
      </section>
      <section data-title="4.처리성능 향상 방법">
        <h3>어떻게 최적화된 자바스크립트 코드를 작성할 것인가.</h3>
        <ul>
          <li>- 자바스크립트를 정적인 언어라고 생각하고 쓰면 좋다.</li>
          <li>- 동적인 특성을 최대한 활용하는것도 좋지만 성능저하가 일어날수 있다는 점을 염두해야한다.</li>
        </ul>
        <p class="subtitle fragment fade-in-then-out">마지막으로 앞서 V8 엔진의 최적화 방법을 장황하게 설명했지만</p>
        <p class="subtitle fragment fade-in-then-out">엔진 입장에서의 최적화된 코드는</p>
        <p class="subtitle fragment fade-in-then-out">자바스크립트를 정적인 언어라고 생각하며 사용해서</p>
        <p class="subtitle fragment fade-in-then-out">hidden class나 inline caching의 이점을 최대한 활용해서 코드를 작성하는 방법을 추천하고 싶습니다.</p>
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