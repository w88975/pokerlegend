var models = require('../../db/models')
var server = require('../server')
var db_wx = require('../../db/db_wx')
var jsonres = require('../../libs/jsonres')
var sms = require('../../libs/smsserv')

server.post('/api/sendverify',function(req,res,next){
    var JSONBody = JSON.parse(req.body)
    var m = JSONBody.m
    var t = JSONBody.t
    db_wx.count('user',{mobile: m}, function(err,c) {
        if (!err && c > 0) {
            return res.send(jsonres(-2,'手机号已经存在!',null))
        } else {
            sms.sendSms(m,t,function(r,code) {
                if (r) {
                    db_wx.update('sms',{mobile: m},{type: t, code: code, time: new Date().getTime()},function(err,result) {
                        if (!err) {
                            return res.send(jsonres(200,'短信发送成功',null))
                        }
                    })
                } else {
                    return res.send(jsonres(-1,'短信发送失败',null))
                }
            })
        }
    })
    next()
})

server.post('/api/checkverify',function(req,res,next) {
    var JSONBody = JSON.parse(req.body)
    var m = JSONBody.m // mobile
    var c = JSONBody.c // code
    var t = JSONBody.t // type
    var tm = new Date().getTime() - 600000
    db_wx.count('sms',{mobile: m, type: t, code: c,time: {'$gte': tm}},function(err,len){
        if (!err && len > 0) {
            return res.send(jsonres(200,'验证通过!',null))
        }
        res.send(jsonres(-1,'短信验证码错误!',null))
    })
    next()
})
