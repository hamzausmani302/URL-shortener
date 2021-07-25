const dns = require('dns');
const DAO = require(__dirname + '/db.js');
class Main{

    static async post_url(req,res){
    
       console.log("here");
  let done = false;
  var url = req.body.url;
  var url1 = url;
  let strs = ["https://","http://" ];
  for(let i = 0 ; i < strs.length ; i++){
    url1 = url1.replace(strs[i] , "");
  }
  let locate = url1.indexOf("/");
  if(locate != -1){
    let sub = url1.substring(locate , url1.length);
    url1 = url1.replace(sub , "");
    console.log(url1);
  }
  

        console.log(url);
  let response = {}
   const options = {
     all : true,
    // Setting family as 6 i.e. IPv6
    family: 4,
    hints: dns.ADDRCONFIG | dns.V4MAPPED,
};

  let obj = {
    fullurl : url,
    shorturl : "",
    date : new Date()

  }
  let query = {
    fullurl : url,
  }
    await dns.lookup(url1 ,options , async function(err , addresses , family){
    if(err != null && addresses==undefined ){
      return res.send({error : "invalid url"});
    }else{
      
    }
    console.log(addresses);
      const data = await DAO.fetch_records(query);
   if(data.length != 0){
      return res.send({original_url : data[0].fullurl , short_url : data[0].shorturl});
   }
      let res1 = await DAO.post_record(obj);
  console.log(res1);
  if(res1.error){return res.send({error : res1.error})}
  return res.send({original_url : url , short_url : res1.shorturl});
  
  })
      
    
 
    
   
  
    }
}
module.exports = Main;