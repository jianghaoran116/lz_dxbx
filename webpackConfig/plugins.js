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

const util = require('./util.js')

let pages = Object.keys(util.getView('./src/pages/*.html'));

const plugins = (env, argv) => {
    let pathsToClean = [
        "bundle", "publish"
    ]
    let cleanOptions = {
        root: path.resolve(__dirname, '../'),
    }
    let arrProduct = []

    let htmlOutputPath = ''

    if (env == 'development') {
        htmlOutputPath = path.resolve(__dirname, '../publish/')
        if (argv.devserver) {
            htmlOutputPath = path.resolve(__dirname, '../bundle/')
            arrProduct = [
                new webpack.NamedModulesPlugin(),
                new webpack.HotModuleReplacementPlugin()
            ]
            console.log(argv.analyzer)
            if (argv.analyzer) {
                arrProduct.push(
                    new BundleAnalyzerPlugin()
                )
            }
        }
    }

    if (env == 'production') {
        htmlOutputPath = path.resolve(__dirname, '../publish/')
        arrProduct = [
            new ImageminPlugin({
                pngquant: {
                    quality: '80'
                },
                optipng: {
                    optimizationLevel: 6
                }
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

    const _plugins = [
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
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
    ]

    pages.forEach(pathname => {
        let htmlname = pathname.split('src\\')[1]
        let _chunkname = pathname.split('\\')[pathname.split('\\').length - 1]

        if (!htmlname) {
            htmlname = pathname.split('src/')[1]
            _chunkname = pathname.split('/')[pathname.split('/').length - 1]
        }
        
        let conf = {
            filename: `${htmlOutputPath}/${htmlname}.html`,
            template: path.resolve(__dirname, `../${pathname}.html`),
            hash: true,
            chunks: [
                'runtime',
                'react',
                'vendors',
                'commons',
                _chunkname
            ],
            minify: {
                // removeAttributeQuotes:true,
                // removeComments: true,
                // collapseWhitespace: true,
                // removeScriptTypeAttributes:true,
                // removeStyleLinkTypeAttributes:true
            }
        }
        _plugins.unshift(new HtmlWebpackPlugin(conf));
    });

    return _plugins.concat(arrProduct)
}
module.exports = (env, argv) => {
    return plugins(env, argv)
}