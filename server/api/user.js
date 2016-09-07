var models = require('../../db/models')
var server = require('../server')
var db_wx = require('../../db/db_wx')
var encrypt = require('../../libs/encrypt')
var jsonres = require('../../libs/jsonres')

server.post('/api/login',function(req,res,next){
    var JSONBody = JSON.parse(req.body)
    var u = JSONBody.u
    var p = JSONBody.p
    p = encrypt.encryptPwd(p)
    db_wx.count('user',{mobile: u, pwd: p},function(err,c){
        if (c >= 1) {
            res.send(jsonres(200,'登录成功',null))
            // req.session.user='kamisama'
        }else {
            res.send(jsonres(-1,'登录失败',null))
        }
    })
    next()
})

server.post('/api/regist',function(req,res,next){
    var JSONBody = JSON.parse(req.body)
    var m = JSONBody.m
    var p = JSONBody.p
    var n = JSONBody.n
    var c = JSONBody.c
    var t = JSONBody.t
    p = encrypt.encryptPwd(p)
    var tm = new Date().getTime() - 600000
    db_wx.count('sms',{mobile: m, type: t, code: c,time: {'$gte': tm}},function(err,len){
        if (!err && len > 0) {
            db_wx.update('user',{mobile: m},{name: n, pwd: p},function(err,c){
                if (!err) {
                    return res.send(jsonres(200,'注册成功',null))
                }else {
                    return res.send(jsonres(-1,'注册失败!',null))
                }
            })
        } else {
            res.send(jsonres(-1,'注册失败,短信验证码错误!',null))
        }
    })
    next()
})
