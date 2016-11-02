/**
 * Created by nali on 16/11/1.
 */

const app = require("../server/server");
const config = require('../server/config');
const Model = require("../models/crawlInfo");
const wechat = require('wechat');

app.use('/wechat', wechat(config.wechat, function (req, res, next) {

    // 微信输入信息都在req.weixin上
    let message = req.weixin;

    //关注后发消息
    if (message.Event == "subscribe") {
        res.reply({
            content: '哈,终于等到你。为了能及时接收行业最新最前沿技术资讯,帮助个人成长,所以诞生了这个消息驿站。\n' +
            '回复博客对应的数字,即可获取该博客的最新文章链接\n\n' +
            '1：<a href="http://taobaofed.org">淘宝前端团队</a>\n' +
            '2：<a href="https://aotu.io/index.html">凹凸实验室</a>\n' +
            '3：<a href="http://fex.baidu.com">百度前端研发部</a>\n' +
            '4：<a href="http://www.75team.com">奇舞团</a>\n' +
            '5：<a href="https://jdc.jd.com/archives/category/5-frontend">京东设计中心</a>\n' +
            '6：<a href="http://www.ruanyifeng.com/blog/">阮一峰blog</a>',
            type: 'text'
        });
    }

    let number = parseFloat(message.Content);
    if (!isNaN(number)) {
        var resMsg = "";
        if ((""+number).indexOf('.') > -1) {
            resMsg = "sir?你填小数会被扁的信不信?";
            res.reply({content: resMsg, type: "text"});
        } else if (number > 6 || number < 1) {
            resMsg = "别瞎搞了,塘子里还没这条神龙(1-6),你召唤不出来的";
            res.reply({content: resMsg, type: "text"});
        } else {
            Model.find({code: number}, function (err, data) {
                if (data.length == 0) {
                    resMsg = "别催别催,在来的路上了";
                } else {
                    resMsg = data[0].title + "\n" + data[0].url;
                }
                console.log(resMsg);
                res.reply({content: resMsg, type: "text"});
            });
        }
    } else {
        res.reply({
            content: '噢,该死,你不知道我只喜欢数字吗?我的朋友~',
            type: "text"
        })
    }

}));

