const components = require('prismjs/components');
const allLanguages = Object.keys(components.languages).filter((item) => item !== 'meta');

module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  "plugins": [
    ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css" }], // `style: true` 会加载 less 文件
    [
      'prismjs',
      {
        languages: allLanguages,
      },
    ],
  ]
};
