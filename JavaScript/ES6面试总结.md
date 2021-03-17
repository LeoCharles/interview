# ES6 总结

## let 与 const

## 变量的解构赋值

## 字符串的扩展

## 数组的扩展

## 对象的扩展

## 函数的扩展

### 参数的默认值

为函数参数指定默认值

### 剩余运算符

### 箭头函数

## Symbol

新的原始数据类型，表示独一无二的值。

通过 `Symbol()` 函数生成，可以接受一个字符串作为参数，表示对 `Symbol` 实例的描述。

## Set 和 Map

### Set

新的数据结构 `Set`，类似于数组，但是成员的值都是唯一的，没有重复的值。

`Set()` 函数可以接受一个数组（或者具有 `iterable` 接口的其他数据结构）作为参数，用来初始化。

数组去重的方法：`[...new Set(array)]`

### Map

新的数据结构 `Map`，类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键，提供了“值—值”的对应。

## Iterator 遍历器 与 for...of 循环

### Iterator 遍历器接口

遍历器 `Iterator` 是一种接口，为各种不同的数据结构提供统一的访问机制。

任何数据结构只要部署 `Iterator` 接口，就可以完成遍历操作。

### for...of 循环

`for...of` 循环是遍历所有数据结构的统一的方法。一个数据结构只要部署了 `iterator` 接口，就可以用 `for...of` 循环遍历。

数组、Set 和 Map 结构、类数组的对象（arguments、DOM NodeList）、Generator 以及字符串，都可以用 `for...of` 循环遍历。

普通对象不能直接使用 `for...of` 遍历，会报错，必须部署了 `Iterator` 接口后才能使用。

使用 `Object.keys` 方法将对象的键名生成一个数组，然后遍历这个数组。

`for...of` 与 `for...in` 的区别：

`for...in` 循环为遍历对象设计，不适合遍历数组，遍历数组时它以字符串作为键名而不是数字键名，还会遍历原型链上的键。

## Generator 生成器

`Generator` 生成器是一种异步编程解决方案，它可以理解成一个状态机，封装了多个内部状态。

执行 `Generator` 函数会返回一个遍历器对象，返回的遍历器对象，可以依次遍历 `Generator` 函数内部的每一个状态。

`Generator` 函数是有两个特征:

一，`function` 关键字与函数名之间有一个星号。

二，函数体内部使用`yield` （意思就是“产出”）表达式，定义不同的内部状态。

调用 `Generator` 函数后，返回的是一个遍历器对象（指向内部状态的指针对象），调用遍历器对象的 `next` 方法，使得指针移向下一个状态。

每次调用 `next` 方法，就会返回一个有着 `value` 和 `done` 两个属性的对象。

`value` 属性表示当前的内部状态的值，是 `yield` 表达式后面那个表达式的值；`done` 属性是一个布尔值，表示是否遍历结束。

总之，`Generator` 函数是分段执行的，`yield` 表达式是暂停执行的标记，而 `next` 方法可以恢复执行。

每次调用 `next` 方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个`yield` 表达式（或`return` 语句）为止。

## Promise 期约

`Promise` 是异步编程的一种解决方案，可以理解成一个容器，里面保存着异步操作的结果。

`Promise` 对象有三种状态：`pending`（进行中）、`fulfilled`（已成功）和 `rejected`（已失败）。

根据异步操作的结果，可以决定当前是哪一种状态，可以从 `pending` 变为 `fulfilled`，或者从 `pending` 变为 `rejected`，状态一旦改变就不能改变，这时状态就定型了，称为 resolved（已定型）。

`Promise` 构造函数接受一个函数作为参数，该函数的两个参数分别是 `resolve` 和 `reject`。

```js
new Promise((resolve, reject) => {})

```

`resolve` 函数的作用是，将 `Promise` 对象的状态从 `pending` 变为 `resolved`。

`reject` 函数的作用是，将 Promise 对象的状态从 `pending` 变为 `rejected`。

`Promise` 实例生成以后，可以用 `then` 方法分别指定 `resolved` 状态和 `rejected` 状态的回调函数，第一个是状态变为 `resolved` 时调用，第二个参数是状态变为 `rejected` 时调用。

## async 函数

## Class 类

### 继承

Class 可以通过 `extends` 关键字实现继承。

```js
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```

### super 关键字

## Module 模块

## Proxy 代理

## Reflect 反射
