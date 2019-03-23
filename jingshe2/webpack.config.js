let htmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode:"development",
    entry: {
        register: './src/js/register.js',
        index: './src/js/index.js'
    },
    output: {
        filename: "js/[name].js"
    },
    plugins: [
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