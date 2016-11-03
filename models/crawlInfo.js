/**
 * Created by nali on 16/11/2.
 */

const mongoose = require("./dbconfig");

const Schema = mongoose.Schema;

//骨架模版
const crawlInfo = new Schema({
    code: Number,
    title: String,
    url: String
});

//模型
module.exports = mongoose.model('crawl_info', crawlInfo);