/**
 * Created by nali on 16/11/2.
 */
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://192.168.130.53:27017/test');

module.exports = mongoose;