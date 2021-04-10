# JavaScript 面试总结

## 数据类型

基本数据类型（7种）：`null`、`undefined`、`boolean`、`number`、`string`、`symbol`、`bigint`

引用数据类型：`Object`。

可以通过 `Object.prototype.toString.call()`获得一个变量的正确类型。

基本数据类型直接存在栈中，引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。

## 类型转换

### 原始值转布尔值

原始值转布尔值使用 `Boolean()` 函数。

`false`、`null`、`undefined`、`NaN`、 `''`、 `+0`、 `-0`转为 `false`，其他所有值都转为 `true`（包括所有对象）。

### 原始值转数字

原始值转数字使用 `Number()` 函数，如果参数无法被转换为数字，则返回 `NaN`。

`Number()` 函数传入一个字符串，它会试图将其转换成一个整数或浮点数，而且会忽略所有前导的 0，如果有一个字符不是数字，结果都会返回 NaN。

鉴于这种严格的判断，一般还会使用更加灵活的 `parseInt()` 和 `parseFloat()` 进行转换。

`parseInt()` 只解析整数，`parseFloat()` 则可以解析整数和浮点数，如果字符串前缀是 "0x" 或者"0X"，`parseInt()` 将其解释为十六进制数。

`parseInt()` 和 `parseFloat()` 都会跳过任意数量的前导空格，尽可能解析更多数值字符，并忽略后面的内容。如果第一个非空格字符是非法的数字直接量，将最终返回 `NaN`。

### 原始值转字符串

原始值转字符串使用 `String()` 函数，如果不传参数，返回空字符串。

### 原始值转对象

原始值通过调用 `String()`、`Number()` 或者 `Boolean()` 构造函数，转换为它们各自的包装对象。

### 对象转布尔值

所有对象（包括数组和函数）都转换为 `true`。

### 对象转字符串

所有的对象都有 `toString()` 方法，数组、函数、日期和正则改写了 `toString()` 方法。

数组的 `toString()` 方法将每个数组元素转换成一个字符串，并在元素之间添加逗号后合并成结果字符串。

函数的 `toString()` 方法返回源代码字符串。

日期的 `toString()` 方法返回一个可读的日期和时间字符串。

RegExp 的 `toString()` 方法返回一个表示正则表达式直接量的字符串。

### 对象转数字

对象转数字的过程中，首先尝试 `valueOf()` 方法，如果对象具有 `valueOf()` 方法，且返回一个原始值，则将这个原始值转换为数字并返回这个数字。

否则，如果对象具有 `toString()` 方法，且返回一个原始值，则将其转换并返回。否则，抛出一个类型错误异常。

## 相等操作符

规则：

（1）、null、undefined、NaN、 ''、 +0、 -0 都会被转成布尔值 false。

（2）、null 和 undefined 比较时相等，但和其他比较时不相等。

（3）、NaN 和任何值都不想等，包括自己。

（4）、对象和字符串比较时，先把对象通过 toString 变成字符串再比较。

（5）、其他的都转换成数字再比较。，

如果是布尔值和数字比较时，会先调用 `Number()` 将布尔值转换为数字（true => 1; false => 0），再比较。

如果是字符串和数字比较，会先调用 `Number()` 将字符串转换为数字，再比较。

如果是对象和数字比较，先调用对象的 `valueOf()` 方法和 `toString()` 方法，将返回的字符串转成数字，再比较。

如果是对象和布尔值比较，先将布尔值转成数字，再调用对象的 `valueOf()` 和 `toString()` 方法，将返回的字符串转成数字，再比较。

`valueOf()` 的作用是返回一个对象的“值”，默认情况下返回对象本身。

`toString()` 的作用是返回一个对象的字符串形式，默认情况下返回类型字符串，如："[object Object]"

`[] == ![] // -> true` 原因：

（1）、非运算优先级高，先调用 `Boolean()`，将空数组转成布尔值，再取反。此时比较 `[] == false`

（2）、调用 `Number()` 将 false 转换为 0。此时比较 `[] == 0`

（3）、调用 `valueOf()` 和 `toString()` 方法，`[].valueOf()` 还是 `[]` ,`[].valueOf()` 为空字符串。 此时比较 `'' == 0`

（4）、调用 `Number()`，将空字符串转换为 0。 此时比较 `0 == 0`，因此返回 true

`{} == !{} // -> true` 原因：

由于 `{}` 调用 `valueOf()` 方法后返回的还是 `{}`，`{}` 调用 `toString()` 方法后返回 `"[object Object]"`，此时比较 `"[object Object]" == 0`

再调用 `Number()`，此时比较 `NaN == 0`，因此返回 false。

```js
var a = {
  i: 0,
  toString() {
    return ++this.i;
  }
}
if (a == 1 && a == 2 && a == 3) {
  console.log('条件成立')
}
```

## 执行上下文和执行栈

### 执行上下文

执行上下文可以理解为可执行代码的运行环境，分为三种：全局执行上下文、函数执行上下文和 eval 执行上下文。

执行上下文有三个重要属性：变量对象、作用域链、this 指针。

### 变量对象

变量对象是与执行上下文相关的数据作用域，用于存储定义在上下文中的变量和函数声明。因为不同执行上下文下的变量对象稍有不同。

在全局上下文中，变量对象就是全局对象，在浏览器中是 window 对象，允许通过全局对象的属性名来访问全局变量。

在函数执行上下文中，用活动对象来表示变量对象。活动对象除了变量和函数声明，还存储了形参和 arguments 对象。

### 执行过程

执行上下文生分为两个阶段：创建阶段和代码执行阶段

创建阶段包括：创建变量对象、建立作用域链、确定 this 指向。

代码执行阶段包括：变量赋值、函数引用、执行其他代码。

### 执行栈

JS 引擎通过执行上下文栈（后进先出）来管理执行上下文。

JS 引擎首先会创建一个全局执行上下文并且压入当前执行栈。

每当引擎遇到一个函数调用，它会为该函数创建一个新的执行上下文并压入栈的顶部。

当该函数执行结束时，执行上下文从栈中弹出，控制流程到达当前栈中的下一个上下文。

## 作用域和作用域链

### 作用域

作用域是源代码中定义变量的区域，规定了当前执行代码对变量和函数可访问的范围。分为全局作用域、函数作用域和块级作用域。

函数作用域在函数创建时已确定。

在函数作用域中定义的变量和内部函数，在函数外边是不能直接访问到的，而且并不会污染全局变量对象。

### 作用域链

查找变量时，先从当前上下文的变量对象中查找，如果没找到就到父级执行上下文的变量对象中查找，一直到全局上下文的变量对象，这样由多个执行上下文的变量对象构成的链表就是作用域链。

## 闭包

闭包是指有权访问另一个函数作用域中的变量的函数。

常见形式就是在一个函数内部创建另一个函数，内部函数在执行的时候，访问了外部函数的变量。此时，内部函数就是闭包。

## this

`this` 用来指代当前的运行环境。`this` 的指向在函数被调用的时候确定。

浏览器环境中，在全局范围内 `this` 指向 `window` 对象。

在函数中，`this` 永远指向最后调用他的那个对象。

在构造函数中，`this` 指向 new 出来的那个新的对象，也就是实例对象。

箭头函数没有自己的 `this`，函数内部的 `this` 指向声明该箭头函数时父作用域的 `this`，是在声明时确定的，而不是调用时。

## call、apply 和 bind

这三个方法都是函数实例的方法，用来绑定函数内部 `this` 的指向。这三个函数的第一个参数就是 `this` 的指向。

`call()` 和 `apply()` 方法调用后会执行函数，`bind()` 方法只绑定 `this`，不会执行函数。

`call()` 方法还可以接受多个参数，后面的参数则是函数调用时所需的参数。

`apply()` 方法的第二个参数接收一个数组作为函数执行时的参数。

`bind()` 方法只是单纯的绑定 `this`，然后返回一个新函数，并不会执行函数。

## 代码执行过程分析

```js
var scope = "global scope";
function checkScope(){
    var scope = "local scope";
    function f(){
      return scope;
    }
    return f;
}
var foo = checkScope();
foo(); // "local scope" 访问到了一个函数内部的变量
```

（1）、执行全局代码，创建全局执行上下文，全局上下文压入执行栈。

（2）、全局上下文初始化，创建变量对象，建立作用域链，确定 this 指向。

（3）、初始化全局上下文时，checkScope 函数被创建，保存作用域链到该函数内部属性 `[[scope]]`。

（4）、执行 checkScope 函数，checkScope 函数上下文被压入栈顶。

（5）、checkScope 函数上下文初始化。创建变量对象、建立作用域链、确定 this。

（6）、checkScope 函数执行完毕，返回 f 函数的引用赋值给变量 foo，checkScope 函数上下文从栈中弹出。

（7）、执行 foo 函数实际上就是执行 f 函数，创建 f 函数执行上下文，f 执行上下文被压入栈顶。

（8）、f 函数上下文初始化。创建变量对象、建立作用域链、确定 this。

（9）、f 函数执行完毕，f 函数上下文从栈中弹出。

f 执行上下文维护了一个作用域链 `[AO, checkScopeContext.AO, globalContext.VO]`。因为这个作用域链，f 函数可以读取到 checkScope 函数中的变量。

即使 checkScope 函数上下文被销毁了，但是 JS 依然会让 checkScope 的活动对象活在内存中，f 函数依然可以通过 f 函数的作用域链找到它。

这个 f 函数就是闭包，一个可以访问另一个函数内部变量的函数。

## 原型

### 原型 prototype

每个函数都有一个 `prototype` 属性，这个属性指向一个对象，这个对象就是原型对象。原型对象的作用就是定义所有实例对象共享的属性和方法。

实例对象可以通过 `__proto__` 属性和 `Object.getPrototypeOf()` 方法获取原型对象。

### 构造函数 constructor

每个对象都有一个 `constructor` 属性默认指向生成该对象的构造函数。该属性用来分辨对象属于哪个构造函数。

`constructor` 属性不是实例对象自身属性，而是原型对象的属性，可以被所有实例对象继承。

### 原型链

当访问对象的某个属性时，如果在对象本身没有找到，就会到原型中查找，如果没有找到，就会到父类的原型中查找，如果没找到就会到 `Object.prototype` 中查找。

## 对象的创建方式

### 工厂模式

创建用来生产对象的工厂，工厂内部使用同一个模板。

缺点：对象无法识别，所有的实例都指向一个原型。

```js
function createPerson(name) {
  // 创建对象的模板
  var obj = new Object();

  // 添加属性和方法
  obj.name = name;
  obj.getName = function() {
    return this.name;
  };

  // 返回对象
  return obj;
}
```

### 构造函数模式

使用构造函数作为对象的模板，通过 new 操作符生成实例对象。实例对象可以识别为一个特定的类型。

缺点：每次创建实例时，每个方法都要被创建一次。

```js
// 构造函数
function Person(name) {
  this.name = name;
  this.getName = function() {
    return this.name;
  }
}
var p1 = new Person('Tom');
```

### 原型模式

将属性和方法都添加到原型上。

缺点：不能初始化参数，所有的属性和方法都共享。

```js
// 构造函数
function Person(name) {};

// 将属性和方法添加到原型上
Person.prototype = {
  // 将原型重新赋值会修改 constructor 指向，需要手动指回去
  constructor: Person,
  name: 'Tom',
  getName: function() { 
    return this.name;
  }
}
var p1 = new Person();
```

### 组合模式

结合构造函数模式和原型模式。

在构造函数中绑定实例对象独有的属性和方法。

在原型中挂载所以实例对象共享的属性和方法。

```js
// 构造函数中绑定私有的属性和方法
function Person(name) {
  this.name = name;
}
// 原型中定义共享的属性和方法
Person.prototype = {
  // 将原型重新赋值会修改 constructor 指向，需要手动指回去
  constructor: Person,
  getName: function() { 
    return this.name;
  }
}
var p1 = new Person('Tom');
```

## new 操作符的原理

（1）、创建一个新对象，作为将要返回的实例对象。

（2）、将这个新对象的原型，指向构造函数的 prototype 属性。

（3）、执行构造函数，将构造函数内部的 `this`，指向这个新对象。

（4）、返回新对象。

```js
function New(func) {
    // 将类数组 arguments 对象转换为数组
    var args = [].slice.call(arguments);

    // 取出构造函数
    var func = args.shift();

    // 创建新对象，该对象的原型指向继承构造函数的原型，继承构造函数的属性和方法
    var obj = Object.create(func.prototype);

    // result为构造函数执行的结果，通过apply将构造函数内的this指向修改为实例对象
    var result = func.apply(obj, args);
    
    // 当构造函数指定了返回的对象时，New的执行结果就返回该对象，否则返回实例对象
    return (typeof result === 'object' && result != null) ? result : obj;
}
```

## 对象的继承

ES5 中组合使用原型链继承和借用构造函数继承。通过原型链实现共享属性和方法的继承，通过借用构造函数来实现实例属性和方法的继承。

```js
// 父类
function Parent(name) {
  this.name = name;
}
Parent.prototype.getName = function() {
  return this.name;
}
// 子类
function Child(name, age){
  Parent.call(this, name);
  this.age = age;
}
// 子类的原型指向父类的实例
Child.prototype = new Parent();
```

ES6 中使用 `extends` 关键字实现继承。

```js
// 父类
class Parent {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return name;
  }
}
// 子类继承父类
class Child extends Parent {
  constructor(name, age) {
    super(name); // 调用父类的构造函数
    this.age = age;
  }
}
```

ES5 的继承实质上是先创建子类的实例对象，然后再将父类的方法添加到 this 上（Parent.call(this)）。

ES6 的继承实质上是先创建父类的实例对象 this（所以必须先调用父类的 super()方法），然后再用子类的构造函数修改this。

## 事件循环

JavaScript 有一个主线程和调用栈。所有的任务都会放到调用栈中等待主线程来执行。

Event Loop 执行过程如下：

（1）、一开始整个脚本 script 作为一个宏任务执行。

（2）、执行过程中，同步代码直接执行，宏任务进入宏任务队列，微任务进入微任务队列。

（3）、当前宏任务执行完出队，检查微任务列表，有则依次执行，直到全部执行完毕。

（4）、执行完本轮的宏任务，回到步骤 （2），依次循环，直到宏任务和微任务队列为空。

宏任务：script、setTimeout、setInterval、setImmediate、I/O、UI rendering

微任务：

MutationObserver

Promise.then()/catch()

以 Promise 为基础开发的其他技术，例如 fetch API

V8 的垃圾回收过程

Node 独有的 process.nextTick
