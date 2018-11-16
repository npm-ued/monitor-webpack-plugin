module.exports = {
  extends: 'react-app',
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true
  },
  rules: {
    'jsx-a11y/href-no-hash': 'off'
  },
  overrides: [
    {
      files: 'test/**/*.js',
      env: {
        jest: true,
      },
    },
  ],
}