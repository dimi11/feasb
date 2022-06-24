const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './example/index.ts',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {loader:'ts-loader',options:{
                    transpileOnly : true 
                }},
                exclude: [/node_modules/],
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: `bundle-[chunkhash].js`,//`app-${buildNumber}.js`,//'bundle-[chunkhash].js',//filename: 'bundle[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    //devtool: 'source-map',
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            filename: "index.html",
            template: "example/static/index.template.html",
            minify: false,
        }),
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             context: 'src/static',
        //             from: 'style.css', 
        //             to: `app-${buildNumber}.css`
        //         }
        //     ]
        // }),
    ]
};