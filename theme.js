//这个文件只是用来加载各种功能
//theme.js中无法使用import,为了在浏览器运行也没有办法使用require,所以这里只能用其他方式来加载js
//import函数可以在module以外使用,因此可以用在此处用于加载各种脚本
//使用立即执行函数避免污染全局对象
//async是为了能够在函数中使用await
//只有下面这段代码是必须的
//如果窗口在iframe中加载，隐藏工具栏，用于将移动端作为编辑器使用

import("./noobCore/index.js")
