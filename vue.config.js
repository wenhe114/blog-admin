const isDev=process.env.NODE_ENV==='development'?true:false
const os = require('os');
//获取本机ip
function getIpAddress() {
  /**os.networkInterfaces() 返回一个对象，该对象包含已分配了网络地址的网络接口 */
var interfaces = os.networkInterfaces();
 for (var devName in interfaces) {
   var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
           var alias = iface[i];
             if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
               return alias.address;
             }
       }
  }
}
module.exports = {
    publicPath: './', // 根路径
    outputDir: 'dist', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录(js,css,img,fonts)
    lintOnSave: false, // 是否开启eslint保存检测,有效值（true||false||error)
    devServer: {
        port: 1111,
        proxy: {
            // 配置跨域
            '/blogApi': {
                target: isDev?'http://'+getIpAddress()+':7001':'http://101.42.234.72:7001',
                ws: true, // 是否跨域
                changeOrigin: true,
                // 重写地址
                pathRewrite: {
                    '^/blogApi': ''
                }
            },
            '/public/upload': {
                target: isDev?'http://'+getIpAddress()+':7001':'http://101.42.234.72:7001',
            },
            // '/files': {
            //     target: 'http://127.0.0.1:1080',
            //     ws: true, // 是否跨域
            //     changeOrigin: true,
            // 重写地址
            // pathRewrite: {
            //     '^/testfile': ''
            // }
            // }
        }
    }
}