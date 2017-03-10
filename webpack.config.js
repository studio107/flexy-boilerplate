var webpack = require('webpack'),
    path = require('path');

module.exports = {
    devtool: 'source-map',
    // context: path.resolve(__dirname, './src'),
    entry: {
        // app: path.resolve(__dirname, './src/app.tsx')
        app: './src/app.tsx'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js'
    },
    target: "web",
    resolve: {
        alias: {
            "react": "preact-compat",
            "react-dom": "preact-compat"
        },
        modules: [
            path.resolve(__dirname, './src'),
            'node_modules'
        ],
        extensions: ['.ts', '.tsx', '.json']
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, exclude: /node_modules/, loaders: ['ts-loader'] }
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