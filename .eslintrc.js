module.exports = {
    env: {
        node: true,
        es6: true,
        jest: true
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        }
    },
    extends: [
        'omaha-prime-grade',
        'plugin:react/recommended'
    ],
    parser: 'babel-eslint',
    rules: {
        'compat/compat': 'off'
    },
    settings: {
        react: {
            version: '16.8'
        }
    }
};