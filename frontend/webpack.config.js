const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './index.tsx',
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
    ],
    devtool: 'eval-source-map',
    devServer: {
        historyApiFallback: true,
    },
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
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                /**
                 * https://stackoverflow.com/questions/39805537/how-to-apply-global-styles-with-css-modules-in-a-react-app
                 */
                // process global styles without css modules
                test: /\.s?css$/,
                include: path.resolve(__dirname, './src/styles'),
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                // exclude all global styles for css modules
                test: /\.s?css$/,
                exclude: path.resolve(__dirname, './src/styles'),
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader',
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                        },
                    },
                ],
            },
        ],
    },
};
