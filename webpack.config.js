module.exports = {
  entry: __dirname + "/src/client",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: __dirname + "/dist"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel",
        include: __dirname + "/src/client",
        query: {
          presets: ["react", "es2015"]
        }
      }
    ]
  }
};
