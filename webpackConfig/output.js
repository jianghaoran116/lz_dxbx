const path = require('path');

const config = require('../config')

const output = (env, argv) => {
    
    let _publicPath = config.devPublicPath.publicPath

    if(env == "development") {
        _publicPath = config.devPublicPath.publicPath
    }
    if(env == "production") {
        _publicPath = config.proPublibPath.publicPath
    }

    return {
        path: path.resolve(__dirname, '../bundle'),
        publicPath: _publicPath,
        filename: 'js/[name]-[hash:8].js',
        chunkFilename: 'js/[name]-[chunkhash:8].js'
    }
}

module.exports = (env, argv) => {
    return output(env, argv)
}