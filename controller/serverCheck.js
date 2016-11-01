/**
 * Created by nali on 16/10/31.
 */
const config = require('../server/config');
const app = require("../server/server");
const crypto = require('crypto');

// 微信token认证底层实现
function sha1(str) {
    let md5sum = crypto.createHash("sha1");
    md5sum.update(str);
    str = md5sum.digest("hex");
    return str;
}

module.exports =  app.get("/wechat", function (req, res) {

    let signature = req.query.signature;
    let echostr = req.query.echostr;
    let timestamp = req.query['timestamp'];
    let nonce = req.query.nonce;
    let oriArray = new Array();
    oriArray[0] = nonce;
    oriArray[1] = timestamp;
    oriArray[2] = config.wechat.token; //微信开发者中心页面里填的token
    oriArray.sort();
    let original = oriArray.join('');
    let scyptoString = sha1(original);
    if (signature == scyptoString) {
        res.end(echostr);
    } else {
        res.end("false");
    }
});