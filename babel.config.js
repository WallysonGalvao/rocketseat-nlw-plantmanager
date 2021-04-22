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
            libs: "./src/libs",
            screens: "./src/screens",
            services: "./src/services",
            styles: "./src/styles",
          },
        },
      ],
    ],
  };
};
