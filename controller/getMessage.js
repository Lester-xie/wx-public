/**
 * Created by nali on 16/11/1.
 */

const app = require("../server/server");
const config = require('../server/config');
const wechat = require('wechat');

app.use('/wechat', wechat(config.wechat, function (req, res, next) {

    // 微信输入信息都在req.weixin上
    let message = req.weixin;

    //关注后发消息
    if(message.Event=="subscribe"){
        res.reply({
            content: '哈,终于等到你。为了能及时接收行业最新最前沿技术资讯,帮助个人成长,所以诞生了这个消息驿站。\n' +
            '输入博客对应的数字,即可获取该博客的最新文章链接\n' +
            '1：淘宝前端团队\n' +
            '2：凹凸实验室\n' +
            '3：百度前端研发部\n' +
            '4：奇舞团\n' +
            '5：京东设计中心\n' +
            '6：阮一峰Blog',
            type: 'text'
        });
    }

    if(message.Content=="二狗"){
        res.reply("敢这么叫哥的,一定是烂葵花,也可能是安大官人");
    }if(message.Content=="你真帅"){
        res.reply({
            content: '<a href="http://www.baidu.com">百度</a> ',
            type: 'text'
        });
    }
}));