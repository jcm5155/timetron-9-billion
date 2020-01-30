export const entry = "./tt9b/frontend/src/index.js";
export const module = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: "style-loader"
        },
        {
          loader: "css-loader",
          options: {
            sourceMap: true
          }
        }
      ]
    }
  ]
};
