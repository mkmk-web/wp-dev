const path = require("path");
const dist = path.join(__dirname, "./themes/test");
const src = path.join(__dirname, "./src/assets/esNext");

module.exports = {
  entry: {
    "javascripts/index": `${src}/pages/index.js`,
  },
  output: {
    path: `${dist}/`,
    publicPath: `${dist}/`,
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        // pattern .js
        test: /\.js$/,
        // reject
        exclude: /node_modules/,
        use: [
          {
            // Use Babel
            loader: "babel-loader",
            // Babel Option
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      node: "current",
                      ie: 11,
                    },
                    useBuiltIns: "usage",
                  },
                ],
                // ES2018 -> ES5
                // '@babel/preset-env',ES2018 -> ES5
                // '@babel/preset-env',
              ],
            },
          },
        ],
      },
      // {
      //   // enforce: 'pre'を指定することによって
      //   // enforce: 'pre'がついていないローダーより早く処理が実行される
      //   // 今回はbabel-loaderで変換する前にコードを検証したいため、指定が必要
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader'
      // }
    ],
  },
  resolve: {
    modules: [path.resolve("./assets/esNext/"), path.resolve("./node_modules")],
  },
};

// let hiddenPostCode = elem_imagewBtn.querySelector(".js-hiddenPostCode").textContent;
// let response = await fetch(hiddenPostCode, {
//   method: 'GET',
//   mode: 'same-origin',
//   credentials: 'include'
// });

// console.log(response);
// let json = await response.json();
// console.log(json);
