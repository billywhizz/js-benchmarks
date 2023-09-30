import { Bench } from './bench.mjs'

const display = false
const dest = new Uint8Array(1024 * 1024)
const encoder = new TextEncoder()
let runs = 0
const results = []
let total = 5
const rates = {}

while (total--) {
  for (let size = 1; size <= 1024 * 1024; size *= 2) {
    if (!rates[size]) {
      const bench = new Bench(false)
      runs = (1024 * 1024) / (1 + Math.log(size))
      bench.start(`${size} warmup`)
      for (let i = 0; i < runs; i++) {
        encoder.encodeInto('h'.repeat(size), dest)
      }
      const { rate } = bench.end(runs)
      rates[size] = rate * 3
    }
    const bench = new Bench(display)
    runs = rates[size]
    bench.start(`${size}`)
    for (let i = 0; i < runs; i++) {
      encoder.encodeInto('h'.repeat(size), dest)
    }
    const result = bench.end(runs)
    rates[size] = result.rate
    results.push(result)
  }
}

console.log(JSON.stringify(results, null, '  '))