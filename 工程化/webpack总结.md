# webpack 面试总结

## webpack 简介

webpack 是一种前端构建工具，一个静态模块打包器(module bundler)。

构建流程：前端的所有资源文件(js/json/css/img/less/...)都会作为模块处理，根据模块的依赖关系进行静态分析，打包生成对应的静态资源(bundle)。

webpack 五个核心概念：

`Entry`：入口，指示 webpack 以哪个文件为入口起点开始打包，分析构建内部依赖图。

`Output`：输出，指示 webpack 打包后的资源 bundles 输出到哪里去，以及如何命名。

`Loader`：让 webpack 能够去处理那些非 JS/JSON 文件。

`Plugins`：插件，可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩， 一直到重新定义环境中的变量等。

`Mode`：模式，指示 webpack 使用相应模式的配置。

```js
const { resolve } = require('path');
// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

// webpack 配置
module.exports = {
  // 入口文件
  entry: './src/main.js',

  // 输出配置
  output: {
    // 输出文件路径 
    path: resolve(__dirname, 'dist'), // resolve 用来拼接绝对路径，_dirname 代表当前文件目录的绝对路径
    // 输出文件名
    filename: 'index.js'
  },

  // loader 的配置
  module: {
    // 不同的文件使用不同的 loader
    rules: [
      {
        // 处理 css 文件
        test: /\.css$/, 
        // 使用的 loader 顺序:从后到前
        use: [
          // 创建 style 标签，添加将 js 中的样式字符串，插入到 head 标签中生效
          'style-loader',
          // 将 css 文件变成样式字符串加载到 js 中
          'css-loader'
        ]
      },
      {
        // 处理 less 文件
        test: /\.less$/, 
        use: [
          'style-loader',
          'css-loader',
          // 需要下载 less 和 less-loader 两个包
          'less-loader'
        ]
      },
      {
        // 处理图片等资源文件
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        // 需要下载 url-loader 和 file-loader 两个包
        loader: 'url-loader',
        options: {
          // 图片小于 10kb，会被处理为 base64 格式，减少请求次数
          limit: 10 * 1024,
          // 图片重命名
          name: '[hash:10].[ext]'
        }
      },
      {
        // 处理 html 中图片
        test: /\.html$/,
        // 引入 html 中的 img，从而能被 url-loader 处理
        loader: 'html-loader',
        options: {
          // 使用 commonjs 解析
          esModule: false,
        }
      },
      {
        // 处理媒体文件资源
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        name: '[hash:10].[ext]'
      },
      {
        // 处理字体图标资源
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        name: '[hash:10].[ext]'
      }
    ]
  },

  // 插件的配置，使用插件需要先引入
  plugins: [
    // html-webpack-plugin 插件默认会创建一个空的 HTML，自动引入打包输出的所有资源
    new HtmlWebpackPlugin({
      // 指定 HTML 模板，并自动引入打包输出的所有资源
      template: './src/index.html',
      filename: 'index.html',
    })
  ],

  // 模式：'development' 和 'production'
  mode: 'development',

  // 开发服务器，用于自动编译，自动刷新浏览器，需要下载 webpack-dev-server
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    // 启动 gzip 压缩
    compress: true,
    // 端口号
    port: 3000
  }
}
```

## Webpack构建流程

初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数。

开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译。

确定入口：根据配置中的 entry 找出所有的入口文件。

编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行转化，再找出该模块依赖的模块，直到所有入口依赖的文件都经过了本步骤的处理。

完成模块编译：在经过 Loader 转化完所有模块后，得到了每个模块被转化后的最终内容以及它们之间的依赖关系。

输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表。

输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

## Loader 和 Plugin 的区别

Webpack 只认识 JS，所以需要 Loader 对其他类型的资源进行转译的预处理工作。Loader 本质就是一个函数，在该函数中对接收到的内容进行转换，返回转换后的结果。

Loader 在 module.rules 中配置，作为模块的解析规则，类型为数组。每一项都是一个 Object，内部包含了 test(类型文件)、loader、options (参数)等属性。

Plugin 是插件，可以扩展 Webpack 的功能，在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

Plugin 在 plugins 中单独配置，类型为数组，每一项是一个 Plugin 的实例，参数都通过构造函数传入。

可以提高效率的插件：

webpack-dashboard：可以更友好的展示相关打包信息。

webpack-merge：提取公共配置，减少重复配置代码。

speed-measure-webpack-plugin：简称 SMP，分析出 Webpack 打包过程中 Loader 和 Plugin 的耗时，有助于找到构建过程中的性能瓶颈。

size-plugin：监控资源体积变化，尽早发现问题。

HotModuleReplacementPlugin：模块热替换。

## Webpack 热更新原理

Webpack 的热更新（HMR）可以做到不用刷新浏览器而将新变更的模块替换掉旧的模块。

HMR 的核心就是客户端从服务端拉去更新后的文件，准确的说是 chunk diff (chunk 需要更新的部分)

实际上 WDS （webpack-dev-server） 与浏览器之间维护了一个 Websocket，当本地资源发生变化时，WDS 会向浏览器推送更新，并带上构建时的 hash，让客户端与上一次资源进行对比。

客户端对比出差异后会向 WDS 发起 Ajax 请求来获取更改内容(文件列表、hash)，这样客户端就可以再借助这些信息继续向 WDS 发起 jsonp 请求获取该chunk的增量更新。

后续的部分由 HotModulePlugin 来完成，提供了相关 API 以供开发者针对自身场景进行处理，像react-hot-loader 和 vue-loader 都是借助这些 API 实现 HMR。

## 如何优化 Webpack 的构建速度

+ 使用高版本的 Webpack 和 Node.js

+ 多进程/多实例构建：HappyPack(不维护了)、thread-loader

+ 压缩代码：
  + 多进程并行压缩
    + webpack-paralle-uglify-plugin
    + uglifyjs-webpack-plugin 开启 parallel 参数 (不支持ES6)
    + terser-webpack-plugin 开启 parallel 参数
  + 通过 mini-css-extract-plugin 提取 Chunk 中的 CSS 代码到单独文件，通过 css-loader 的 minimize 选项开启 cssnano 压缩 CSS。

+ 图片压缩：
  + 使用基于 Node 库的 imagemin (很多定制选项、可以处理多种图片格式)
  + 配置image-webpack-loader

+ 缩小打包作用域：
  + exclude/include (确定 loader 规则范围)
  + resolve.modules 指明第三方模块的绝对路径 (减少不必要的查找)
  + resolve.mainFields 只采用 main 字段作为入口文件描述字段 (减少搜索步骤，需要考虑到所有运行时依赖的第三方模块的入口文件描述字段)
  + resolve.extensions 尽可能减少后缀尝试的可能性
  + noParse 对完全不需要解析的库进行忽略 (不去解析但仍会打包到 bundle 中，注意被忽略掉的文件里不应该包含 import、require、define 等模块化语句)
  + IgnorePlugin (完全排除模块)
  + 合理使用alias

+ 提取页面公共资源：
  + 使用 html-webpack-externals-plugin，将基础包通过 CDN 引入，不打入 bundle 中
  + 使用 SplitChunksPlugin 进行(公共脚本、基础包、页面公共文件)分离(Webpack4内置) ，替代了 CommonsChunkPlugin 插件

+ DLL：
  + 使用 DllPlugin 进行分包，使用 DllReferencePlugin(索引链接) 对 manifest.json 引用，让一些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间。
  + HashedModuleIdsPlugin 可以解决模块数字id问题

+ 充分利用缓存提升二次构建速度：
  + babel-loader 开启缓存
  + terser-webpack-plugin 开启缓存
  + 使用 cache-loader 或者 hard-source-webpack-plugin

+ Tree shaking
  + 打包过程中检测工程中没有引用过的模块并进行标记，在资源压缩时将它们从最终的bundle中去掉(只能对ES6 Modlue生效) 开发中尽可能使用ES6 Module的模块，提高tree shaking效率
  + 禁用 babel-loader 的模块依赖解析，否则 Webpack 接收到的就都是转换过的 CommonJS 形式的模块，无法进行 tree-shaking
  + 使用 PurifyCSS(不在维护) 或者 uncss 去除无用 CSS 代码
  + purgecss-webpack-plugin 和 mini-css-extract-plugin配合使用(建议)

+ Scope hoisting
  + 构建后的代码会存在大量闭包，造成体积增大，运行代码时创建的函数作用域变多，内存开销变大。Scope hoisting 将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突
  + 必须是ES6的语法，因为有很多第三方库仍采用 CommonJS 语法，为了充分发挥 Scope hoisting 的作用，需要配置 mainFields 对第三方模块优先采用 jsnext:main 中指向的ES6模块化语法

+ 动态Polyfill
  + 建议采用 polyfill-service 只给用户返回需要的polyfill，社区维护。 (部分国内奇葩浏览器UA可能无法识别，但可以降级返回所需全部polyfill)

## Babel 原理

+ 解析：将代码转换成 AST
  + 词法分析：将代码(字符串)分割为token流，即语法单元成的数组
  + 语法分析：分析token流(上面生成的数组)并生成 AST

+ 转换：访问 AST 的节点进行变换操作生产新的 AST

+ 生成：以新的 AST 为基础生成代码
