module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            assets: "./src/assets",
            components: "./src/components",
            screens: "./src/screens",
            styles: "./src/styles",
            services: "./src/services",
          },
        },
      ],
    ],
  };
};
