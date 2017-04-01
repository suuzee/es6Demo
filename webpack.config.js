const path = require('path');

module.exports = {
    entry: {
        index: ['./src/scripts/index.js', './src/styles/index.scss']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js'
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(css|scss)$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
};
