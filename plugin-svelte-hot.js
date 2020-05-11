// const svelte = require('svelte/compiler')
const fs = require('fs')
const Svelte = require('rollup-plugin-svelte-hot')

const svelte = Svelte({
  dev: process.env.NODE_ENV !== 'production',
  hot: true,
})

const wrapSystemJs = async code => {
  const cwd = process.cwd()
  const result = await babel.transform(code, { cwd })
  return result.code
}

exports.build = async function build(file) {
  let code = await fs.promises.readFile(file, 'utf8')

  ;({ code } = await svelte.transform.call(
    {
      warn: (...args) => console.warn(...args),
    },
    code,
    file
  ))

  return { result: code }
}
