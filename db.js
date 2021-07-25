const mongoose = require('mongoose');
const URL = require(__dirname + '/Schemas/URLSchema.js');
const fs = require('fs');

let response;
class DAO{

  static async fetch_records(query= {}){
       try{
        const all = await URL.find(query  );
        if(all  == null ){
            throw new Error("Error fetching products");
        }
 
        return all;
        }catch(err){
            return {"error" : err.message}
        }
    

    
  }
  static read_file(filename){
    var contents= fs.readFileSync(filename);
   return contents;

  }
  static write_file(filename , contents){
    fs.writeFileSync(filename, contents);
  }
  static async post_record(url){
      let data = DAO.read_file("count.txt");
      let intdata = parseInt(data.toString());
       url.shorturl = intdata;
      let u = new URL(url);

      u.save(function(err , c){
        if(err){return {"error" : err}}
        
        DAO.write_file("count.txt" , intdata+1);
        
    });
    return {fullurl : u.fullurl , shorturl : u.shorturl}
     }
}

module.exports = DAO;