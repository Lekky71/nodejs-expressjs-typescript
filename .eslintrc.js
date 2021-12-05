module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
		'plugin:security/recommended'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    '@typescript-eslint',
    'security'
  ],
  'rules': {
    '@typescript-eslint/no-unused-vars': [
      2,
      { args: 'none' }
    ],
    'indent': [
      'off',
      2,
      { "SwitchCase": 1 }
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
		'quotes': [
			'error',
			'single'
		],
    'semi': [
      'error',
      'always'
    ],
    'eol-last': [
      'error',
      'always'
    ],
    'camelcase': 'error',
    'no-var': 'error'
  }
}
