module.exports = main

const madge = require('madge')
const spawn = require('@expo/spawn-async')
const mocha = require('mocha')
const minimatch = require('minimatch')

async function main (route) {
  // TODO accept multiple routes
  const git = await getGit(route)
  const madge = await getMadge(route)
  const mocha = getMocha(route)


  return mocha.filter(f => isModified(f, madge, git, {}))
}

function isModified (file, graph, git, visitedNodes) {
  if (visitedNodes[file]) {
    return false
  }
  visitedNodes[file] = true

  if (git[file]) {
    return true
  }
  if (!graph[file]) {
    throw new Error('File was not found by madge')
  }
  for (const dependency of graph[file]) {
    if (isModified(dependency, graph, git, visitedNodes)) {
      return true
    }
  }
  return false
}

async function getMadge (route) {
  console.log(route)
  const res = await madge(route, {baseDir: __dirname})
  return res.obj()
}

async function getGit (route) {
  const git = await spawn('git', ['diff', '--name-only'])
  console.log(__dirname, process.cwd())
  const lines = git.stdout.split('\n')
  const linesSet = {}
  for (let i = 0; i < lines.length - 1; i++) {
    linesSet[lines[i]] = true
  }
  return linesSet
}

function getMocha (route) {
  const files = []
  const extensions = ['js'] // TODO accept more extensions through compiler
  try {
    return mocha.utils.lookupFiles(route, extensions, false) // TODO accept recursive
  } catch (err) {
    console.error('Error looking up files')
  }
}
