/**
 * Created by nali on 16/10/30.
 */

const app = require("./server/server");
require("./controller/serverCheck");
require("./controller/getAccessToken");
require("./controller/getMessage");

app.get("/",function (req, res) {
    res.send("hello world");
})
app.listen("8888");