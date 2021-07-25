const dns = require('dns');
class MiddleWares{
  
static async middleware(req,res,next){
  let url  = req.body.url;
  try{
  dns.lookup(url , function(err , addresses){
    if(err != null && err.code == 'ERR_HTTP_HEADERS_SENT' || addresses==undefined || addresses.length == 0){throw new Error(err);}
    res.send("temporary")
     next();
  
  })
  }catch(err){
      return res.error({"error" : "invalid url"})}
  }
  



}

module.exports = MiddleWares;