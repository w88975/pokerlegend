var models = require('../../db/models');
var server = require('../server')
var db = require('../../db/db');
var encrypt = require('../../libs/encrypt');
var jsonres = require('../../libs/jsonres');

server.post('/api/login',function(req,res,next){
    var JSONBody = JSON.parse(req.body)
    var u = JSONBody.u;
    var p = JSONBody.p;
    p = encrypt.encryptPwd(p);
    db.count('user',{mobile: u, pwd: p},function(err,c){
        if (c >= 1) {
            res.send(jsonres(200,'登录成功',null))
        }else {
            res.send(jsonres(-1,'登录失败',null))
        }
    });
    next()
})
