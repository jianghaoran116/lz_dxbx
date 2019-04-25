const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        "vendors": [
            'react',
            'react-dom',
            'react-router'
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dll'),
        filename: '[name].dll.js',
        library: '[name]_lib',
    },
    plugins: [
        new webpack.DllPlugin({
            path:  path.join(__dirname, 'dll', 'manifest.json'),
            name: '[name]_lib',
        }),
    ],
};