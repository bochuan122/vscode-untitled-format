import { describe, it } from 'vitest'
import {assert, expect, should, config} from 'chai'
should() // change Object.prototype

config.includeStack = true
config.showDiff = true
config.truncateThreshold = 40

// The two tests marked with concurrent will be run in parallel
describe('单元测试', () => {

  it('串行测试样例', async () => {
    let value = json.dumps("{'a':'a'}")
    console.log(value)
  })

})