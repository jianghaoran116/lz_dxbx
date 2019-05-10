const optimization = (env, argv) => {
    return {
        minimize: env=="development"?false:true,
        splitChunks: {
            chunks: "all",
            minSize: 30000, //模块大于30k会被抽离到公共模块
            minChunks: 1, //模块出现1次就会被抽离到公共模块
            maxAsyncRequests: 5, //异步模块，一次最多只能被加载5个
            maxInitialRequests: 3, //入口模块最多只能加载3个
            name: true,
            cacheGroups: {
                react: {
                    name: 'react',
                    test: /react/,
                    priority: -7,
                    enforce: true
                },
                antd: {
                    name: 'antd',
                    test: /antd/,
                    priority: -8,
                    enforce: true
                },
                vendors: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                }
                // default: {
                //     name: 'default',
                //     test: /[\\/]src[\\/]/,
                //     priority: -20,
                //     reuseExistingChunk: true
                // }
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