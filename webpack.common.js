require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[hash][ext][query]',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      favicon: path.resolve(__dirname, 'src/public/logo.png'),
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
    }),
    new WebpackPwaManifest({
      filename: 'manifest.json',
      name: 'IndoFood AI',
      short_name: 'IndoFood.ai',
      description: 'AI-based Indonesian Food Classification',
      start_url: '/#/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#f4b400',
      publicPath: '/',
      icons: [
        {
          src: path.resolve(__dirname, 'src/public/logo.png'),
          sizes: [192, 512],
          destination: 'icons',
          purpose: 'any maskable',
        },
      ],
      screenshots: [
        {
          src: 'screenshots/desktop.png',
          sizes: '1280x720',
          type: 'image/png',
          form_factor: 'wide',
        },
        {
          src: 'screenshots/mobile.png',
          sizes: '540x720',
          type: 'image/png',
          form_factor: 'narrow',
        },
      ],
    }),
  ],
};
