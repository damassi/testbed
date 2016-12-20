const argv = require('yargs').argv
const path = require('path')
const Server = require('karma').Server

const server = new Server({
  configFile: path.join(__dirname, '/karma.config.js'),
  autoWatch: true,
  singleRun: !argv.watch
})

server.start()
