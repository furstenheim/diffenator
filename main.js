module.exports = main

const madge = require('madge')
const spawn = require('@expo/spawn-async')

async function main (route) {
  const git = await getGit(route)
  const madge = await getMadge(route)
  console.log(madge)
  console.log(git)
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