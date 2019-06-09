var express = require('express')
var Router = express.Router()
var path = require('path')

var controller = require(path.join(__dirname , '../controller/controller.js'))

Router.get('/info', controller.list)

module.exports = Router