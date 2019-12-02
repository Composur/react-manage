const { override, fixBabelImports,addLessLoader,addWebpackAlias} = require('customize-cra');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const path = require("path");
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
    addWebpackAlias({
      ["components"]: path.resolve(__dirname, "src/components"),
      ["api"]: path.resolve(__dirname, "src/api"),
      ["config"]: path.resolve(__dirname, "src/config"),
    }),
    addMyPlugin
  );