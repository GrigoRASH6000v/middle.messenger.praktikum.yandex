const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    app: './index.ts',
  },
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.png',
      '.woff',
      '.woff2',
      '.svg',
      '.jpg',
      '.ttf',
      '.tpl',
    ],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  devServer: {
    port: 8000,
    hot: true,
  },
  output: {
    filename: './js/[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: 'index.html',
      template: './index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
              ignoreDiagnostics: [
                2571, 2554, 1005, 2691, 2531, 2322, 7006, 2307, 2339, 1128,
                7016, 2345, 1068, 6133, 2779, 7034, 7005, 2740, 7053, 2533,
              ],
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true,
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[hash:7].[ext]',
              publicPath: 'fonts',
            },
          },
        ],
      },
      {
        test: /\.tpl$/i,
        loader: 'html-loader',
      },
    ],
  },
};
