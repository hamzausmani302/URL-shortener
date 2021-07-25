
const express=  require('express');
const DAO = require(__dirname + '/db.js');
const dns = require('dns');
const middles =require(__dirname + '/middlewares.js');
const mainfunctions =require(__dirname + '/Mainfunctions.js');


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


router.get("/api/shorturl/:id" , async function(req,res){
    let id=  req.params.id;
    console.log(id);
    let query = {
      shorturl : parseInt(id)
    }    
    let data = await DAO.fetch_records(query);
    if(!data){
      return {"error" : "error fetching data from db"};
    }
    if(data.length > 0){
        console.log(data);
      
     res.writeHead(301,
      {Location: data[0].fullurl}
      );  
      res.end();
   
    }


} );


router.post("/api/shorturl" ,  mainfunctions.post_url );


module.exports = router;
