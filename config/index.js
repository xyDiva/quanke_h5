// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var target = 'http://qktest.notepasses.com';

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/quanke/h5/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 1201,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/user': {
        target: target,
        changeOrigin: true,
        pathRewrite: {
          '^/user': '/user'
        }
      },
      '/notify': {
        target: target,
        changeOrigin: true,
        pathRewrite: {
          '^/notify': '/notify'
        }
      },
      '/goods': {
        target: target,
        changeOrigin: true,
        pathRewrite: {
          '^/goods': '/goods'
        }
      },
      '/banner': {
        target: target,
        changeOrigin: true,
        pathRewrite: {
          '^/banner': '/banner'
        }
      },
      '/wx': {
        target: target,
        changeOrigin: true,
        pathRewrite: {
          '^/wx': '/wx'
        }
      },
      '/address': {
        target: target,
        changeOrigin: true,
        pathRewrite: {
          '^/address': '/address'
        }
      },
      '/rebate': {
        target: target,
        changeOrigin: true,
        pathRewrite: {
          '^/rebate': '/rebate'
        }
      },
      '/withdraw': {
        target: target,
        changeOrigin: true,
        pathRewrite: {
          '^/withdraw': '/withdraw'
        }
      },
      '/channel': {
        target: target,
        changeOrigin: true,
        pathRewrite: {
          '^/channel': '/channel'
        }
      },

      '/upload/base64': {
        target: 'http://120.26.125.112:8888',
        changeOrigin: true,
        pathRewrite: {
          '^/upload/base64': '/upload/base64/quanke-test'
        }
      },
      '/upload': {
        target: 'http://120.26.125.112:8888',
        changeOrigin: true,
        pathRewrite: {
          '^/upload': '/upload/quanke-test'
        }
      },
      '/image': {
        target: 'http://120.26.125.112:8888',
        changeOrigin: true,
        pathRewrite: {
          '^/image': '/image/quanke-test'
        }
      },
      '/cgi-bin':{
        target: 'https://mp.weixin.qq.com',
        changeOrigin: true,
        pathRewrite: {
          '^/cgi-bin': '/cgi-bin'
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
