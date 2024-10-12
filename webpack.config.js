const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

const port = 3000;

let publicUrl = `ws://localhost:${port}/ws`;

// Adjust the public URL for Gitpod
if (process.env.GITPOD_WORKSPACE_URL) {
  const [schema, host] = process.env.GITPOD_WORKSPACE_URL.split('://');
  publicUrl = `wss://${port}-${host}/ws`;
}

// Adjust the public URL for Codespaces
if (process.env.CODESPACE_NAME) {
  publicUrl = `wss://${process.env.CODESPACE_NAME}-${port}.app.github.dev/ws`;
}

module.exports = {
  entry: './src/js/index.js', // Entry point
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Babel transpiler for JS/JSX files
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/, // CSS loader
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/, // SCSS loader
        use: [
          'style-loader', // Injects styles into DOM
          'css-loader',   // Translates CSS into CommonJS modules
          'sass-loader',  // Compiles SCSS to CSS
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/, // Image loader
        use: {
          loader: 'file-loader',
          options: { name: '[name].[ext]' },
        },
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/, // Font loader
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.scss'], // Added SCSS to extensions
  },
  devtool: 'source-map', // Source maps for easier debugging
  devServer: {
    port,
    hot: true,
    allowedHosts: 'all',
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'dist'), // Ensure static assets are served
    },
    client: {
      webSocketURL: publicUrl, // Adjust WebSocket URL based on the environment
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Hot module replacement for live reload
    new HtmlWebpackPlugin({
      favicon: '4geeks.ico',
      template: 'template.html', // Template HTML file
    }),
    new ErrorOverlayPlugin(), // Better error overlay for development
  ],
};
