const optimization = (env, argv) => {
    return {
        minimize: env == "development" ? false : true,
        splitChunks: {
            chunks: "all",
            minSize: 30000, //模块大于30k会被抽离到公共模块
            minChunks: 2, //模块出现2次就会被抽离到公共模块
            maxAsyncRequests: 5, //异步模块，一次最多只能被加载5个
            maxInitialRequests: 3, //入口模块最多只能加载3个
            name: true,
            cacheGroups: {
                'react': {
                    name: 'react',
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    priority: -1
                },
                vendors: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                commons: {
                    name: "commons",
                    test: /[\\/]src[\\/]/,
                    priority: -30
                }
            }
        },
        runtimeChunk: {
            name: "runtime"
        }
    }
}
module.exports = (env, argv) => {
    return optimization(env, argv)
}