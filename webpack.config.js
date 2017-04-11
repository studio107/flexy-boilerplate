var webpack = require('webpack'),
    path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js'
    },
    target: "web",
    resolve: {
        modules: [
            path.resolve(__dirname, './src'),
            'node_modules'
        ],
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx$|\.js$/,
                loader: 'eslint-loader',
                include: __dirname + '/src'
            }
        ],
        loaders: [
            {
                test: /\.jsx$|\.js$/,
                exclude: /node_modules/,
                loaders: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                sequences: true,
                properties: true,
                drop_debugger: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true,
                drop_console: true,
                warnings: process.env.NODE_ENV != 'production'
            }
        }),
        new webpack.ProvidePlugin({
            'Promise': 'bluebird'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
            }
        })
    ]
};
