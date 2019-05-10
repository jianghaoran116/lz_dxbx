const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack')
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const imageminMozjpeg = require('imagemin-mozjpeg')

const config = require('../config')

const plugins = (env, argv) => {
    
    let _publicPath = config.devPublicPath.publicPath

    if(env == "development") {
        _publicPath = config.devPublicPath.publicPath
    }
    if(env == "production") {
        _publicPath = config.proPublibPath.publicPath
    }


    let pathsToClean = [
        "bundle", "static"
    ]
    let cleanOptions = {
        root: path.resolve(__dirname, '../'),
    }
    let arrProduct = []

    let htmlOutputPath = ''

    if (env == 'development') {
        htmlOutputPath = path.resolve(__dirname, '../index.html')
        if (argv.devserver) {
            htmlOutputPath = 'index.html'
            arrProduct = [
                new webpack.NamedModulesPlugin(),
                new webpack.HotModuleReplacementPlugin()
            ]
            if (argv.analyzer) {
                arrProduct.push(
                    new BundleAnalyzerPlugin()
                )
            }
        }
    }

    if (env == 'production') {
        htmlOutputPath = path.resolve(__dirname, '../index.html')
        arrProduct = [
            new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
            new ImageminPlugin({
                pngquant: {
                    quality: '80'
                },
                optipng: {
                    optimizationLevel: 6
                }
            }),
            new ImageminPlugin({
                plugins: [
                    imageminMozjpeg({
                        quality: 100,
                        progressive: true
                    })
                ]
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                },
                canPrint: true
            })
        ]
    }


    return [
        new CleanWebpackPlugin(
            pathsToClean, 
            cleanOptions
        ),
        new HtmlWebpackPlugin({
            title: config.pageInfo.title,
            name: 'index',
            template: path.resolve(__dirname, '../src/index.ejs'),
            filename: htmlOutputPath,
            hash: true,
            chunks: [
                'runtime',
                'react',
                'vendor',
                'default',
                'index'
            ],
        }),
        new MiniCssExtractPlugin({
            filename: "style/[name].[chunkhash:8].css",
            chunkFilename: "style/[name].[chunkhash:8].css"
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(path.resolve(__dirname, '../dll/manifest.json'))
        }),
        new HappyPack({
            //用id来标识 happypack处理那里类文件
            id: 'happyBabel',
            //如何处理  用法和loader 的配置一样
            loaders: [{
                loader: 'babel-loader?cacheDirectory=true',
            }],
            //共享进程池
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true,
        }),
        new HappyPack({
            id: 'happyHtmlLoader',
            loaders: [{
                loader: 'html-loader',
            }],
            threadPool: happyThreadPool,
            verbose: true,
        }),
        new HappyPack({
            id: 'happyCssNoSrc',
            loaders: [
                {
                    loader: 'css-loader',
                },
                {
                    loader: 'less-loader',
                    options: {
                        javascriptEnabled: true,
                        modifyVars: {
                            'primary-color': '#531dab'
                        }
                    }
                },
            ],
            threadPool: happyThreadPool,
            verbose: true,
        })
    ].concat(arrProduct)
}
module.exports = (env, argv) => {
    return plugins(env, argv)
}