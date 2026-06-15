import { test, expect } from 'vitest'

test('marks the vitest worker process', () => {
  expect(process.env.DD_VITEST_WORKER).to.equal('1')

  if (process.env.EXPECT_DD_NODE_OPTIONS_STRIPPED === '1') {
    const nodeOptions = process.env.NODE_OPTIONS || ''
    expect(nodeOptions.includes('dd-trace/ci/register')).to.equal(false)
    expect(nodeOptions.includes('dd-trace/ci/init')).to.equal(false)
    expect(nodeOptions.includes('--no-warnings')).to.equal(true)
  }

  if (process.env.EXPECT_DD_NODE_OPTIONS_PRESENT === '1') {
    const nodeOptions = process.env.NODE_OPTIONS || ''
    expect(nodeOptions.includes('dd-trace/ci/register')).to.equal(true)
    expect(nodeOptions.includes('dd-trace/ci/init')).to.equal(true)
    expect(nodeOptions.includes('--no-warnings')).to.equal(true)
  }
})
