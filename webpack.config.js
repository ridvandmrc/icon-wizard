const path = require("path");

module.exports = {
  entry: "./dist/element.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "out"),
  },
};
