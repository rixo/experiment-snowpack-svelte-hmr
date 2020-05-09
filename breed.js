/**
 * This is the script that generates 99 pages * 5 components.
 *
 * Don't run it.
 */

const fs = require('fs')
const path = require('path')

const fsp = fs.promises

const src = path.resolve(__dirname, 'src/pages/01')

const n = 99

const clone = async () => {
  const files = await fsp.readdir(src, 'utf8')

  const templates = await Promise.all(
    files.map(async file => [
      file,
      await fsp.readFile(path.resolve(src, file), 'utf8'),
    ])
  )

  const range = Array.from({ length: n - 1 }).map((_, i) =>
    String(i + 2).padStart(2, 0)
  )

  await Promise.all(
    range.map(async id => {
      const dir = path.resolve(__dirname, `src/pages/${id}`)
      await fsp.mkdir(dir, { recursive: true })
      await Promise.all(
        templates.map(([file, code]) =>
          fsp.writeFile(path.resolve(dir, file), code.replace('01', id), 'utf8')
        )
      )
    })
  )
}

const index = async () => {
  const range = Array.from({ length: n }).map((_, i) =>
    String(i + 1).padStart(2, 0)
  )

  const code = range
    .map(
      id => `export { default as Page_${id} } from './pages/${id}/index.svelte'`
    )
    .join('\n')

  await fsp.writeFile(path.resolve(__dirname, 'src/pages.js'), code, 'utf8')
}

clone()
index()
