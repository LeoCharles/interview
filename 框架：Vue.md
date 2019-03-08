# Vue.js 面试题

## VUE生命周期

+ `_init`
  + `initLifecycle / Event`：往 `vm` 上挂载各种属性
  + `callHook: beforeCreated`：实例刚创建
  + `initInjection/initState`：初始化注入和 data 响应性
  + `created`：创建完成，属性已经绑定，但还未生成真实 `DOM`
  + 进行元素的挂载：`$el / vm.$mount()`
  + 是否有 `template`：解析成 `render function`
    + `*.vue` 文件：`vue-router` 会将 `<template>` 编译成 `render function`
  + `beforeMount`：模板编译 / 挂载之前
  + 执行 `render function`，生成真实 `DOM`，并替换到 `DOM Tree` 中
  + `mountd`：组件已挂载
+ `update`:
  + 执行 `diff` 算法，比对改变是否需要触发 UI 更新
  + `flushScheduleQueue`
    + `watcher.before`: 触发 `beforeUpdate` 钩子
    + `watcher.run()`: 执行 `watcher` 中的 `notify`，通知所有依赖项更新 UI
  + 触发 `updated`钩子：组件已更新
+ `actived / deactived(keep-alive)`：不销毁、缓存，组件激活与失活
+ `destory`:
  + `beforeDestory`: 销毁开始
  + 销毁自身且递归销毁子组件以及事件监听：
    + `remove()`: 删除节点
    + `watcher.teardown()`: 清空依赖
    + `vm.$off()`: 解绑监听
    + `destoryed`: 销毁完成后触发钩子

```js
new Vue({})

// 初始化 VUE 实例
function _init() {
  // 挂载属性
  initLifeCycle(vm)

  // 初始化事件系统，钩子函数等
  initEvent(vm)

  // 编译 slot vnode
  initRender(vm)

  // 触发钩子函数 --- beforeCreate
  callHook(vm, 'beforeCreate')

  // 添加 inject
  initInjection(vm)

  // 初始化响应数据 props / data / watch / computed / methods
  initState(vm)

  // 添加 provide
  initProvide(vm)

  // 触发钩子函数 --- created
  callHook(vm, 'created')

  // 挂载节点
  if (vm.$options.el) {
    vm.$mounted(vm.$options.el)
  }
}

// 挂载节点
function mountComponent(vm) {
  if(!this.options.render) {
    let ( render ) = compileToFunctions()
    this.options.render = render
  }

  // 触发钩子函数 --- beforeMounted
  callHook('beforeMounte)

  // 初始化观察者  render 渲染 vdom
  vdom = vm.render()

  // update: 根据 diff 出的 patchs 挂载成真实的 dom
  vm._update(vdom)

  // 触发钩子  ---  mounted
  callHook(vm, 'mounted')
}

// 更新节点
funtion queueWatcher(watcher) {
  nextTick(flushScheduleQueue)
}

// 清空队列
function flushScheduleQueue() {
  // 遍历队列中所有修改
  for(){
    // beforeUpdate
    watcher.before()

    // 依赖局部更新节点
    watcher.update()

    // 触发钩子 --- updated
    callHook('updated')
  }
}

// 销毁实例实现
Vue.prototype.$destory = function() {
  // 触发钩子 --- beforeDestory
  callHook(vm, 'beforeDestory')

  // 自身及子节点
  remove()

  // 删除依赖
  watcher.teardown()

  // 删除监听
  vm.$off()

  // 触发钩子 --- destoryed
  callHook(vm, 'destoryed')
}
```

## Vue中实现双向数据绑定

Vue 在初始化时会遍历 data 选项中的属性，并用 observer 劫持数据，使用 Object.defineProperty 每个属性添加 getter 和 setter。在 getter 函数中将订阅者 watcher 添加到 dep 订阅器。在 setter 函数中通知订阅者更新。指令编译器 Complie 会深度遍历 DOM 树，对每个元素节点的指令模板进行替换数据以及订阅数据。当数据发生变化是，会触发 setter 方法，setter 会调用 notify() 方法 通知所有的订阅者更新视图。

## computed、watch

computed 计算属性是基于它们的依赖进行缓存。计算属性只有在它的相关依赖发生改变时才会重新求值。

watch 监听复杂数据类型需用深度监听，听对应的函数名必须为 handler。