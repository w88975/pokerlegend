/**
* @Author: kamisama
* @Date:   2016-08-31T14:21:19+08:00
* @Email:  kamisama.lwh@qq.com
* @Last modified by:   kamisama
* @Last modified time: 2016-08-31T14:23:44+08:00
*/
var restify = require('restify')
var server = restify.createServer()
var ecstatic = require('ecstatic')
// var session = require('restify-session')({
//     debug : true,
//     ttl   : 2
// })
var path = require('path')
server.use(restify.acceptParser(server.acceptable))
server.use(restify.queryParser())
server.use(restify.jsonp())
// server.use(session.sessionManager)
server.get(/\/?.*/, restify.serveStatic({
    directory: process.cwd(),
    default: 'index.html',
    match: /^((?!app.js).)*$/   // we should deny access to the application source
 }))
server.use(restify.bodyParser({ mapParams: true }))
module.exports = server
