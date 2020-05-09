const { babel } = require('@rollup/plugin-babel')

const scripts = {
  'mount:public': 'mount public --to /',
  'mount:web_modules': 'mount web_modules --to /web_modules',
  'mount:systemjs': 'mount node_modules/systemjs/dist --to /systemjs',
  'mount:hmr': 'mount node_modules/rollup-plugin-hot/dist --to /hmr',
  // "plugin:svelte": "@snowpack/plugin-svelte",
  'plugin:svelte': './plugin-svelte-hot.js',
  'plugin:js': '@snowpack/plugin-babel',
  'build:js': 'cat',
}

module.exports = {
  installOptions: {
    clean: true,
  },
  knownEntrypoints: [
    'svelte/internal',
    'rollup-plugin-svelte-hot/hmr/runtime.js',
    'svelte-hmr/runtime/proxy-adapter-dom.js',
  ],
  dev: {
    port: 3000,
    src: 'src',
    out: 'build',
    dist: '/_dist_',
    fallback: 'index.html',
    bundle: process.env.NODE_ENV === 'production',
    hot: true,
  },
  scripts,
  rollup: {
    output: {
      format: 'system',
    },
  },
}
