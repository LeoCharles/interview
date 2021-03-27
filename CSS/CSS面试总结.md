# CSS 面试总结

## CSS 盒模型

box-sizing 有三个值：border-box，padding-box，content-box

+ 标准盒模型（content-box）：width 为 content，盒子整个宽度为 width、padding、border 的和。

+ IE 盒模型（border-box）: width 为 content、padding border 的总和，因此盒子的宽度就为 width。

## flex 布局

## 两栏/三栏布局

## 水平垂直居中

绝对定位加 `margin: auto;` 或者使用 `translate`。

```css
/* margin: auto; */
.parent {
  position: relative;
}
.son {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
/* translate */
.son {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

使用 flex 居中。

```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

## position 四种定位的区别

默认 static：按照正常文档流进行排列。

相对定位 relative ：相对于自身原有位置进行偏移，仍处于标准文档流中。

绝对定位 absolute：相对于最近的已定位（非 `static`）的祖先元素进行偏移，脱离标准文档流。

固定定位 fixed：相对于浏览器视窗定位，不随页面滚动，脱离标准文档流。

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

## CSS 动画

## 过渡动画

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

name：用来调用@keyframes定义好的动画，与@keyframes定义的动画名称一致

duration：指定元素播放动画所持续的时间

timing-function：规定速度效果的速度曲线，是针对每一个小动画所在时间范围的变换速率

delay：定义在浏览器开始执行动画之前等待的时间，值整个 animation 执行之前等待的时间

iteration-count：定义动画的播放次数，可选具体次数或者无限(infinite)

direction：设置动画播放方向：normal(按时间轴顺序),reverse(时间轴反方向运行),alternate(轮流，即来回往复进行),alternate-reverse(动画先反运行再正方向运行，并持续交替运行)

play-state：控制元素动画的播放状态，通过此来控制动画的暂停和继续，两个值：running(继续)，paused(暂停)

fill-mode：控制动画结束后，元素的样式，有四个值：none(回到动画没开始时的状态)，forwards(动画结束后动画停留在结束状态)，backwords(动画回到第一帧的状态)，both(根据animation-direction轮流应用forwards和backwards规则)，注意与iteration-count不要冲突(动画执行无限次)

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
