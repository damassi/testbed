const path = require('path')
const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.config')

const app = express()
const compiler = webpack(config)

app.use(require('webpack-hot-middleware')(compiler))
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}))

app.use(express.static('public'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.dev.html'))
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.listen(3000, (err) => {
  if (err) {
    console.log(err)
    return
  }

  console.log('Listening at http://localhost:3000')
})
