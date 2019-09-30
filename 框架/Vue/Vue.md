# Vue.js 面试题

## VUE 生命周期

Vue 生命周期总共有 8 个阶段：创建前、后， 载入前、后，更新前、后，销毁前、销毁后。

- `beforeCreate`：此时获取不到 `prop` 和 `data` 中的数据

- `created`：可以获取到 `prop` 和 `data` 中的数据

- `beforeMount`：获取到了 `VDOM`

- `mounted`：`VDOM` 解析成了真实 `DOM`

- `beforeUpdate`：在更新之前调用

- `updated`：在更新之后调用；

- `beforeDestory`：在组件销毁之前调用，可以解决内存泄露的问题，如 `setTimeout` 和 `setInterval` 造成的问题

- `destory`：组件销毁之后调用

- `keep-alive`：切换组件之后，组件放进 `activated`，之前的组件放进 `deactivated`

## Vue 中实现双向数据绑定的原理

vue 实现数据双向绑定主要是采用数据劫持结合发布者-订阅者模式的方式。

Vue 在初始化时会遍历 `data` 选项中的属性，并用 `Observer` 劫持数据，通过 `Object.defineProperty` 每个属性添加 `getter` 和 `setter`。

在 `getter` 函数中将订阅者 `Watcher` 添加到 `Dep` 订阅器。在 `setter` 函数中通知订阅者更新。

指令编译器 `Complie` 会深度遍历 `DOM` 树，对每个元素节点的指令模板进行替换数据以及订阅数据。

当数据发生变化时，会触发 `setter` 方法，`setter` 会调用 `notify()` 方法通知所有的订阅者更新视图。

## Vue 中组件间的通信

- 父子通信

  - 父组件通过 `props` 传递数据给子组件，子组件通过 `$emit` 发送事件传递数据给父组件
  - 通过访问 `$parent` 或者 `$children` 对象来访问组件实例中的方法和数据

- 兄弟组件通信

  - 通过 `this.$parent.$children` ，也就是查找父组件中的子组件实现 ，在 `$children` 中可以通过组件 `name` 查询到需要的组件实例，然后进行通信。

- 跨多层次组件通信

  - 使用 `provide` / `inject` API

- 任意组件通信

  - 中央事件总线 Event Bus
  - Vuex

## computed 和 watch 区别

`computed` 是计算属性，依赖其他属性计算值，并且 `computed` 的值有缓存，只有当计算值变化才会返回内容。

`watch` 是监听器，监听到值的变化就会执行回调，在回调中可以进行一些逻辑操作。

所以一般来说需要依赖别的属性来动态获得值的时候可以使用 `computed`，对于监听到值的变化需要做一些复杂业务逻辑的情况可以使用 `watch`。

## v-show 与 v-if 区别

`v-show` 只是在 `display: none` 和 `display: block` 之间切换。

无论初始条件是什么都会被渲染出来，后面只需要切换 CSS，DOM 还是一直保留着的。

所以总的来说 `v-show` 在初始渲染时有更高的开销，但是切换开销很小，更适合于频繁切换的场景。

`v-if` 当属性初始为 `false` 时，组件就不会被渲染，直到条件为 `true`，并且切换条件时会触发销毁/挂载组件，所以总的来说在切换时开销更高，更适合不经常切换的场景。

并且基于 `v-if` 的这种惰性渲染机制，可以在必要的时候才去渲染组件，减少整个页面的初始渲染开销。

## keep-alive 组件的作用

如果需要在组件切换的时候，保存一些组件的状态防止多次渲染，就可以使用 `keep-alive` 组件包裹需要保存的组件。

`keep-alive` 组件拥有两个独有的生命周期钩子函数，分别为 `activated` 和 `deactivated`。

用 `keep-alive` 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 `deactivated` 钩子函数，命中缓存渲染后会执行 `actived` 钩子函数。

## nextTick 原理分析

`nextTick` 可以让我们在下次 DOM 更新循环结束之后执行延迟回调，用于获得更新后的 DOM。

## Vue 的路由实现

单页面应用的核心之一是就是更新视图而不重新请求页面。

- `hash` 模式

  监听 `hashchange` 事件

- `history` 模式

  采用 HTML5 的新特性，使用 `pushState()`和`replaceState()` 对浏览器历史记录栈进行修改，监听 `popstate` 状态变更。

导航钩子主要用来拦截导航，让它完成跳转或取消

`router.beforEach((to,from,next) => {})`
