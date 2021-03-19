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

当 `render` 方法被执行的时候，会用到 `data` 里的属性值，此时会触发 `getter` 函数, Vue 会去记录所有依赖此属性值的组件，完成依赖收集。

当 `data` 里的属性值发生变化后，会触发 `setter` 函数，此时 Vue 会去通知所有依赖于此属性值的组件去调用他们的 `render` 函数进行更新。

Vue3 改用代理 `Proxy` 替代 `Object.defineProperty` 方法实现数据劫持。

监听器 Observer：对数据对象进行遍历，包括子属性对象的属性，利用 Object.defineProperty() 给属性都加上 setter 和 getter。当给某个属性赋值时，就会触发 setter，就能监听到数据的变化。

解析器 Compile：解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。

订阅者 Watcher：订阅者是 Observer 和 Compile 之间通信的桥梁 ，主要的任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。

订阅器 Dep：订阅器采用 发布-订阅 设计模式，用来收集订阅者 Watcher，对监听器 Observer 和 订阅者 Watcher 进行统一管理。

## Proxy 优点

`Proxy` 可以直接监听对象而非属性。

`Proxy` 可以直接监听数组的变化。

`Proxy` 有多达 13 种拦截方法。

`Proxy` 返回的是一个新对象，可以只操作新的对象达到目的，而 `Object.defineProperty` 只能遍历对象属性直接修改。

## 单项数据流

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

Vue 实例有一个完整的生命周期，包括创建、初始化数据、编译模版、挂载 Dom、初始化渲染、数据更新、重新渲染、卸载。

`beforeCreate`：组件实例被创建之前调用。

`created`：组件实例创建完成后调用，此时真实 DOM 还没有生成。

`beforeMount`：挂载 DOM 之前调用。

`mounted`：DOM 挂载完成后调用，此时可以访问到真实 DOM。

`beforeUpdate`：组件数据更新之前调用，发生在虚拟 DOM 打补丁之前。

`updated`：组件数据更新之后调用。

`activited`：`<keep-alive>` 组件专属，组件被激活时调用。

`deadctivated`：`<keep-alive>` 组件专属，组件被销毁时调用。

`beforeDestroy`：组件销毁前调用。

`destroyed`：组件销毁后调用。

## 父子组件生命周期函数执行顺序

加载渲染：先是父组件beforeCreate、created 、beforeMount，然后子组件beforeCreate、created、beforeMount 、mounted，最后父组件mounted

子组件更新：先是父组件beforeUpdate，然后子组件beforeUpdate、updated，最后父组件updated

父组件更新：父组件beforeUpdate，父组件updated

销毁：先是父组件beforeDestroy，然后子组件beforeDestroy、destroyed，最后父组件destroyed

## 哪个生命周期内调用异步请求

`created`、`beforeMount`、`mounted` 这三个钩子函数中 `data` 已经创建，都可以进行异步请求，可以将服务端端返回的数据进行赋值。

推荐在 `created` 中调用异步请求，能更快获取到服务端数据，减少页面 loading 时间。服务端渲染不支持 `beforeMount` 、`mounted` 钩子函数。

## 组件通信方式

父组件通过 `props` 传递数据给子组件，子组件通过 `$emit` 发送事件传递数据给父组件，父组件通过 `$on` 监听事件。

父组件可以通过 `$children` 访问子组件实例，子组件通过 `$parent` 访问父组件实例。

父组件可以通过 `$refs` 获取子组件的引用。

跨层级组件，可以在祖先组件中使用 `provide` 方法传入信息，在后代组件中通过 `inject` 获取信息。

使用公共的事件总线 `EventBus` 来通信，`EventBus.$emit()` 触发事件，`EventBus.$on()` 接收事件。

使用 `Vuex` 状态管理插件。

## v-model

`v-model` 指令用在 input、select、textarea等表单元素上创建双向数据绑定。

`v-model` 可以看成是语法糖，不同的表单元素使用不同的属性和事件。

text 和 textarea 元素使用 value 属性和 input 事件。

checkbox 和 radio 使用 checked 属性和 change 事件。

select 使用 value 属性和 change 事件。

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

