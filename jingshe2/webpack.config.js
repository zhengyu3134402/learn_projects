let htmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode:"development",
    entry: {
        base:'./src/js/base.js',
        register: './src/js/register.js',
        index: './src/js/index.js',
        login: './src/js/login.js',
        personal_page: './src/js/personal_page.js',
        // personal_index: './src/js/personal_index.js',
        // attractions:'./src/js/attractions.js',
        // travels:'./src/js/travels.js',

    },
    output: {
        filename: "js/[name].js"
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/templates/base.html",
            filename: "templates/base.html",
            chunks: ['base']
        }),
        new htmlWebpackPlugin({
            template: "./src/templates/register.html",
            filename: "templates/register.html",
            chunks: ['register']
        }),
        new htmlWebpackPlugin({
            template: "./src/templates/index.html",
            filename: "templates/index.html",
            chunks: ['index']
        }),
        new htmlWebpackPlugin({
            template: "./src/templates/login.html",
            filename: "templates/login.html",
            chunks: ['login']
        }),
        new htmlWebpackPlugin({
            template: "./src/templates/personal_page.html",
            filename: "templates/personal_page.html",
            chunks: ['personal_page']
        }),
        // new htmlWebpackPlugin({
        //     template: "./src/templates/personal_index.html",
        //     filename: "templates/personal_index.html",
        //     chunks: ['personal_index']
        // }),
        // new htmlWebpackPlugin({
        //     template: "./src/templates/attractions.html",
        //     filename: "templates/attractions.html",
        //     chunks: ['attractions']
        // }),
        // new htmlWebpackPlugin({
        //     template: "./src/templates/travels.html",
        //     filename: "templates/travels.html",
        //     chunks: ['personal_page']
        // }),
        new MiniCssExtractPlugin({
            filename:'css/[name].css'
        })
    ],
    module: {
        rules: [
            {
                test:/\.less$/,
                use:[MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            }

        ]
    },
    resolve: {
        alias:{
            'vue': 'vue/dist/vue.js'
        }
    }

};