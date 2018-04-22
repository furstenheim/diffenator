#!/usr/bin/env node

const main = require('../main')
const routes = []
let isProcessingFiles = false
let gitReference = null
process.argv.slice(2).forEach(function (arg) {
  // TODO recursive
  // TODO branch
  if (isProcessingFiles) {
    routes.push(arg)
    return
  }

  switch (arg) {
    case '--recursive':
      throw new Error('Recursive not yet supported')
    case '--':
      isProcessingFiles = true
      break
    default:
      gitReference = arg
  }
})

// TODO several routes
main(routes.length === 0 ? './' : routes[0], gitReference)
  .then(function (files) {
    for (const file of files) {
      console.log(file)
    }
  })