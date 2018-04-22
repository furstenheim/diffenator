const main = require('../main')
const fs = require('fs')
const path = require('path')
const {expect} = require('chai')
describe('Diffenator', function () {
  describe('Diff with respect to head', function () {
    let originalFile
    const filePath = path.join(__dirname, 'testHead', 'b.js')
    beforeEach(function () {
      originalFile = fs.readFileSync(filePath).toString()
      fs.appendFileSync(filePath, '\n')
    })
    afterEach(function () {
      fs.writeFileSync(filePath, originalFile)
    })
    it('Changing with respect to head', async function () {
      const result = main('test/testHead')
      expect(result).a('promise')
      const files = await result
      expect(files).a('array')
      expect(files).be([filePath])

    })
  })
})