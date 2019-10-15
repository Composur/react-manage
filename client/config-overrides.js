const { override, fixBabelImports,addLessLoader } = require('customize-cra');
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
  );