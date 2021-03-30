# CSS 面试总结

## CSS 盒模型

box-sizing 有三个值：border-box，padding-box，content-box

+ 标准盒模型（content-box）：width 为 content，盒子真实宽度为 width、padding、border 的和。

+ IE 盒模型（border-box）: width 为盒子真实的宽度，包含 content、padding 和 border。

## 盒子水平垂直居中

（1）绝对定位加盒子移动宽高的一半

先绝对定位 `left: 50%;top: 50%;` 让盒子左上角水平垂直居中

再把盒子往左移动一半，往上移动一半，使用 `translate(-50%, -50%)`。

如果盒子宽高确定，可以使用 `margin-top` 和 `margin-left` 负的宽、高的一半。

如果盒子宽高确定，也可以设置绝对定位上下左右都为 0，再加上 `margin: auto`。

```css
.parent {
  position: relative;
}
.son {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

（2）使用 `flex` 居中

```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

## Flex 盒模型

采用 Flex 布局的元素，称为容器，它的所有子元素自动成为容器成员，称为项目。

### 容器的 6 个属性

`flex-direction`：定义主轴的方向，`row | row-reverse | column | column-reverse`。

`flex-wrap`：定义一条轴线排不下时如何换行，`nowrap | wrap | wrap-reverse`。

`flex-flow`：是 `flex-direction` 和 `flex-wrap` 的简写，默认值为 `row nowrap`。

`justify-content`：定义了项目在主轴上的对齐方式，`flex-start | flex-end | center | space-between | space-around`。

`align-items`：定义项目在交叉轴上如何对齐，`flex-start | flex-end | center | baseline | stretch`。

`align-content`：定义多根轴线的对齐方式。如果只有一根轴线，不起作用,`flex-start | flex-end | center | space-between | space-around | stretch`。

### 项目的 6 个属性

`order`：定义项目的排列顺序。数值越小，排列越靠前，默认为0。

`flex-grow`：定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。如果所有项目都为1，则它们将等分剩余空间。如果一个项目为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

`flex-shrink`：定义项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。如果所有项目都为1，当空间不足时，都将等比例缩小。如果一个项目为0，其他项目都为1，则空间不足时，前者不缩小。

`flex-basis`：定义在分配多余空间之前，项目占据的主轴空间。它的默认值为auto，即项目的本来大小。它可以设为跟 width 或 height 属性一样的值（比如350px），则项目将占据固定空间。

`flex`：是 `flex-grow`, `flex-shrink` 和 `flex-basis` 的简写，默认值为 `0 1 auto`。后两个属性可选。该属性有两个快捷值：`auto (1 1 auto)` 和 `none (0 0 auto)`。

`align-self`：允许单个项目有与其他项目不一样的对齐方式，可覆盖 `align-items` 属性。默认值为auto，表示继承父元素的 `align-items` 属性，如果没有父元素，则等同于 `stretch`。

## 布局方案

圣杯布局和双飞翼布局，本质上都是左右固定，中间自适应。

使用浮动和负 margin 实现。

```html
<head>
  <style>
    .container {
      padding: 0 200px;
    }
    .center {
      float: left;
      width: 100%;
    }
    .left {
      float: left;
      width: 200px;
      margin-left: -100%;
      position: relative;
      left: -200px;
    }
    .right {
      float: left;
      width: 200px;
      margin-right: -200px;
    }
  </style>
</head>
<body>
<!-- 圣杯布局 -->
  <div class="container clearfix">
    <div class="center">中间</div>
    <div class="left">左侧</div>
    <div class="right">右侧</div>
  </div>
</body>
```

```html
<head>
  <style>
    .container {
      float: left;
      width: 100%;
    }
    .container .center {
      margin: 0 200px;
    }
    .left {
      float: left;
      width: 200px;
      margin-left: -100%;
    }
    .right {
      float: left;
      width: 200px;
      margin-left: -200px;
    }
  </style>
</head>
<!-- 双飞翼布局 -->
<body class="clearfix">
  <div class="container">
    <div class="center">中间</div>
  </div>
  <div class="left">左侧</div>
  <div class="right">右侧</div>
</body>
```

使用定位实现。

```css
.container {
  position: relative;
}
.center {
  margin: 0 200px;
}
.left, .right {
  position: absolute;
  top: 0;
  width: 200px;
}
.left {
  left: 0;
}
.right {
  right: 0;
}
```

使用 CSS3 中的 `cacl()` 实现。

```css
.center {
  /* 100% 宽度减去左右共 400px */
  width: calc(100% - 400px);
}
```

使用 flex 布局实现。

```css
.container {
  display: flex;
  justify-content: space-between;
}
.center {
  /* 剩余空间全部占用 */
  flex: 1;
}
.left, .right {
  /* 既不放大，也不缩小，固定 200px */
  flex: 0 0 200px;
}
```

## 移动端响应式布局开发方案

### media 媒体查询

适合 PC 端和移动端用一套页面的项目。

媒体类型: all（所有设备）、print（打印机和打印预览）、screen（电脑、平板、手机等屏幕）

```css
@media screen and (min-width:800px) and (orientation:landscape){
/* 横屏以及最小宽度为 800px 的条件应用里面的样式 */
}
@media screen and (min-width: 960px) and (max-width:1200px){
/* 在屏幕中宽度在[960px,1200px]区间会应用里面的样式 */
}

@media screen and (max-width: 960px){
/* 在屏幕中宽度小于等于960px会应用里面的样式 */
}
```

### rem 单位

`rem` 是 CSS3 新增的一个相对单位，是指相对于根元素 html 的 font-size 的值进行计算。

浏览器 html 的默认字体高是 16px，为了简化换算，可设置 `font-size: 62.5%`，这样 `1rem = 10px`。

### vw/vh 单位

vw：可视区宽度百分比单位。

vh：可视区高度百分比单位。

## position 四种定位的区别

默认 static：按照正常文档流进行排列。

相对定位 relative ：相对于自身原有位置进行偏移，仍处于标准文档流中。

绝对定位 absolute：相对于最近的已定位（非 `static`）的祖先元素进行偏移，脱离标准文档流。

固定定位 fixed：相对于浏览器视窗定位，不随页面滚动，脱离标准文档流。

## CSS 动画

### 过渡动画

从一个属性的某个值过渡到这个属性的另外一个值，这是一个状态的转变，需要一种触发条件，比:hoever、:focus、:checked、媒体查询或者JavaScript。

语法：`transition: property duration timing-function delay;`

`transition-property`：规定设置过渡效果的 CSS 属性的名称

`transition-duration`：规定完成过渡效果需要多少秒或毫秒

`transition-timing-function`：规定速度效果的速度曲线

`transition-delay`：定义过渡效果何时开始

```css
#box {
  height: 100px;
  width: 100px;
  background: green;
  transition: transform 1s ease-in 1s; // 过渡动画
}

#box:hover {
  transform: rotate(180deg) scale(.5, .5);
}
```

### 关键帧动画

语法：`animation: name duration timing-function delay iteration-count direction play-state fill-mode;`

`name`：用来调用@keyframes定义好的动画，与@keyframes定义的动画名称一致

`duration`：指定元素播放动画所持续的时间

`timing-function`：规定速度效果的速度曲线，是针对每一个小动画所在时间范围的变换速率

`delay`：定义在浏览器开始执行动画之前等待的时间，值整个 animation 执行之前等待的时间

`iteration-count`：定义动画的播放次数，可选具体次数或者无限(infinite)

`direction`：设置动画播放方向：normal(按时间轴顺序),reverse(时间轴反方向运行),alternate(轮流，即来回往复进行),alternate-reverse(动画先反运行再正方向运行，并持续交替运行)

`play-state`：控制元素动画的播放状态，通过此来控制动画的暂停和继续，两个值：running(继续)，paused(暂停)

`fill-mode`：控制动画结束后，元素的样式，有四个值：none(回到动画没开始时的状态)，forwards(动画结束后动画停留在结束状态)，backwords(动画回到第一帧的状态)，both(根据animation-direction轮流应用forwards和backwards规则)，注意与iteration-count不要冲突(动画执行无限次)

```css
.box {
  height: 100px;
  width: 100px;
  border: 15px solid black;
  animation: changebox 1s ease-in-out 1s infinite alternate running forwards;
}

.box:hover {
  animation-play-state: paused;
}

@keyframes changebox {
  10% {
    background: red;
  }
  50% {
    width: 80px;
  }
  70% {
    border: 15px solid yellow;
  }
  100% {
    width: 180px;
    height: 180px;
  }
}
```

## BFC 及其应用

块级格式化上下文（BFC） 会生成一个独立的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。

触发条件：

1. float 的值不为 none。

2. 绝对定位或固定定位。

3. overflow 的值不为 visible。

4. display: table/inline-block

BFC 作用：

可以阻止元素被浮动元素覆盖

清除内部浮动

自适应两栏布局

防止垂直 margin 重叠

规则：

属于同一个 BFC 的两个相邻 Box 垂直排列

属于同一个 BFC 的两个相邻 Box 的 `margin` 会发生重叠

BFC 中子元素的 margin box 的左边， 与包含块 (BFC) border box 的左边相接触 (子元素 absolute 除外)

BFC 的区域不会与 `float` 的元素区域重叠

计算 BFC 的高度时，浮动子元素也参与计算

文字层不会被浮动层覆盖，环绕于周围
