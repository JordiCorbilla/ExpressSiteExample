/*!
 * A simple website in Node.js with Express, Stylus and Pug
 * Copyright(c) 2016 Jordi Corbilla.
 * MIT Licensed
 */

'use strict'

var express = require('express')
var morgan = require('morgan')
var template = require('pug').compileFile(__dirname + '/templates/homepage.pug')
var DEFAULT_PORT = 3000

var app = express()
app.use(morgan('combined'))
app.use(express.static(__dirname + '/static'))

app.get('/', function (req, res, next) {
  try {
    var html = template({ title: 'Home' })
    res.send(html)
  } catch (e) {
    next(e)
  }
})

app.listen(process.env.PORT || DEFAULT_PORT, function () {
  console.log('node.js listening on http://localhost:' + (process.env.PORT || DEFAULT_PORT))
})
