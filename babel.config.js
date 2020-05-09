/**
 * Just transforms ESM to SystemJS because Svelte HMR works with SystemJS.
 */
module.exports = {
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-transform-modules-systemjs',
  ],
}
