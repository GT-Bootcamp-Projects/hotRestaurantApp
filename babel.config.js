module.exports = function(api) {
  const presets = [['@babel/preset-env', { targets: { node: 'current' } }]];
  const plugins = ['istanbul'];
  api.cache(true);

  return {
    presets,
    plugins
  };
};
