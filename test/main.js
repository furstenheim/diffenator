const main = require('../main')
const fs = require('fs')
const path = require('path')
const {expect} = require('chai')
describe('Diffenator', function () {
  describe('Change test file', function () {
    let originalFile
    const filePath = path.join(__dirname, 'testChangingTestFile', 'b.js')
    beforeEach(function () {
      originalFile = fs.readFileSync(filePath).toString()
      fs.appendFileSync(filePath, '\n')
    })
    afterEach(function () {
      fs.writeFileSync(filePath, originalFile)
    })
    it('Changing with respect to head', async function () {
      const result = main('test/testChangingTestFile')
      expect(result).a('promise')
      const files = await result
      expect(files).a('array')
      expect(files).deep.equal(['test/testChangingTestFile/b.js'])
    })
  })
  describe('Change dependency file', function () {
    let originalFile
    const filePath = path.join(__dirname, 'testDependencyOutOfFolder', 'a.js')
    beforeEach(function () {
      originalFile = fs.readFileSync(filePath).toString()
      fs.appendFileSync(filePath, '\n')
    })
    afterEach(function () {
      fs.writeFileSync(filePath, originalFile)
    })
    it('Changing with respect to head', async function () {
      const result = main('test/testDependencyOutOfFolder/test')
      expect(result).a('promise')
      const files = await result
      expect(files).a('array')
      expect(files).deep.equal(['test/testDependencyOutOfFolder/test/a.js'])
    })
  })
})