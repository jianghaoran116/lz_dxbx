const path = require('path')

const entry = require('./webpackConfig/entry')
const output = require('./webpackConfig/output')
const plugins = require('./webpackConfig/plugins')
const loaders = require('./webpackConfig/loaders')
const optimization = require('./webpackConfig/optimization')
const resolve = require('./webpackConfig/resolve')

const config = (env, argv) => {

    const configObj = {
        mode: env,
        entry: entry(env, argv),
        output: output(env, argv),
        module: {
            rules: loaders(env, argv)
        },
        optimization: optimization(env, argv),
        plugins: plugins(env, argv),
        resolve: resolve(env, argv),
    }

    if(env == 'development' && argv.devserver) {        
        configObj.devServer = {
            port: 9000,
            contentBase: [
                path.join(__dirname, './bundle'),
            ],
            hot: true,
            proxy: {
                '/': {
                  target: 'http://localhost:9093',
                  pathRewrite: {'^/bundle/api' : '/'}
                }
            }
        }
    }

    return configObj
}

module.exports = (env, argv) => {
    return config(env, argv);
}; 