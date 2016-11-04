/**
 * Created by nali on 16/11/3.
 */
const API = require('wechat-api');
const config = require('../server/config.json');

const menu_config = config.wx.wx_menu;
const app_id      = process.env.WXAPPID;
const app_secret  = process.env.WXAPPSECRET;

//想玩下wechat-api的,可惜了,没认证订阅号的没资格玩
var api = new API(app_id, app_secret);
function app(){
    api.createMenu(menu_config, function(err, result){
        console.log(result);
    });
}

module.exports = app;