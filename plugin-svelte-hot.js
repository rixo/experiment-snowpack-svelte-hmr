const svelte = require('svelte/compiler')
const svelteRollupPlugin = require('rollup-plugin-svelte')
const fs = require('fs')
const path = require('path')
const { createMakeHot } = require('svelte-hmr')

const makeHot = createMakeHot({ walk: svelte.walk })

module.exports = function plugin(snowpackConfig, pluginOptions = {}) {
  // Support importing Svelte files when you install dependencies.
  snowpackConfig.installOptions.rollup.plugins.push(
    svelteRollupPlugin({ include: '**/node_modules/**' })
  )

  let svelteOptions
  let preprocessOptions
  const userSvelteConfigLoc = path.join(process.cwd(), 'svelte.config.js')
  if (fs.existsSync(userSvelteConfigLoc)) {
    const userSvelteConfig = require(userSvelteConfigLoc)
    const { preprocess, ..._svelteOptions } = userSvelteConfig
    preprocessOptions = preprocess
    svelteOptions = _svelteOptions
  }
  // Generate svelte options from user provided config (if given)
  svelteOptions = {
    dev: process.env.NODE_ENV !== 'production',
    css: false,
    ...svelteOptions,
    ...pluginOptions,
  }

  return {
    name: '@snowpack/plugin-svelte',
    resolve: {
      input: ['.svelte'],
      output: ['.js', '.css'],
    },
    knownEntrypoints: [
      'svelte/internal',
      'svelte/store',
      'svelte/easing',
      'svelte/motion',
      'svelte/transition',
      'svelte/animate',
      'svelte-hmr/runtime/hot-api-esm.js',
      'svelte-hmr/runtime/proxy-adapter-dom.js',
    ],
    async load({ filePath, isHmrEnabled }) {
      let codeToCompile = fs.readFileSync(filePath, 'utf-8')
      // PRE-PROCESS
      if (preprocessOptions) {
        codeToCompile = (
          await svelte.preprocess(codeToCompile, preprocessOptions, {
            filename: filePath,
          })
        ).code
      }
      // COMPILE
      const compileOptions = {
        ...svelteOptions,
        outputFilename: filePath,
        filename: filePath,
      }

      const compiled = svelte.compile(codeToCompile, compileOptions)

      const { js, css } = compiled

      const { sourceMaps } = snowpackConfig.buildOptions
      const output = {
        '.js': {
          code: js.code,
          map: sourceMaps ? js.map : undefined,
        },
      }

      if (isHmrEnabled) {
        const hotOptions = {
          absoluteImports: false,
        }
        output['.js'].code = makeHot({
          id: filePath,
          compiledCode: compiled.js.code,
          hotOptions,
          compiled,
          originalCode: codeToCompile,
          compileOptions,
        })
      }

      if (!svelteOptions.css && css && css.code) {
        output['.css'] = {
          code: css.code,
          map: sourceMaps ? css.map : undefined,
        }
      }
      return output
    },
  }
}
