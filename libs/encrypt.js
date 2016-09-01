var crypto = require('crypto')
var config = require('../config.json')

module.exports = {
    encryptPwd: function(rawPwd) {
        return this.md5Encrypt(rawPwd, config.pwdSalt)
    },

    md5Encrypt: function(raw,salt) {
        var md5 = crypto.createHash('md5')
        md5.update(raw)
        md5.update(raw)
        return md5.update(salt).digest('hex')
    }
}
