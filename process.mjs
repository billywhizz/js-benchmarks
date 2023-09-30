import * as bench from './bench.mjs'

const [name] = args
if (!name) throw new Error('please specify a name')
const file_name = `./results.${name}.json`
const text = await readFileAsText(file_name)
const results = JSON.parse(text)
const names = [...new Set(results.map(r => r.name))]

for (const name of names) {
  const rates = results.filter(r => r.name === name).map(r => r.rate).slice(1)
  console.log(Math.max(...rates))
}
