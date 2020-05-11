const { babel } = require('@rollup/plugin-babel')

const scripts = {
  'mount:public': 'mount public --to .',
  'mount:web_modules': 'mount web_modules --to web_modules',
  'mount:src': 'mount src --to _dist_',
  'plugin:svelte': './plugin-svelte-hot.js',
  'build:js': 'cat',
}

module.exports = {
  scripts,
  installOptions: {
    clean: true,
  },
  knownEntrypoints: [
    'svelte/internal',
    'rollup-plugin-svelte-hot/hmr/runtime.js',
    'svelte-hmr/runtime/proxy-adapter-dom.js',
  ],
  devOptions: {
    port: 5000,
  },
}
