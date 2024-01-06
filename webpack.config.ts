import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import 'webpack-dev-server'

const config: webpack.Configuration = {
    entry: path.join(__dirname, 'index.tsx'),
    output: {
        path: path.join(__dirname, '../../client_packages/browser'),
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true
    },
    devtool: 'inline-source-map',
    devServer: {
        port: 3000,
        hot: true,
        historyApiFallback: true
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.sass', '.mp3'],
        alias: {
            '@': path.join(__dirname, 'src'),
            Styles: path.join(__dirname, 'src', 'styles'),
            Fonts: path.join(__dirname, 'src', 'fonts'),
            Interfaces: path.resolve(__dirname, 'src', 'interfaces')
        }
    },
    performance: {
        maxEntrypointSize: 5120000,
        maxAssetSize: 5120000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html')
        })
    ],
    module: {
        rules: [
            {
                test: /.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-typescript'
                        ]
                    }
                }
            },
            {
                test: /.(s[ac]|c)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /.(png|jpe?g|gif|svg|webp|ico|woff2?|eot|ttf|otf|mp3)$/,
                type: 'asset/resource'
            }
        ]
    }
}

export default config
