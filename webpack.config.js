const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.ts',
  },
  resolve: {
    extensions: ['.js', '.json', '.png', '.svg', '.jpg', '.tpl'], //Здесь мы можемь прописать форматы
    alias: {
      '@': path.resolve(__dirname, './src'), //Здесь мы подключаем элиасы, для более удобного подключения файлов
    },
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'test',
    }),
    // new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: 'css/style.css',
    // }),
    //new CopyWebpackPlugin()
  ],
  devServer: {
    port: 8080, //Прописываем порт, с которого будет запускаться devserver
    hot: true,
  },
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
    ],
  },
};
