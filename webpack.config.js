const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const now = new Date();
const buildDate = now.toString();
const buildNumber = now.getTime().toString(16);

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {loader:'ts-loader',options:{
                    transpileOnly : true 
                }},
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [{loader: 'css-loader', options:{url: false}}],
            }    
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: `app-${buildNumber}.js`,//'bundle-[chunkhash].js',//filename: 'bundle[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    //devtool: 'source-map',
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: false,
            filename: "index.html",
            template: "src/static/index.template.html",
            minify: false,
            templateParameters:{"buildNumber": buildNumber, "buildDate": buildDate}
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