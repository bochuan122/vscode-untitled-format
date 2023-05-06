import { describe, it } from 'vitest'

import XFormatter from '../../src/utils/xformatter'
let formatter = new XFormatter()

// The two tests marked with concurrent will be run in parallel
describe('XFormatter', () => {
  it('串行测试样例', async () => {
    console.log(formatter.format('abc'))
    console.log('==========')
    console.log(formatter.format('<A></A>'))
    console.log('==========')
    console.log(formatter.format('<A>1559805588328325111</A>'))
    console.log(formatter.format('<A>1559805588328325111</A>'))
    console.log('==========')
  })
})