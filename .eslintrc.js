module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    // 0 为关闭此规则
    'arrow-parens': 0, // 要求箭头函数的参数使用圆括号
    // allow async-await
    'generator-star-spacing': 0, // 强制 generator 函数中 * 号周围使用一致的空格
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'semi': ['error', 'always'],
    'no-tabs': 0, // disallow all tabs
    'indent': 0, // 强制使用一致的缩进
    'space-before-function-paren': 0, // 强制在 function的左括号之前使用一致的空格
    'no-extend-native': 0, // 禁止扩展原生对象
    'wrap-iife': 0, // 需要把立即执行的函数包裹起来
    'no-sequences': 0 // 禁止使用逗号运算符
  }
};
