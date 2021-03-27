# Vue 面试总结

## MVVM 模型

`M` 代表数据层；`V` 代表视图层；`VM` 代表视图数据层。响应式数据通过 `VM` 渲染到页面中，页面变化时通过 `VM` 更新数据。

## SPA 单页应用

SPA 仅在页面初始化时加载相应的 HTML、JS 和 CSS。一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转。

取而代之的是利用前端路由机制实现页面内容的改变，避免页面的重新加载。

优点：

用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染，服务器压力相对较小。

前后端职责分离，前端进行交互逻辑，后端负责数据处理。

缺点：

初次加载耗时资源较多，加载时间长。（首屏加载优化）

SEO 难度较大。（SEO优化）

## Vue 响应式数据原理

在组件初始化时，通过 `Object.defineProperty` 方法给 `data` 选项中的所有属性加上 `getter/setter`。

当 `render` 方法被执行的时候，会用到 `data` 里的属性值，此时会触发 `getter` 函数, Vue 会去记录所有依赖此属性值的节点，完成依赖收集。

当 `data` 里的属性值发生变化后，会触发 `setter` 函数，此时 Vue 会去通知所有依赖于此属性值的节点进行更新。

Vue3 改用代理 `Proxy` 替代 `Object.defineProperty` 方法实现数据劫持。

监听器 Observer：对数据对象进行遍历，包括子属性对象的属性，利用 `Object.defineProperty()` 给属性都加上 setter 和 getter。当给某个属性赋值时，就会触发 setter，就能监听到数据的变化。

解析器 Compile：解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。

订阅者 Watcher：订阅者是 Observer 和 Compile 之间通信的桥梁 ，主要的任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。

订阅器 Dep：订阅器采用 发布-订阅 设计模式，用来收集订阅者 Watcher，对监听器 Observer 和 订阅者 Watcher 进行统一管理。

## Proxy 优点

`Proxy` 可以直接监听对象而非属性。

`Proxy` 可以直接监听数组的变化。

`Proxy` 有多达 13 种拦截方法。

`Proxy` 返回的是一个新对象，可以只操作新的对象达到目的，而 `Object.defineProperty` 只能遍历对象属性直接修改。

## 单向数据流

父组件通过 `props` 传递数据给子组件，父组件数据更新时，子组件接收的 `props` 会更新，但是不能在子组件中直接更新 `props`，会触发警告。

子组件如果想修改，只能通过 `$emit` 派发一个自定义事件，父组件监听到事件后，由父组件修改数据，这就是单线数据流。

## 虚拟DOM

虚拟 DOM 就是用一个原生 JS 对象去抽象一个真实 DOM 树。

Vue 中 render 方法中的 `createElement()`，也就是 h 函数，可以创建虚拟 DOM。

`h` 函数接受是三个参数，分别代表是 DOM 元素的标签名、属性、子节点，最终返回一个虚拟 DOM 的对象。

## key 的作用

key 是为 Vue 中 `vnode` 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速。

更准确：带 key 就不是就地复用了，在 sameNode 函数 a.key === b.key 对比中可以避免就地复用的情况。所以会更加准确。

更快速：利用 key 的唯一性生成 map 对象来获取对应节点，比遍历方式更快。

## 组件生命周期

Vue 实例有一个完整的生命周期，包括创建、挂载 Dom、重新渲染、卸载。

`beforeCreate`：组件实例被创建之前调用。

`created`：组件实例创建完成后调用，此时真实 DOM 还没有生成。

`beforeMount`：挂载 DOM 之前调用。

`mounted`：DOM 挂载完成后调用，此时可以访问到真实 DOM。

`beforeUpdate`：组件数据更新之前调用，发生在虚拟 DOM 打补丁之前。

`updated`：组件数据更新之后调用。

`beforeDestroy`：组件销毁前调用。

`destroyed`：组件销毁后调用。

`activited`：`<keep-alive>` 组件专属，组件被激活时调用。

`deadctivated`：`<keep-alive>` 组件专属，组件被销毁时调用。

## 父子组件生命周期函数执行顺序

加载渲染：父组件要等子组件都挂载完成，自己才能挂载完成。

父beforeCreate、created 、beforeMount --> 子beforeCreate、created、beforeMount 、mounted --> 父mounted

更新过程：父组件要等子组件更新完毕，自己才能更新完毕。

父beforeUpdate --> 子beforeUpdate、updated --> 父updated

销毁过程：父组件要等子组件销毁完成，自己才能销毁完成。

父beforeDestroy --> 子beforeDestroy、destroyed --> 父destroyed

## 组件通信方式

父组件通过 `props` 传递数据给子组件，子组件通过 `$emit` 发送事件传递数据给父组件，父组件通过 `$on` 监听事件。

父组件可以通过 `$children` 访问子组件实例，子组件通过 `$parent` 访问父组件实例。

父组件可以通过 `$refs` 获取子组件的引用。

跨层级组件，可以在祖先组件中使用 `provide` 方法传入信息，在后代组件中通过 `inject` 获取信息。

使用公共的事件总线 `EventBus` 来通信，`EventBus.$emit()` 触发事件，`EventBus.$on()` 接收事件。

使用 `Vuex` 状态管理插件。

## v-model

v-model 本质是 v-bind 和 v-on 的语法糖，默认使用名为 value 的 prop 和名为 input 的事件，在表单元素上创建双向数据绑定。

不同的表单元素使用不同的属性和事件：

text 和 textarea 元素使用 value 属性和 input 事件。

select 使用 value 属性和 change 事件。

checkbox 和 radio 使用 checked 属性和 change 事件。

可以通过修改组件 `model` 选项的 `prop` 和 `event` 属性来进行自定义。

## v-if 和 v-show

`v-if` 是真正的条件渲染，在切换过程中元素会销毁和重新渲染；也是惰性的，如果在初始渲染时条件为假，则不会渲染，当条件为真时，才会开始渲染。

`v-show` 不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 的 “display” 属性进行显示和隐藏。

## computed 和 watch

`computed` 是计算属性，依赖其他属性值，具有缓存，只有依赖的属性发生变化时才会更新。

`watch` 是监听器，没有缓存，监听到值的变化就会执行回调。

当需要进行数值计算，或依赖于其它数据时，应该使用 computed。

当需要在数据变化时执行异步或开销较大的操作时，应该使用 watch。

## Vue.set

由于 Vue 会在初始化实例时对属性执行 getter/setter 转化，所以属性必须在 data 对象上存在才能让 Vue 将它转换为响应式的。

Vue 无法检测到对象属性的添加或删除。但是 Vue 提供了 `Vue.set (object, propertyName, value)` 方法，来实现为对象添加响应式属性。

如果目标是数组，直接使用数组的 `splice` 方法触发相应式（检测数组长度）。

如果目标是对象，通过调用 `defineReactive` 方法进行响应式处理（通过 Object.defineProperty 动态添加 getter 和 setter）。

## <keep-alive> 组件的作用

`<keep-alive>` 是内置组件，可以实现组件缓存，当组件切换时不会对当前组件进行卸载，避免重新渲染。

提供 `include` 和 `exclude` 属性，两者都支持字符串或正则表达式。

`include` 表示只有名称匹配的组件会被缓存，`exclude` 表示任何名称匹配的组件都不会被缓存，其中 `exclude` 的优先级比 `include` 高。

对应两个钩子函数 `activated` 和 `deactivated`，当组件被激活时，触发 `activated`，当组件被移除时，触发 `deactivated`。

## 组件中 data 为什么是一个函数

组件是用来复用的，如果组件中 `data` 是一个对象，由于对象是引用数据类型，子组件中的 `data` 属性值会相互影响。

如果组件中 `data` 选项是一个函数，那么函数返回来的对象就是独立的，组件实例之间的 `data` 属性值不会互相影响。

## nextTick 原理分析

在下次 DOM 更新循环结束之后执行延迟回调。

在修改数据之后立即使用这个方法，可以获取更新后的 DOM。

## vue-router 导航守卫

导航守卫主要用来通过跳转或取消的方式守卫导航。分为全局导航守卫, 单个路由独享的守卫和组件级的守卫。

全局导航守卫：

`router.beforeEach((to, from, next) => {})`：全局前置守卫，确保 next 被调用。

`router.afterEach((to, from) => {})`：全局后置钩子。

`router.beforeResolve`：全局解析守卫。

路由独享的守卫：可以在路由表上直接定义 `beforeEnter` 守卫。

组件内的守卫：

`beforeRouteEnter(to, from, next)`：在渲染该组件的对应路由被 confirm 前调用，不能获取组件实例的 this。

`beforeRouteUpdate(to, from, next)`：在当前路由改变，但是该组件被复用时调用，如：带有动态参数的路径 /foo/:id。

`beforeRouteLeave(to, from, next)`：导航离开该组件的对应路由时调用，可以访问组件实例的 this。

## 完整的导航解析流程

（1）、导航被触发

（2）、在失活的组件里调用 beforeRouteLeave 守卫

（3）、调用全局的 beforeEach 守卫

（4）、在重用的组件里调用 beforeRouteUpdate 守卫

（5）、在路由配置里调用 beforeEnter

（6）、解析异步路由组件。

（7）、在被激活的组件里调用 beforeRouteEnter

（8）、调用全局的 beforeResolve 守卫

（9）、导航被确认。

（10）、调用全局的 afterEach 钩子

（11）、触发 DOM 更新

（12）、调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入

## vue-router 实现原理

vue-router 插件通过 `Vue.mixin()` 方法，全局注册一个混入。

该混入在 `beforeCreate` 钩子中定义了响应式的 `_route` 属性。

当 `_route` 值改变时，会自动调用 Vue 实例的 `render()` 方法，更新视图。

## vue-router 使用步骤

1. 定义路由组件。

2. 定义路由表 `routes`，每一个路由映射一个路由组件。

3. 创建 `router` 实例，`const router = new VueRouter({routes: routes})`。

4. 注入路由，挂载根实例，`const app = new Vue({router: router}).$mount('#app')`。

5. 使用 `<router-link>` 组件来导航，路由匹配到的组件将渲染在 `<router-view>` 组件。

6. 组件内通过 `this.$router` 访问路由器，也可以通过 `this.$route` 访问当前路由。

## 前端路由“更新视图但不重新请求页面”原理

### hash 模式

vue-router 默认 hash 模式，利用 URL 中的 hash。

`#` 符号本身以及它后面的字符称之为 hash，可通过 `window.location.hash` 属性读取。

hash 虽然出现在 URL 中，但不会被包括在 HTTP 请求中。因此，改变 hash 不会重新加载页面。

每一次改变 hash，都会在浏览器的访问历史中增加一条记录。

路由改变时会更新响应式数据 `_route` 的属性值，从而触发视图更新。

如果是在浏览器地址栏中直接输入改变路由，通过在 `window` 监听 `hashchange` 事件，调用 `replaceHash` 方法。

### history 模式

history 模式，利用 HTML5 中 History 接口的 `pushState()` 和 `replaceState()` 方法。

这两个方法可以对浏览器历史记录栈进行修改。当他们执行时，虽然当前 URL 改变了，但浏览器不会立即发送请求该 URL。

URL 改变时，监听 `popstate` 事件，重新渲染视图。

## history 模式的问题

在用户手动输入 URL 后回车，或者刷新浏览器的时候。

hash 模式下，仅 hash 符号之前的内容会被包含在请求中，因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回 404 错误。

history 模式下，前端的 URL 必须和实际向后端发起请求的 URL 一致，如果后端缺少对所有路由的全覆盖，将返回 404 错误。

所以，需要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。

## Vuex

Vuex 是一种状态管理模式，采用集中式存储管理所有组件的状态，用一个对象包含全部应用层级状态。

`State`：数据源，通过计算属性来使用。当组件需要获取多个状态的时候，使用 mapState 辅助函数帮助生成计算属性。

`Getter`：从 Store 中获取数据，派生出新的数据（类似计算属性），mapGetters 辅助函数将 store 中的 getter 映射到计算属性。

`Mutation`：改变 store 中状态的唯一方法就是提交 mutation（类似事件），mutation 必须是同步函数。可以用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用。

`Action`：用于提交 mutation，而不是直接变更状态，可以包含异步操作，通过 store.dispatch 方法触发。可以用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用。

`Module`：将单一的 Store 拆分为多个模块，每个模块拥有自己的 state、mutation、action、getter。

Vuex 管理数据的流程：

（1）、通过 `dispatch()` 去分发一个 action。

（2）、在 action 中执行异步操作获取接口数据，获取数据后提交 mutation。

（3）、在 mutation 中更新 state 数据。

（4）、在组件的计算属性中返回 state 数据，store 更新时，重新求取计算属性，触发视图更新。

## Axios

Axios 是一个基于 Promise 的 HTTP 客户端，同时支持浏览器和 Node.js 环境。在浏览器中基于 XMLHttpRequests 实现，在 Nodejs 中基于 http 模块实现。

Axios 可以拦截请求和响应，转换请求和响应数据，支持防御 CSRF（跨站请求伪造） 攻击。

### 请求响应拦截

通过 `axios.interceptors.request.use()` 设置请求拦截，在请求发送前统一执行某些操作。

比如在请求头中添加 token 字段。

```js
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
```

通过 `axios.interceptors.response.use()`设置响应拦截，在接收到服务器响应后统一执行某些操作。

比如发现响应状态码为 401 时，自动跳转到登录页。

```js
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
```

### 防御跨站请求伪造

跨站请求伪造（Cross-site request forgery），通常缩写为 CSRF 或 XSRF，是一种挟制用户在当前已登录的 Web 应用程序上执行非本意的操作的攻击方法。

攻击者通过一些技术手段欺骗用户的浏览器去访问一个自己曾经认证过的网站并运行一些操作，如发邮件、转账、购买商品等操作。由于浏览器曾经认证过，所以被访问的网站会认为是真正的用户操作而去运行。

防御措施：

（1）、检查 HTTP 头的 Referer 字段，这个字段用以标明请求来源于哪个地址。在处理敏感数据请求时，Referer 字段应和请求的地址位于同一域名下。

（2）、请求都携带一个 CSRF 攻击者无法获取到的 token。将 token 设置在 Cookie 中，在提交请求时提交 Cookie，服务端接收到请求后，再进行对比校验。

Axios 提供了 `xsrfCookieName` 和 `xsrfHeaderName` 两个属性来分别设置 CSRF 的 Cookie 名称和 HTTP 请求头的名称。

### 取消请求

取消请求主要有两个场景：一个请求发送了多次，需要取消之前的请求。路由切换时，需要取消上个路由中未完成的请求。

通过 `axios.CancelToken.source` 生成取消令牌 token 和取消方法 cancel。

```js
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
})

source.cancel();
```

当创建请求时传递 `{cancelToken : source.token}`, 因为 `cancelToken` 内部有一个 `Promise` 对象，所以 axios 就只需要实现 then 回调函数就行。

当手动执行 `source.cancel()` 时，执行了 `Promise.resolve()` ,这个时候 `then` 回调函数就会被触发，回调函数中使用了 `XMLHttpRequest.abort()` 中断请求，同时将回调函数的结果作为异常抛出给用户。、
