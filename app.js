/**
 * Created by nali on 16/10/30.
 */

const app = require("./server/server");
// require("./controller/serverCheck");
require("./controller/getMessage");
require("./controller/crawler");
app.listen("80");