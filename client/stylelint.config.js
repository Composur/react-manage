// stylelint.config.js
module.exports = {
  'defaultSeverity': 'warning',
  'extends': ['stylelint-config-standard', 'stylelint-config-recommended-scss'],
  'plugins': ['stylelint-scss'],
  'rules': {
    // 不要使用已被 autoprefixer 支持的浏览器前缀
    'unit-case': null,
    'media-feature-name-no-vendor-prefix': true,
    'at-rule-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,
    'block-no-empty': null,
    'color-no-invalid-hex': true,
    'comment-empty-line-before': ['always', {
      'ignore': ['stylelint-commands', 'after-comment']
    }],
    'declaration-colon-space-after': 'always',
    'indentation': ['tab', {
      'except': ['value']
    }],
    'max-empty-lines': 2,
    'rule-empty-line-before': ['always', {
      'except': ['first-nested'],
      'ignore': ['after-comment']
    }],
    'unit-whitelist': ['em', 'rem', '%', 's']
  }
}
