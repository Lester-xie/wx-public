/**
 * Created by nali on 16/11/1.
 */

const app = require("../server/server");

// 从中间服务器获取accessToken,用以修改转接服务器地址
app.post("/wechat", function (req, res) {
    console.log(req.body);
    let ToUserName = req.body.ToUserName;
    let Content = req.body.Content;
    console.log("消息发送者:",ToUserName);
    console.log("内容:",Content);
    res.send("发送成功");
});