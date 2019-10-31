const { override, fixBabelImports,addLessLoader,addWebpackPlugin,addWebpackExternals} = require('customize-cra');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const addMyPlugin = config => {
  config.plugins.push(new ProgressBarPlugin({
    format: 'Build [:bar] :percent (:elapsed seconds)',
    clear: false,
  }))
  return config
}
module.exports = override(
  // 按需打包，根据import（使用babel-plugin-import）
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true, //自动打包相关样式
    }),
    // 自定义样式
    addLessLoader({
     javascriptEnabled: true,
     modifyVars: { '@primary-color': '#00A5E4' },//主题颜色
    }),
    // addWebpackPlugin({
    //   plugins: [
    //     new ProgressBarPlugin({
    //       format: 'Build [:bar] :percent (:elapsed seconds)',
    //       clear: false,
    //     }),
    //   ]
    // }),
    // addWebpackExternals({
    //   output: {
    //     path: __dirname + "/build",
    //     filename: "[name].[chunkhash:8].js"
    //   },
    // }),
    addMyPlugin
  );