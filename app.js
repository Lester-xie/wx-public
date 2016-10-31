/**
 * Created by nali on 16/10/30.
 */
var express = require('express');
var crypto = require('crypto');
var config = require('./server/config');
var app = express();
// 微信token认证底层实现
function sha1(str) {
    var md5sum = crypto.createHash("sha1");
    md5sum.update(str);
    str = md5sum.digest("hex");
    return str;
}
app.get("/wechat", function (req, res) {

    var signature = req.query.signature;
    var echostr = req.query.echostr;
    var timestamp = req.query['timestamp'];
    var nonce = req.query.nonce;
    var oriArray = new Array();
    oriArray[0] = nonce;
    oriArray[1] = timestamp;
    oriArray[2] = config.wechat_validate.token; //微信开发者中心页面里填的token
    oriArray.sort();
    var original = oriArray.join('');
    var scyptoString = sha1(original);
    if (signature == scyptoString) {
        res.end(echostr);
    } else {
        res.end("false");
    }
});

app.listen(process.env.PORT || 80);