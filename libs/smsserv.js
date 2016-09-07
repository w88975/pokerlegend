var https = require('https')
var qs = require('querystring')

var sms_host = 'sms.yunpian.com'
var apikey = require('../config.json').smsApiKey
var tpl_id = 1526792
var send_tpl_sms_uri = '/v2/sms/tpl_single_send.json'

var range=function(start,end) {
        var array=[]
        for(var i = start; i < end; ++i) array.push(i)
        return array
}
var getNumber =function(){
    return range(0,5).map(function(x){
        return Math.floor(Math.random()*10)
    }).join('')
}

var post = function(uri,content,host,cb){
    var options = {
        hostname: host,
        port: 443,
        path: uri,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }
    var req = https.request(options, function (res) {
        res.setEncoding('utf8')
        res.on('data', function (chunk) {
            cb(chunk)
        })
    })
    req.write(content)
    req.end()
}

module.exports =  {
    sendSms: function (mobile,type,cb){
        var verifyCode = getNumber()
        var post_data = {
            'apikey': apikey,
            'mobile':mobile,
            'tpl_id': 1526792,
            'tpl_value':qs.stringify({'#code#': verifyCode}),
        }
        var content = qs.stringify(post_data)
        post(send_tpl_sms_uri,content,sms_host,function(body) {
            if (JSON.parse(body).code === 0) {
                cb(true,verifyCode)
            } else {
                cb(false)
            }
        })
    }
}
