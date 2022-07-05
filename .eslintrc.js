module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    globals: {
        window: true,
        module: true,
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {},
}
