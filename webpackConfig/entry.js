const util = require('./util.js')

let entriesObj = util.getView('./src/js/pages/*.js');

const entry = (env, argv) => {
    return entriesObj
}
module.exports = (env, argv) => {
    return entry(env, argv)
}