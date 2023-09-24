const path = require("path");

module.exports = {
  entry: "./dist/src/element.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "webpack"),
  },
};
