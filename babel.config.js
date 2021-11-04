module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            src: "./src",
            components: "./src/components",
            helpers: "./src/helpers",
            pages: "./src/pages",
            types: "./src/types",
          },
          extensions: [".js", ".ts", ".tsx"],
        },
      ],
    ],
  };
};
