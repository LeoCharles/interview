# React 面试总结

## React 生命周期

当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：

+ `constructor()`
+ `static getDerivedStateFromProps()`
+ `render()`
+ `componentDidMount()`

当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：

+ `static getDerivedStateFromProps()`
+ `shouldComponentUpdate()`
+ `render()`
+ `getSnapshotBeforeUpdate()`
+ `componentDidUpdate()`

当组件从 DOM 中移除时会调用如下方法：

+ `componentWillUnmount`

### constructor()

构造函数仅用于两种情况：通过 `this.state` 赋值对象来初始化内部的 `state`；为事件处理函数绑定实例。

如果不初始化 `state` 或不进行方法绑定，则不需要为组件实现构造函数。

在构造函数中应先调用 `super(props)`，再使用 `this`。

只能在构造函数中直接为 `this.state` 赋值。如需在其他方法中赋值，应使用 `this.setState()`。

避免将 `props` 的值复制给 `state`，如此做毫无必要，可以直接使用 `this.props.xx`。

### render()

`render()` 函数应该为纯函数，在不修改组件 `state` 的情况下，每次调用时都返回相同的结果。

如果 `shouldComponentUpdate()` 返回 false，则不会调用 `render()`。

当 `render()` 函数被调用时，会返回以下类型之一:

+ `React 元素`，通常通过 JSX 创建。
+ `数组或 fragments`，多个元素。
+ `Portals`，可以渲染子节点到不同的 DOM 子树中。
+ `字符串或数值类型`，它们在 DOM 中会被渲染为文本节点。
+ `布尔类型或 null`，什么都不渲染。

### componentDidMount()

`componentDidMount()` 会在组件挂载后（插入 DOM 树中）立即调用。

依赖于 DOM 节点的初始化应该放在这里。如需通过网络请求获取数据。

可以在 `componentDidMount()` 里直接调用 `setState()`。

### componentDidUpdate()

`componentDidUpdate()` 会在更新后会被立即调用。首次渲染不会执行此方法。

可以在 `componentDidUpdate()` 中直接调用 `setState()`，但它必须被包裹在一个比较更新前后 props 的条件语句里，否则会导致死循环。

如果 `shouldComponentUpdate()` 返回值为 false，则不会调用 `componentDidUpdate()`。

### componentWillUnmount()

`componentWillUnmount()` 会在组件卸载及销毁之前直接调用。

在此方法中执行必要的清理操作，例如，清除 timer，取消网络请求等。

## React 组件

### 函数组件

函数组件是一个纯函数，它接收一个 props 返回一个 react 元素。

函数组件中不能使用 setState，也没有生命周期。

### 类组件

类组件需要去继承 `React.Component` 并且创建 `render()` 函数返回 react 元素。

在类组件的构造函数中调用 `super(props)`。

### 受控组件

在表单元素中把 value 属性设置为组件的 state，监听到 change 事件时，通过 setState() 来更新 value，这种表单组件称为受控组件。

### 高阶组件

高阶组件（HOC）是 React 中用于复用组件逻辑的一种技巧。

高阶组件是参数为组件，返回值为新组件的函数。

## React 事件处理

React 事件对象是合成事件，没有浏览器兼容问题。

在 JavaScript 中，class 的方法默认不会绑定 this，因此需要手动绑定 this。

两种方式:

（1）、类的方法中使用箭头函数

```js
class LoggingButton extends React.Component {
  // 此语法确保 `handleClick` 内的 `this` 已被绑定。
  // 注意: 这是 *实验性* 语法。
  handleClick = () => {
    console.log('this is:', this);
  }
  render() {
    return (
      <button onClick={this.handleClick}> Click me</button>
    );
  }
}
```

（2）、在回调中使用箭头函数

```js
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }
  render() {
    // 此语法确保 `handleClick` 内的 `this` 已被绑定。
    return (
      <button onClick={() => this.handleClick()}>Click me</button>
    );
  }
}
```

## Hooks

在不编写 class 的情况下使用 state 以及其他的 React 特性。

只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。

只能在函数组件中调用 Hook，在 class 组件内部不起作用的，可以用来取代 class。

### useState

在函数组件中可以通过调用 `useState`，来给组件添加一些内部 `state`。可以在一个组件中多次使用 `useState`。

`useState` 会返回一对值：当前状态和一个让你更新它的函数。

### useEffect

`useEffect` 可以给函数组件增加了操作副作用的能力。

它跟 class 组件中的 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 具有相同的用途。

副作用函数还可以通过返回一个函数来指定如何“清除”副作用。

### useContext

useContext 可以不使用组件嵌套就可以订阅 React 的 Context。

## react-redux 是如何工作的


