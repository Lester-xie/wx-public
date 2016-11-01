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
    if(message.Content=="二狗"){
        res.reply("敢这么叫哥的,一定是烂葵花,也可能是安大官人");
    }if(message.Content=="你真帅"){
        res.reply("<a href='www.baidu.com'>百度</a>");
    }else{
        res.reply([
            "",
            "搞什么",
            "放屁",
            "呵呵",
            "今天没段子,别催,快来了",
            "从不严格的物理学上来说,楼高的地方拉屎比较费劲,因为引力小",
            "饭要一口一口的吃,路要一步步的走",
            "向你敬酒的人,不一定是尊敬你的人。但请你保健的,一定是关心你的人",
            "说我帅的人会得到惊喜,不信输入'你真帅'试试?"
        ][Math.ceil(Math.random()*8)]);
    }
}));