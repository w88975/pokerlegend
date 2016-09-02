var models = require('../../db/models');
var server = require('../server')
var db = require('../../db/db');
var jsonres = require('../../libs/jsonres');
var sms = require('../../libs/smsserv');

server.post('/api/sendverify',function(req,res,next){
    var JSONBody = JSON.parse(req.body)
    var m = JSONBody.m;
    var t = JSONBody.t;
    sms.sendSms(m,t,function(r,code) {
        if (r) {
            db.insert('sms',{mobile: m, type: t, code: code, time: new Date().getTime()},function(err,result) {
                if (!err) {
                    res.send(jsonres(200,'短信发送成功',null))
                }
            })
        } else {
            res.send(jsonres(-1,'短信发送失败',null))
        }
    });
    next()
})

server.post('/api/checkverify',function(req,res,next) {
    var JSONBody = JSON.parse(req.body)
    var m = JSONBody.m; // mobile
    var c = JSONBody.c; // code
})
