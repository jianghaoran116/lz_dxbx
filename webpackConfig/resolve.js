const path = require('path')

const resolve = (env, argv) => {
    return {
        extensions: ['.js', '.json', '.less', '.css']
    }
}
module.exports = (env, argv) => {
    return resolve(env, argv)
}