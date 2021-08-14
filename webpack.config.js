const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: path.resolve(__dirname, "src/static"), to: path.resolve(__dirname, "public/assets")},
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        // compress: true,
        // open: true,
        port: 3000,
    },
};
