/**
 * Created by nali on 16/10/31.
 */

// 服务声明
var compression = require('compression');
const express = require('express');
const app = express();
app.use(compression());

app.use(express.query());

//设置跨域访问
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1');
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

app.get("/test",function (req, res) {
   res.send("hello world");
});

module.exports = app;