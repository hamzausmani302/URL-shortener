
const express=  require('express');
const DAO = require(__dirname + '/db.js');
const dns = require('dns');
let router = express.Router();
router.get("/", function(req,res){
  res.send(`<h1>URL - SHORTENER</h1>
    <form method="POST" action='/api/shorturl'>
     <input type="text" id="url1" name="url" ><br>
      <input type="submit" value="Submit">
    </form>
  `)
})

router.get("/host" , function(req,res){
  res.send(req.headers.host);
})

const middleare =  (req,res,next)=>{
  let url  = req.body.url;
  dns.lookup(url , function(err){
    if(err){return res.send({error : "invalid url"})}
  })
  res.send("temporary")
  next();
}



router.post("/api/shorturl",middleare ,    function(req,res){

  let done = false;
  let url = req.body.url;
  let response = {}
   try{
 

  let obj = {
    fullurl : url,
    shorturl : "",
    date : new Date()

  }
  let query = {
    fullurl : url,
  }
 
  //     const data = await DAO.fetch_records(query);
  //  if(data.length != 0){
  //     return res.send({original_url : data[0].fullurl , short_url : data[0].shorturl});
  //  }
  //     let res1 = await DAO.post_record(obj);
  // console.log(res1);
  // if(res1.error){return res.send({"error" : res1.error})}
  // return res.send({original_url : url , short_url : res1.shorturl});
   
  }catch(err){
      return res.json({error : "invalid url"});
  }

})


module.exports = router;
