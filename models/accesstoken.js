/**
 * Created by nali on 16/10/31.
 */

const Schema = require("./config");

//骨架模版
const accessToken = new Schema({
    accessToken: String
});

//模型
module.exports = mongoose.model('access_token', accessToken);