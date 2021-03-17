# Vue 面试总结

## MVVM 模型

`MVVM` 模型是把 `MVC` 模型中的 `Controller` 变成了 `ViewModel`。

`Model` 代表数据模型；`View` 代表 UI 组件；

`ViewModel` 是 `View` 层和 `Model` 层的桥梁，数据会绑定到 `ViewModel` 层并自动将数据渲染到页面中，页面变化的时候会通知 `ViewModel` 层更新数据。

## Vue 响应式数据原理

在组件初始化时，通过 `Object.defineProperty` 方法给 `data` 选项中的所有属性加上 `getter/setter`，`getter` 用来依赖收集，`setter` 用来派发更新。

在调用 `render` 方法生成虚拟 DOM 的时候，会用到 `data` 的属性值，此时会触发 `getter` 函数, 将当前的观察者 `watcher` 注册进 `subs` 里，完成依赖收集的订阅。

当 `data` 属性发生变化后，会触发 `setter`函数，然后遍历依赖收集过程中订阅的的所有观察者，也就是 `subs` 里所有的 `watcher` 对象，通知他们去重新渲染组件。

Vue3 改用代理 `Proxy` 替代 `Object.defineProperty` 方法实现数据劫持。

## Proxy 优点

`Object.defineProperty` 方法只能监听对象已存在的属性，不能监听属性的新增和删除，所以要通过 `Vue.set()` 和 `Vue.delete()` 来实现。

`Object.defineProperty` 方法也不能监听数组的变化，只能通过重写数组的那 7 个方法进行监听。

`Proxy` 是对整个目标对象进行代理，返回一个新的对象，可以监听属性的新增和删除，也能监听数组下标和数组长度的变化。

## 组件生命周期

`beforeCreate` 是 `new Vue()` 之后触发的第一个钩子，此时 `data`、`methods`、`computed` 以及 `watch` 上的数据和方法都不能被访问。

`created` 在实例创建完成后发生，此时已经完成了数据观测，可以使用、更改数据，进行数据初始化，在这里更改数据不会触发 `updated` 函数，此时也无法与 DOM 进行交互。

`beforeMount` 发生在挂载之前，在这之前 `template` 模板已导入渲染函数编译。此时虚拟 DOM 已经创建完成，即将开始渲染。此时也可以对数据进行更改，不会触发 `updated` 函数。

`mounted` 在挂载完成后发生，在当前阶段，真实的 DOM 挂载完毕，数据完成双向绑定，可以访问到 DOM 节点，可以使用 `$refs` 属性对 DOM 进行操作。

`beforeUpdate` 发生在更新之前，也就是响应式数据发生更新，虚拟 DOM 重新渲染之前被触发，可以在当前阶段进行更改数据，不会造成重渲染。

`updated` 发生在更新完成之后，当前阶段组件 DOM 已完成更新。要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新。

`beforeDestroy` 发生在实例销毁之前，在当前阶段实例完全可以被使用，可以在这时进行善后收尾工作，比如清除计时器。

`destroyed` 发生在实例销毁之后，这个时候只剩下了 DOM 空壳。组件已被拆解，数据绑定被卸除，监听被移出，子实例也统统被销毁。

## 父子组件加载渲染顺序

渲染：父beforeCreate - -->  父created --> 父beforeMount --> 子beforeCreate --> 子created --> 子beforeMount --> 子mounted --> 父mounted

更新：父beforeUpdate --> 子beforeUpdate --> 子updated --> 父updated

销毁：父beforeDestroy --> 子beforeDestroy --> 子destroyed --> 父destroyed

## 虚拟DOM

虚拟 DOM 就是用一个原生的 JS 对象去描述一个 DOM 节点，是对真实 DOM 的一层抽象。

Vue 中 render 方法中的 `createElement()` 和 React 中的 `React.createElement()` 函数，也就是 h 函数，都是创建虚拟 DOM。

Vue 是使用 vue-loader 将模版转为 h 函数渲染的形式，React 是通过 babel 将 jsx 转换为 h 函数渲染的形式。

`h` 函数接受是三个参数，分别代表是 DOM 元素的标签名、属性、子节点，最终返回一个虚拟 DOM 的对象。

## v-if 和 v-show

`v-show` 只是在 `display: none` 和 `display: block` 之间切换。 无论初始条件是什么都会被渲染出来，DOM 一直保留着的。

`v-if` 当属性初始为 `false` 时，组件就不会被渲染，并且切换条件时会触发销毁和挂载。

## computed 和 watch

`computed` 是计算属性，依赖其他属性计算值，并且 `computed` 的值有缓存，只有当计算值变化才会返回内容。

`watch` 是监听器，监听到值的变化就会执行回调。

所以一般来说需要依赖别的属性来动态获得值的时候可以使用 `computed`，对于监听到值的变化需要做一些复杂业务逻辑的情况可以使用 `watch`。

## keep-alive 组件的作用

如果需要在组件切换的时候，保存一些组件的状态防止多次渲染，就可以使用 `keep-alive` 组件包裹需要保存的组件。

`keep-alive` 组件拥有两个独有的生命周期钩子函数，分别为 `activated` 和 `deactivated`。

用 `keep-alive` 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 `deactivated` 钩子函数，命中缓存渲染后会执行 `actived` 钩子函数。

## nextTick 原理分析

`nextTick` 可以让我们在下次 DOM 更新循环结束之后执行延迟回调，用于获得更新后的 DOM。

## 组件通信方式

父组件通过 `props` 传递数据给子组件，子组件通过 `$emit` 发送事件传递数据给父组件，父组件通过 `$on` 监听事件。

父组件可以通过 `$children` 访问子组件实例，子组件通过 `$parent` 访问父组件实例。

父组件可以通过 `$refs` 获取子组件的引用。

兄弟组件之间通信可通过共同祖辈搭桥，使用 `$parent` 和 `$children`，在 `$children` 中可以通过组件 `name` 查询到需要的组件实例。

跨层级组件通信，在祖先组件中使用 `provide` 方法传入信息，后代组件中通过 `inject` 获取信息。

使用公共的事件总线 `EventBus` 来通信，`EventBus.$emit()` 触发事件，`EventBus.$on()` 接收事件。

使用 `Vuex` 状态管理插件。

## Vue 的路由实现

单页面应用的核心之一是就是更新视图而不重新请求页面。

hash 模式：监听 `hashchange` 事件

history 模式：

采用 HTML5 的新特性，使用 `pushState()`和`replaceState()` 对浏览器历史记录栈进行修改，监听 `popstate` 状态变更。

## Vuex 的使用
