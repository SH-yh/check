const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, '../src/App.js'),
    output: {
        filename: "bound.js",
        path: path.join(__dirname, '../src/public/'),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: "/node_modules/"
            },
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: "style-loader",
                        use: ["css-loader", "sass-loader"]
                    }
                )
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 8192,
                        name: "[name].[ext]"
                    }
                }
            }
        ]
    },
    plugins: [
        new UglifyjsPlugin(),
        new ExtractTextPlugin("style.css"),
        new HtmlWebpackPlugin({template: "./src/views/index.html"})
    ]
};