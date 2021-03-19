# React 面试总结

## React 生命周期

+ 初始化阶段：

  + `getDefaultProps`：获取实例的默认属性
  + `getInitialState`：获取每个实例的初始化状态
  + `componentWillMount`：组件即将被装载、渲染到页面上
  + `render`：组件在这里生成虚拟的 DOM 节点
  + `componentDidMount`：组件真正在被装载之后

+ 运行中状态：

  + `componentWillReceiveProps`：组件将要接收到属性的时候调用
  + `shouldComponentUpdate`：组件是否更新（可以返回 false，接收数据后不更新，阻止 render 调用）
  + `componentWillUpdate`：组件即将更新不能修改属性和状态
  + `render`：组件重新描绘
  + `componentDidUpdate`：组件已经更新

+ 销毁阶段：

  + `componentWillUnmount`：组件即将销毁

## 虚拟 DOM

`虚拟DOM` 相当于在 JS 和真实 `DOM` 中间加了一个缓存，利用 `Diff` 算法避免了没有必要的 `DOM` 操作，从而提高性能。

用 JS 对象结构表示 `DOM` 树的结构；然后用这个树构建一个真正的 `DOM` 树，插到文档当中当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异把 2 所记录的差异应用到步骤 1 所构建的真正的 `DOM` 树上，视图就更新了

## hooks 使用

## React 和 Vue 的不同点
