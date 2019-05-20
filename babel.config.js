module.exports = function(api) {
  const presets = ['@babel/preset-env'];
  const plugins = ['istanbul'];
  api.cache(true);

  return {
    presets,
    plugins
  };
};
