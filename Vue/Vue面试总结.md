# Vue 面试总结

## MVVM 模型

`MVVM` 模型是把 `MVC` 模型中的 `Controller` 变成了 `ViewModel`。

`Model` 代表数据模型；`View` 代表 UI 组件；

`ViewModel` 是 `View` 层和 `Model` 层的桥梁，数据会绑定到 `ViewModel` 并将数据渲染到页面中，页面变化的时候会通知 `ViewModel` 更新数据。

## Vue 响应式数据原理

在组件初始化时，通过 `Object.defineProperty` 方法给 `data` 选项中的所有属性加上 `getter/setter`。

当 `render` 方法被执行的时候，会用到 `data` 里的属性值，此时会触发 `getter` 函数, Vue 会去记录所有依赖此属性值的组件，完成依赖收集。

当 `data` 里的属性值发生变化后，会触发 `setter` 函数，此时 Vue 会去通知所有依赖于此属性值的组件去调用他们的 `render` 函数进行更新。

Vue3 改用代理 `Proxy` 替代 `Object.defineProperty` 方法实现数据劫持。

## Proxy 优点

`Proxy` 可以直接监听对象而非属性。

`Proxy` 可以直接监听数组的变化。

`Proxy` 有多达 13 种拦截方法。

`Proxy` 返回的是一个新对象，可以只操作新的对象达到目的，而 `Object.defineProperty` 只能遍历对象属性直接修改。

## 虚拟DOM

虚拟 DOM 就是用一个原生 JS 对象去描述一个 DOM 节点，是对真实 DOM 的一层抽象。

Vue 中 render 方法中的 `createElement()` 和 React 中的 `React.createElement()` 函数，也就是 h 函数，都是创建虚拟 DOM。

`h` 函数接受是三个参数，分别代表是 DOM 元素的标签名、属性、子节点，最终返回一个虚拟 DOM 的对象。

## key 的作用

## 组件生命周期

`beforeCreate`：组件实例被创建之前调用。

`created`：组件实例创建完成后调用，此时真实 DOM 还没有生成。

`beforeMount`：挂载 DOM 之前调用。

`mounted`：DOM 挂载完成后调用，此时可以访问到真实 DOM。

`beforeUpdate`：组件数据更新之前调用，发生在虚拟 DOM 打补丁之前。

`updated`：组件数据更新之后调用。

`activited`：`keep-alive` 组件专属，组件被激活时调用。

`deadctivated`：`keep-alive` 组件专属，组件被销毁时调用。

`beforeDestroy`：组件销毁前调用。

`destroyed`：组件销毁后调用。

## 父子组件加载渲染顺序

渲染：先是父组件beforeCreate、created 、beforeMount，然后子组件beforeCreate、created、beforeMount 、mounted，最后父组件mounted

更新：先是父组件beforeUpdate，然后子组件beforeUpdate、updated，最后父组件updated

销毁：先是父组件beforeDestroy，然后子组件beforeDestroy、destroyed，最后父组件destroyed

## 组件通信方式

父组件通过 `props` 传递数据给子组件，子组件通过 `$emit` 发送事件传递数据给父组件，父组件通过 `$on` 监听事件。

父组件可以通过 `$children` 访问子组件实例，子组件通过 `$parent` 访问父组件实例。

父组件可以通过 `$refs` 获取子组件的引用。

跨层级组件，可以在祖先组件中使用 `provide` 方法传入信息，在后代组件中通过 `inject` 获取信息。

使用公共的事件总线 `EventBus` 来通信，`EventBus.$emit()` 触发事件，`EventBus.$on()` 接收事件。

使用 `Vuex` 状态管理插件。

## v-model

`v-model` 可以看成是 `value` + `input` 方法的语法糖。`v-model`，会根据表单标签的不同生成不同的事件和属性。

可以通过组件 `model` 属性的 `prop` 和 `event` 属性来进行自定义。

## v-if 和 v-show

当条件不成立时，`v-if` 不会渲染 DOM 元素。

`v-show` 是样式 display 的切换，无论初始条件是什么都会被渲染出来，DOM 一直保留着的。

## computed 和 watch

`computed` 是计算属性，依赖的属性发生变化时才会更新。

`watch` 是监听器，没有缓存，监听到值的变化就会执行回调。

## keep-alive 组件的作用

`keep-alive` 组件可以实现组件缓存，当组件切换时不会对当前组件进行卸载。

常用的两个属性 `include/exclude`，允许组件有条件的进行缓存。

`activated` 和 `deactivated`生命周期函数，用来得知当前组件是否处于活跃状态。

## nextTick 原理分析

在下次 DOM 更新循环结束之后执行延迟回调。

在修改数据之后立即使用这个方法，可以获取更新后的 DOM。

## Vue 的路由实现

单页面应用的核心之一是就是更新视图而不重新请求页面。

hash 模式：监听 `hashchange` 事件

history 模式：

采用 HTML5 的新特性，使用 `pushState()`和`replaceState()` 对浏览器历史记录栈进行修改，监听 `popstate` 状态变更。

## Vuex 的使用
