/**
 * Created by nali on 16/10/31.
 */

const app = require("../server/server");
const model = require("../models/accesstoken");

// 从中间服务器获取accessToken
app.post("/getAccessToken", function (req, res) {
    let accessToken = req.body.accessToken;
    let data = new model({
        accessToken:accessToken
    });
    data.save(function (err) {
        if(err){
            console.log("保存失败");
            return err;
        }
        console.log("save accessToken successfully");
    })
})

