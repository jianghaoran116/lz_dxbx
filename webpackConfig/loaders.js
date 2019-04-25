const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = require('../config')

const loaders = (env, argv) => {
    let _publicPathes = {
        frontes: config.devPublicPath.frontes,
        images: config.devPublicPath.images
    }

    let _outputPathes = {
        frontes: '',
        images: ''
    }

    if (env == "development") {
        _publicPathes.frontes = config.devPublicPath.frontes
        _publicPathes.images = config.devPublicPath.images

        _outputPathes.frontes = '../static/front'
        _outputPathes.images = '../static/'
        if (argv.devserver) {
            _publicPathes.frontes = '/bundle/front/'
            _publicPathes.images = '/bundle/images/'

            _outputPathes.frontes = '../bundle/front'
            _outputPathes.images = '../bundle/images'
        }
    }
    if (env == "production") {
        _publicPathes.frontes = config.proPublibPath.frontes
        _publicPathes.images = config.proPublibPath.images

        _outputPathes.frontes = '../static/front'
        _outputPathes.images = '../static/'
    }

    return [
        {
            test: /\.html$/,
            loader: "happypack/loader?id=happyHtmlLoader",
            exclude: /node_modules/
        },
        {
            test: /(\.jsx|\.js)$/,
            use: [{
                loader: "happypack/loader?id=happyBabel"
            }],
            exclude: /node_modules/
        },
        {
            test: /\.less|\.css$/,
            exclude: [/node_modules/],
            use: [
                MiniCssExtractPlugin.loader,
                // 'happypack/loader?id=happyCss',
                {
                    loader: 'css-loader?modules&localIdentName=[name]-[hash:base64:5]',
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        indent: 'postcss',
                        plugins: (loader) => [
                            require('postcss-sprites')({
                                spritePath: "static/",
                                retina: true
                            }),
                            require('autoprefixer')({
                                browsers: ['last 5 versions']
                            })
                        ]
                    }
                },
                {
                    loader: 'less-loader',
                    options: {
                        sourceMap: true,
                        javascriptEnabled: true,
                        modifyVars: {
                            'primary-color': '#531dab'
                        }
                    }
                },
            ]
        },
        {
            test: /\.less|\.css$/,
            exclude: [/src/],
            use: [
                MiniCssExtractPlugin.loader,
                'happypack/loader?id=happyCssNoSrc',
            ]
        },
        {
            test: /\.(png|jpg|gif|svg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name]-[hash:6].[ext]',
                    // outputPath:  path.resolve(__dirname, '../publish'),
                    outputPath: _outputPathes.images,
                    publicPath: _publicPathes.images,
                    // useRelativePath: true
                }
            }],
            exclude: [
                path.resolve(__dirname, '../node_modules/'),
                path.resolve(__dirname, '../src/assets/front/')
            ]
        },
        {
            test: /\.(eot|svg|ttf|woff|woff2)\w*/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: '[name]-[hash:6].[ext]',
                    outputPath: _outputPathes.frontes,
                    publicPath: _publicPathes.frontes,
                }
            }],
            exclude: [
                path.resolve(__dirname, '../node_modules/'),
                path.resolve(__dirname, '../src/assets/images/')
            ]
        }
    ]
}
module.exports = (env, argv) => {
    return loaders(env, argv)
}