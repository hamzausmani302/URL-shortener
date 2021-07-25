const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const mySecret = process.env['DB_URL']

let router = require(__dirname + '/router.js')

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use(router);







mongoose.connect(
mySecret
, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    
    console.log("connected to database");
    
});




// app.get("/" , function(req,res){
//   res.send("<h1>URL - SHORTENER</h1>");
// })




app.listen(3000 , function(){
  console.log("connnected");
})


