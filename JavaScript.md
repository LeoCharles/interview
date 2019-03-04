# JavaScript 面试题

## 数组

+ `join`: 通过指定连接符生成字符串
+ `push / pop`: 末尾推入和弹出，改变原数组， 返回推入/ 弹出项
+ `unshift / shift`: 头部推入和弹出，改变原数组，返回操作项
+ `sort(fn) / reverse`: 排序与反转，改变原数组
+ `concat`: 连接数组，不影响原数组， 浅拷贝
+ `slice(start, end)`: 返回截断后的新数组，不改变原数组
+ `splice(start, number, value...)`: 返回删除元素组成的数组，value 为插入项，改变原数组
+ `indexOf / lastIndexOf(value, fromIndex)`: 查找数组项，返回对应的下标
+ `map`：映射数组，对数组每一项运行回调函数，返回由回调函数调用结果组成的新数组
+ `forEach`: 遍历数组，对数组每一项运行回调函数，没有返回值，无法 `break`
+ `filter`: 过滤数组，对对数组每一项运行回调函数，返回满足过滤条件组成的数组
+ `every`: 判断数组中每一项都是否满足条件，只有所有项都满足条件，才会返回 `true`
+ `some`: 判断数组中是否存在满足条件的项，只要有一项满足条件，就会返回 `true`
+ `reduce / reduceRight(fn(prev, cur)， defaultPrev)`: 迭代数组，两两执行，prev 为上次化简函数的 return 值，cur 为当前值(从第二项开始)

## 原型和原型链

每个函数都有一个 `prototype` 属性，该属性指向一个对象。把这个函数作为构造函数，生成的实例对象有个隐藏属性 `__proto__` ，这个属性也会指向这个对象，这个对象就是实例对象的原型。

原型也是一个对象，它也有原型，它的 `__proto__` 隐藏属性指向 `Object.prototype`。这样通过 `__proto__` 连接的原型就组成了原型链。

## 继承

结合构造函数和原型模式创建类，将私有的方法的方法和属性放在构造函数中，将公有的属性和方法放在原型中。

JavaScript 通过原型实现类的继承。继承方式有：原型链继承、借用构造函数继承、组合继承 、寄生组合继承。

组合继承是结合原型链继承和借用构造函数继承。把子类的原型指向父类的实例，把子类原型的constructor指回子类构造函数，再在子类的构造函数中调用父类的构造函数，实现继承。缺点是调用了两次父类构造函数。

寄生组合继承是通过 Object.create() 把子类的原型直接指向父类的原型，少调用一次父类，同时也要把子类原型的constructor 指回子类构造函数，再在子类的构造函数中调用父类的构造函数，实现继承。


## 闭包

JavaScript 中有全局作用域、函数作用域和块级作用域。一般情况下，函数作用域内声明的变量函数在函数外部无法访问。可以通过在函数内部再定义一个内部函数，并把它作为返回值，这样在函数外部就可以通过这个内部函数访问函数内的变量了，这个内部函数就是闭包。

## 防抖和节流

防抖与节流函数是一种最常用的 “高频触发” 优化方式，能对性能有较大的帮助

+ `防抖(debounce)`，将多次高频操作优化为只在最后一次执行

  通常使用的场景是：用户输入，只需再输入完成后做一次输入校验即可

```js
function debounce(fn, wait, immediate) {
  let timer = null

  return function() {
    let args = arguments
    let context = this

    if (immediate && !timer) {
      fn.apply(context, args)
    }

    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, wait)
  }
}
```

+ `节流(throttle)`，每隔一段时间后执行一次，也就是降低频率，将高频操作优化成低频操作

  通常使用场景: 滚动条事件 或者 `resize` 事件，通常每隔 100~500 ms执行一次即可

```js
function throttle(fn, wait, immediate) {
  let timer = null
  let callNow = immediate

  return function() {
    let context = this,
      args = arguments

    if (callNow) {
      fn.apply(context, args)
      callNow = false
    }

    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args)
        timer = null
      }, wait)
    }
  }
}
```