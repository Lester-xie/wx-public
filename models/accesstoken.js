/**
 * Created by nali on 16/10/31.
 */
/**
 * Created by nali on 16/10/29.
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.1.102:27017/test');

const Schema = mongoose.Schema;
//骨架模版
const accessToken = new Schema({
    accessToken: String
});

//模型
module.exports = mongoose.model('access_token', accessToken);