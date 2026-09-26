// Runs `next dev` and copies its output to .logs/dev.log, the terminal keeps showing it as before
import { spawn } from 'node:child_process'
import { createWriteStream, mkdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { stripVTControlCharacters } from 'node:util'

mkdirSync('.logs', { recursive: true })
const log = createWriteStream('.logs/dev.log')

const nextCli = createRequire(import.meta.url).resolve('next/dist/bin/next')
const child = spawn(process.execPath, [nextCli, 'dev', ...process.argv.slice(2)], {
  // Output goes through a pipe, keep the colours the terminal would get
  env: { ...process.env, ...(process.stdout.isTTY && { FORCE_COLOR: '1' }) },
  stdio: ['inherit', 'pipe', 'pipe'],
})

for (const [output, terminal] of [
  [child.stdout, process.stdout],
  [child.stderr, process.stderr],
]) {
  output.on('data', (chunk) => {
    terminal.write(chunk)
    log.write(stripVTControlCharacters(chunk.toString()))
  })
}

// Ctrl-C reaches both processes, wait for next dev to shut down
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => child.kill(signal))
}

child.on('error', (error) => {
  console.error(`Could not start next dev: ${error.message}`)
  process.exitCode = 1
})
child.on('exit', (code, signal) => {
  log.end(() => process.exit(code ?? (signal ? 1 : 0)))
})
