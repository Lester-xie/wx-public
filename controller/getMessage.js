/**
 * Created by nali on 16/11/1.
 */

const app = require("../server/server");

// // 从中间服务器获取accessToken,用以修改转接服务器地址
// app.post("/wechat", function (req, res) {
//     console.log(req.body);
//     let ToUserName = req.body.ToUserName;
//     let Content = req.body.Content;
//     console.log("消息发送者:",ToUserName);
//     console.log("内容:",Content);
//     res.send(
//         {
//
//         }
//     );
// });

var wechat = require('wechat');
var config = {
    token: 'imbulger',
    appid: 'wx871a92db8d222adc',
    encodingAESKey: 'hS8a15rDJfM9Kpr2yl4uJXeLpSvz035fi7P8FRP0m8o'
};

app.use('/wechat', wechat(config, function (req, res, next) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    res.reply("hello,thanks for your focus");
    // if (message.FromUserName === 'diaosi') {
    //     // 回复屌丝(普通回复)
    //     res.reply('hehe');
    // } else if (message.FromUserName === 'text') {
    //     //你也可以这样回复text类型的信息
    //     res.reply({
    //         content: 'text object',
    //         type: 'text'
    //     });
    // } else if (message.FromUserName === 'hehe') {
    //     // 回复一段音乐
    //     res.reply({
    //         type: "music",
    //         content: {
    //             title: "来段音乐吧",
    //             description: "一无所有",
    //             musicUrl: "http://mp3.com/xx.mp3",
    //             hqMusicUrl: "http://mp3.com/xx.mp3",
    //             thumbMediaId: "thisThumbMediaId"
    //         }
    //     });
    // } else {
    //     // 回复高富帅(图文回复)
    //     res.reply([
    //         {
    //             title: '你来我家接我吧',
    //             description: '这是女神与高富帅之间的对话',
    //             picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
    //             url: 'http://nodeapi.cloudfoundry.com/'
    //         }
    //     ]);
    // }
}));