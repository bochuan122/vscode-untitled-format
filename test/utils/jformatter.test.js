import { describe, it } from 'vitest'
import { assert, expect, should, config } from 'chai'
should() // change Object.prototype

import JFormatter from '../../src/utils/jformatter'
let formatter = new JFormatter()

let path = require('path')
let fs = require('fs')


// The two tests marked with concurrent will be run in parallel
describe('JFormatter', () => {
  it('串行测试样例', async () => {
    console.log(path.resolve('test/utils/an.example.json'))
    let data = fs.readFileSync("test/utils/an.example.json", "utf-8")
    console.log(formatter.format(data))
  })

  it('串行测试样例', async () => {
    // console.log(formatter.format('abc'))
    // console.log('==========')
    // console.log(formatter.format('{}'))
    // console.log(formatter.format('{}'))
    // console.log('==========')
    // console.log(formatter.format('{"T": 1683255460123}'))
    // console.log(formatter.format('{"T": 1683255460123}'))
    // console.log(formatter.format('{\n    "T": 1683255460123\n}'))
    // console.log('==========')
    // console.log(formatter.format('{"N": 9007199254740992}'))
    // console.log(formatter.format('{"N": 9007199254740993}'))
    // console.log(formatter.format('{"N": 9007199254740994}'))
    // console.log(formatter.format('{"N": 9007199254740995}'))
    // console.log(formatter.format('{"N": 1559805588328325111}'))
    // console.log(formatter.format('{"N": 1559805588328325112}'))
    // console.log('==========')
    // console.log(formatter.format("1683255460123"))
    // console.log(formatter.format('{"T":"[\\\"123\\\"]"}'))
    // console.log('==========')
  })

})
