"use strict";

const webpack = require("webpack");
const path = require("path");
const autoprefixer = require("autoprefixer");
const copy = require("copy-webpack-plugin");

const BUILD_DIR = path.resolve(__dirname, "public");
const APP_DIR = path.resolve(__dirname, "source");

const config = {

    mode: "development",

    node: {
        fs: "empty"
    },

    entry: {
        app: [APP_DIR + "/index.jsx"],
        vendor: ["react", "react-dom", "react-router", "react-router-dom"]
    },

    output: {
        path: BUILD_DIR,
        filename: "bundle.js"
    },

    devtool: "inline-source-map",

    context: path.join(__dirname, "source"),

	module: {
        rules : [
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                include : APP_DIR,
                use: ["babel-loader"]
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader?-url", "postcss-loader", "sass-loader"]
            },

            {
                test: /\.css$/,
                use: ["style-loader", "css-loader?-url", "postcss-loader"]
            }

        ]
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: "initial",
                    name: "vendor",
                    test: "vendor",
                    enforce: true
                },
            }
        },
    },

    plugins: [
        new copy([
            {from: APP_DIR + "/html/", to: BUILD_DIR},
            {from: APP_DIR + "/assets/", to: BUILD_DIR + "/assets/"}
        ], {
            copyUnmodified: false,
            debug: "debug"
        })
    ],

    devServer: {
        contentBase: BUILD_DIR,
        historyApiFallback: true,
        host: "localhost",
        port: 8080
    }
};

module.exports = config;
