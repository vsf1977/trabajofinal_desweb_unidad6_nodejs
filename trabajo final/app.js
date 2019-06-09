
var express = require('express')
var bodyparser = require('body-parser')
var app = express()
var http = require('http')
var path = require('path')
var router = require(path.join(__dirname , '/routing'))
var server = http.createServer(app)

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true})) 
app.use(express.static(path.join(__dirname , '/public')))

app.use('/',router)

app.set('port',process.env.PORT || 3000)

server.listen(app.get('port'), () =>
{
    console.log('server in port 3000 ')
})