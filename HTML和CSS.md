# HTML和CSS 面试题

## HTML

### HTML全局属性

+ id：元素id
+ class：元素类名
+ style：行内css样式
+ title：元素的额外信息，通常会在鼠标移到元素上时显示文本
+ lang：元素内容的的语言
+ dir：元素内容的文本方向
+ tabindex：当使用 "tab" 键进行导航时元素的顺序
+ accesskey：激活（使元素获得焦点）元素的快捷键

HTML5新增：

+ contenteditable：设置元素内容是否可编辑
+ draggable：设置元素是否可拖拽
+ dropzone：设置当被拖动的数据在拖放到元素上时，是否被复制、移动或链接
+ contextmenu：自定义鼠标右键弹出菜单内容
+ data-*：用于存储页面的自定义数据
+ hidden：表示一个元素是否与文档。样式上会导致元素不显示，但是不能用这个属性实现样式效果
+ spellcheck：是否对元素内容进行拼写检查
+ translate：元素内容是否要翻译

### 对HTML语义化标签的理解

语义化标签是指正确的标签包含了正确的内容，结构良好，便于阅读。比如 header 标签表示网页头部、footer 标签表示网页底部、ul 标签表示一组列表，nav 标签表示导航条等。

### HTML5 新特性

新特性：

+ 语义化的标签：
  + header：文档的头部
  + footer：定义 section 或 document 的页脚
  + section：档中的节
  + article：页面独立的内容区域
  + aside：页面的侧边栏内容
  + nav：页面导航部分
  + details：文档或文档某个部分的细节
  + summary：标签包含 details 元素的标题
  + dialog：定义对话框，比如提示框
+ canvas元素、SVG元素
+ 多媒体元素：video视频、audio音频、source资源、embed嵌入的内容、track外部文本轨道
+ 新增 input 输入类型：color，date、time、email、url、search、tel、range、number
+ 拖放API，要拖放的元素设置draggable=true
  + ondragstart：当拖拽元素开始被拖拽的时候触发的事件，作用在被拖曳元素上
  + ondragenter：当拖曳元素进入目标元素的时候触发的事件，作用在目标元素上
  + ondragover：拖拽元素在目标元素上移动的时候触发的事件，作用在目标元素上
  + ondrop：被拖拽的元素在目标元素上同时鼠标放开触发的事件，作用在目标元素上
  + ondragend：当拖拽完成后触发的事件，作用在被拖曳元素上
+ Web存储：localStorage、sessionStorage
+ 程序缓存：Application Cache，在文档的 html 标签中设置 manifest 属性，指定文件扩展名是：".appcache"的 manifest 文件
+ Webworker：是运行在后台的脚本
+ websocket：在单个 TCP 连接上进行全双工通讯的协议
+ Geolocation：地理定位API

## CSS

### 盒模型

box-sizing有三个值：border-box，padding-box，content-box

+ 标准盒模型是content-box：width 为 content，盒子整个宽度为 width、padding、border 的和。
+ IE盒模型是border-box: width 为 content、padding border 的总和，因此盒子的宽度就为 width。

### 水平垂直居中

+ 盒子宽高已知：绝对定位加负边距

```css
  .parent {
    position: relative;
  }
  .son {
    position: absolute;
    width: 100px;
    height: 100px;
    left: 50%;
    top: 50%;
    margin:-50px 0 0 -50px; // 宽高的一半
  }
```

+ 盒子宽高不定：绝对定位加 `margin: auto;` 或者使用 transform

```css
  .parent {
    position: relative;
  }
  .son {
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .son {
    position: absolute;
    width: 100px;
    height: 100px;
    left: 50%;
    top: 50%;
    transform: (-50%, -50%);
  }
```

+ flex：`justify-content: center;align-items: center;`

```css
  .parent {
    display: flex; // IE9以上
    justify-content: center;
    align-items: center;
  }
```

### 什么是BFC

块级格式化上下文，它会生成一个独立的渲染区域，不影响外面的元素，同时也不受外面元素的影响。

BFC作用：

+ 不和浮动元素重叠
+ 清除元素内部浮动
+ 防止垂直 margin 重叠

触发BFC：

+ float的值不为none
+ 绝对定位或固定定位
+ overflow 的值不为 visible
+ display的值为 table-cell, table-caption, inline-block中的任何一个

### 四种定位的区别

+ static：默认值
+ relative：相对定位，相对于自身原有位置进行偏移，仍处于标准文档流中。
+ absolute；绝对定位，相对于最近的已定位（非static）的祖先元素进行偏移，脱离标准文档流。
+ fixed：固定定位，相对于浏览器视窗定位，不随页面滚动，脱离标准文档流。

### CSS动画

+ transition，过度动画：
+ 位置-平移 left/right/margin/transform: translateX()
+ 位-旋转 transform: rotate()
+ 大小-缩放 transform: scale()
+ 透明度 opacity
+ 倾斜 transform: skewX()

+ @keyframe 关键帧动画

```CSS
@keyframes testAnimation {
  0%   {background: red; left:0; top:0;}
  25%  {background: yellow; left:200px; top:0;}
  50%  {background: blue; left:200px; top:200px;}
  75%  {background: green; left:0; top:200px;}
  100% {background: red; left:0; top:0;}
}
div {
  width: 100px;
  height: 50px;
  position: absolute;
  animation-name: testAnimation;
  animation-duration: 5s;
}
```

+ animation 逐帧动画

```CSS
.fadeIn {
  animation: fadeIn .5s ease 1s both;
}
@keyframes fadeIn{
  from{
    opacity:0;
  }
  to{
    opacity:1
  }
}
```

### CSS3有哪些新特性

+ 新的元素选择器
+ 边框： border-radius，border-image，box-shadow
+ 背景：background-clip、background-origin、background-size
+ 文字特效：text-shadow
+ 线性渐变：gradient
+ 形变、转换：transform，将元素旋转，缩放，移动，倾斜等，
+ 过渡：transition，一种状态到另一种状态的过渡动画，需要触发一个事件才能改变
+ 动画：animation，通过关键帧控制动画的每一步
+ 字体：@Font-face
+ 媒体查询：@media
