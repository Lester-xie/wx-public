/**
 * Created by nali on 16/11/1.
 */

const app = require("../server/server");
const wechat = require('wechat');
const config = require('../server/config');

app.use('/wechat', wechat(config.wechat_middle, function (req, res, next) {

    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    console.log(message);
    res.reply([
        {
            title: '你来我家接我吧',
            description: '这是女神与高富帅之间的对话',
            picurl: 'http://picography.co/wp-content/uploads/2016/04/bohernabreena-waterworks.jpg',
            url: 'http://picography.co/'
        }
    ]);
}));