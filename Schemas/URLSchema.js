

const mongoose = require('mongoose');

const urlschema = new mongoose.Schema({
  fullurl : String,
  shorturl : String,
  date : {
      type : Date
  }
})

const URL = mongoose.model('Url' , urlschema );
module.exports = URL;

