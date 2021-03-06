const sveltePreprocess = require('svelte-preprocess');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { resolvePath } = require('./resolvePath');

const sveltePreprocessOptions = {
  babel: {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          modules: false,
          targets: {
            esmodules: true,
          },
        },
      ],
    ],
  },
  postcss: true,
};

module.exports = {
  entry: resolvePath('src/index.js'),
  output: {
    path: resolvePath('dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'svelte-loader',
            options: {
              hotReload: false,
              preprocess: sveltePreprocess(sveltePreprocessOptions),
            },
          },
        ],
      },

      {
        test: /\.html$/,
        use: ['html-loader'],
      },

      {
        test: /\.(css|pcss)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader',
            options: { modules: true, importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: resolvePath('./'),
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8000,
            name: 'images/[hash]-[name].[ext]',
            publicPath: 'assets',
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
  node: {
    fs: 'empty',
  },
  resolve: {
    mainFields: ['svelte', 'browser', 'module', 'main'],
    extensions: ['.mjs', '.js', '.svelte'],
    alias: {
      svelte: resolvePath('./node_modules/svelte'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebPackPlugin({
      template: resolvePath('public/index.html'),
      inlineSource: '.(js|css|pcss)$',
    }),
    new HtmlWebpackInlineSourcePlugin(HtmlWebPackPlugin),

    new OptimizeCssAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
    }),
  ],
};
