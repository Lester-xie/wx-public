/**
 * Created by nali on 16/11/1.
 */

const app = require("../server/server");
const config = require('../server/config');
const Model = require("../models/crawlInfo");
const wechat = require('wechat');

const urlName = ["淘宝前端团队", "凹凸实验室", "百度前端研发部", "奇舞团", "京东设计中心", "阮一峰blog"];
const name = '1：<a href="http://taobaofed.org">' + urlName[0] + '</a>\n' +
    '2：<a href="https://aotu.io/index.html">' + urlName[1] + '</a>\n' +
    '3：<a href="http://fex.baidu.com">' + urlName[2] + '</a>\n' +
    '4：<a href="http://www.75team.com">' + urlName[3] + '</a>\n' +
    '5：<a href="https://jdc.jd.com/archives/category/5-frontend">' + urlName[4] + '</a>\n' +
    '6：<a href="http://www.ruanyifeng.com/blog/">' + urlName[5] + '</a>\n';

app.use('/wechat', wechat(config.wechat, function (req, res, next) {

    // 微信输入信息都在req.weixin上
    let message = req.weixin;

    //关注后发消息
    if (message.Event == "subscribe") {
        res.reply({
            content: '哟,骚年郎,眼光不错嘛!\n作为一个车手,飙车还在初级阶段,但该有彩蛋多也不少,你大可放马输入试试。\n' +
            '为了方便接收行业最新最前沿的技术资讯,所以鼓捣了这个消息驿站。\n' +
            '回复博客对应的数字,即可获取该博客的最新文章链接。\n\n' + name + '\n回复0查看博客列表',
            type: 'text'
        });
    }

    let number = parseFloat(message.Content);
    if (!isNaN(number)) {
        var resMsg = "";
        if (("" + number).indexOf('.') > -1) {
            resMsg = "sir?填小数会被扁的你信不信?";
            res.reply({content: resMsg, type: "text"});
        } else if (number > 6 || number < 0) {
            resMsg = "别瞎搞了,塘子里还没这条神龙(1-6),你召唤不出来的";
            res.reply({content: resMsg, type: "text"});
        }else if(number==0){
            res.reply({content: "死鬼,你就不能用心记一下呀?\n"+name, type: "text"});
        } else {
            Model.find({code: number}, function (err, data) {
                if (data.length == 0) {
                    resMsg = "别催别催,在来的路上了";
                } else {
                    resMsg = number+"."+urlName[number-1] + "\n·" + data[0].title + "\n·" + data[0].url;
                }
                console.log(resMsg);
                res.reply({content: resMsg, type: "text"});
            });
        }
    } else {
        res.reply({
            content: '麻麻说,不按规则出牌的人屁股都比较大?别摸了,说的就是你',
            type: "text"
        })
    }

}));

