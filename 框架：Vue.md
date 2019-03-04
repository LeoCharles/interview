# Vue.js 面试题

## Vue中实现双向数据绑定

Vue 在初始化时会遍历 data 选项中的属性，并用 observer 劫持数据，使用 Object.defineProperty 每个属性添加 getter 和 setter。在 getter 函数中将订阅者 watcher 添加到 dep 订阅器。在 setter 函数中通知订阅者更新。指令编译器 Complie 会深度遍历 DOM 树，对每个元素节点的指令模板进行替换数据以及订阅数据。当数据发生变化是，会触发 setter 方法，setter 会调用 notify() 方法 通知所有的订阅者更新视图。

## computed、watch

computed 计算属性是基于它们的依赖进行缓存。计算属性只有在它的相关依赖发生改变时才会重新求值。

watch 监听复杂数据类型需用深度监听，听对应的函数名必须为 handler。