module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://www.littleemmayang.com',
                changeOrigin: true
            }
        }
    }
}