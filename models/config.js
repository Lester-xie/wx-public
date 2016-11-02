/**
 * Created by nali on 16/11/2.
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://120.77.55.92:27017/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('mongoose opened!');
});
module.exports = mongoose;