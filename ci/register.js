'use strict'

/* eslint n/no-unsupported-features/node-builtins: ['error', { version: '>=20.6.0', allowExperimental: true }] */
/* eslint-disable eslint-rules/eslint-process-env */

const { register } = require('node:module')
const { pathToFileURL } = require('node:url')
const { isMainThread } = require('node:worker_threads')

const parentURL = pathToFileURL(__filename)
const VITEST_NO_WORKER_INIT_ACTIVE_ENV = 'DD_TEST_OPT_VITEST_NO_WORKER_INIT_ACTIVE'

if (shouldUseVitestNoopLoader()) {
  register('./vitest-noop-loader.mjs', parentURL)
} else {
  register('../loader-hook.mjs', parentURL)
}

function shouldUseVitestNoopLoader () {
  const isVitestWorker = process.env.DD_VITEST_WORKER
  const value = process.env[VITEST_NO_WORKER_INIT_ACTIVE_ENV]
  return isMainThread && isVitestWorker && (value === 'true' || value === '1')
}
