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
        rules: [
            {
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}