const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/client/index.tsx",
  output: {
    filename: "bundle.js"
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
      chunkFilename: "[id].css"
    })
  ]
};

const key = {
  apiKey: "AIzaSyBui6v9Ciy8TCoWzKj0GngEtA-rpZ7ja_4",
  authDomain: "simple-pics.firebaseapp.com",
  databaseURL: "https://simple-pics.firebaseio.com",
  projectId: "simple-pics",
  storageBucket: "simple-pics.appspot.com",
  messagingSenderId: "694322561017"
};
