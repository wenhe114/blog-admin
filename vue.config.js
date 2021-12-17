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
                target: 'http://101.42.234.72:7001',
                ws: true, // 是否跨域
                changeOrigin: true,
                // 重写地址
                pathRewrite: {
                    '^/blogApi': ''
                }
            },
            '/public/upload': {
                target: 'http://101.42.234.72:7001',
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