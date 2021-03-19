# vue-router 面试总结

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

## hash 模式

vue-router 默认 hash 模式，利用 URL 中的 hash。

`#` 符号本身以及它后面的字符称之为 hash，可通过 `window.location.hash` 属性读取。

hash 虽然出现在 URL 中，但不会被包括在 HTTP 请求中。因此，改变 hash 不会重新加载页面。

每一次改变 hash，都会在浏览器的访问历史中增加一条记录。

路由改变时会更新响应式数据 `_route` 的属性值，从而触发更新视图。

如果是在浏览器地址栏中直接输入改变路由，通过在 `window` 监听 `hashchange` 事件，调用 `replaceHash` 方法。

## history 模式

history 模式，利用 HTML5 中 History API 的 `pushState()` 和 `replaceState()` 方法。

`pushState()` 和 `replaceState()` 对浏览器历史记录栈进行修改。

虽然当前 URL 改变了，但浏览器不会立即发送请求该 URL。

## history 模式的一个问题


