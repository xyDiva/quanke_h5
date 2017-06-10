# 券客H5

> A Vue.js project

## Build Setup

``` bash
# install dependencies
cnpm install

# serve with hot reload at localhost:1201
cnpm run dev

# build for production with minification
cnpm run build
```

### 问题集锦 (vue2.0)

1.scss文件中引入image报错
基于根目录(??)

2.跨域问题
配置`dev-server`文件的`proxyTable`

3.存放从store中获取的数据的变量要定义为计算属性

4.微信jssdk分享+微信设置标题  

5.vue `keep-alive` 从详情返回列表时，列表位置也在原位  

6.ios 长按无法弹出菜单识别二维码  
微信内置浏览器识别二维码错位  
文中有说通过增加img的内边距扩大接触面积...暂测无效;;;  
reference:[微信内置浏览器 长按识别二维码 功能的两三个坑与解决方案](http://devework.com/weixin-qrcode-bug2.html)    

7.vue-infinite-scroll无限触发loadmore方法
