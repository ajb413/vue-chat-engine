var path = require('path');

module.exports = {
    entry: ['./src/index.js'],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'build.js',
        library: ['VueChatEngine'],
        libraryTarget: 'umd'
    },
    devtool: "source-map",
    plugins: [],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}