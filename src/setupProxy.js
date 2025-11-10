// setupProxy.js  파일이름

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (WrapComponent) => {
    WrapComponent.use(
        "/signup_db",
        createProxyMiddleware({
            "target":"https://sj2532nb2.dothome.co.kr",
            changeOrigin: true
        })
    )
    WrapComponent.use(
        "/jsp",
        createProxyMiddleware({
            "target":"https://kimdohuii.com",
            changeOrigin: true
        })
    )
    WrapComponent.use(
        "/kurly",
        createProxyMiddleware({
            "target":"https://kimdohuii.com",
            changeOrigin: true
        })
    )
    WrapComponent.use(
        "/bbs",
        createProxyMiddleware({
            "target":"https://kimdohuii.com",
            changeOrigin: true
        })
    )
    
}