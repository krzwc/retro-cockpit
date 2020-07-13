const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './index.tsx',
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    devtool: 'eval-source-map',
    resolve: {
        modules: [__dirname, 'src', 'node_modules'],
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
        alias: {
            assets: path.resolve(__dirname, 'src/assets/'),
            components: path.resolve(__dirname, 'src/components/'),
            containers: path.resolve(__dirname, 'src/containers/'),
            hooks: path.resolve(__dirname, 'src/hooks/'),
            style: path.resolve(__dirname, 'src/style/'),
            types: path.resolve(__dirname, 'src/types/'),
            utils: path.resolve(__dirname, 'src/utils/'),
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ]
    },
};
