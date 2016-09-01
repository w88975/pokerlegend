/**
* @Author: kamisama
* @Date:   2016-08-31T14:16:08+08:00
* @Email:  kamisama.lwh@qq.com
* @Last modified by:   kamisama
* @Last modified time: 2016-08-31T14:54:47+08:00
*/

var server = require('./server/server');
require('./server/api/user');
require('./server/api/verifycode');
server.listen(9999, function() {
  console.log('%s listening at %s', server.name, server.url);
});
