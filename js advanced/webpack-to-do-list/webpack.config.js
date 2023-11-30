const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: './js/[name].bundle.js',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: './src/html/index.html',
                filename: './html/index-page.html',
                inject: 'head',
                
            },
        
        ),
        new CopyPlugin({
            patterns:[{from: path.resolve(__dirname, 'src/img'), to: path.resolve(__dirname, 'dist/img')}]
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
               
            },
            {
                test: /\.(ttf|woff|woff2)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]',
                }

            }
            
        ]
    }
};