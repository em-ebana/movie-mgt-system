const express = require("express");
const {Pool, Client} = require('pg');
const router = express.Router();

const app = express();
const pool = new Pool({
    host: 'localhost',
   user: '',
   database: 'VMSystem',
   password: '',
   max: 20,
   idleTimeoutMillis: 30000,
   connectionTimeoutMillis: 2000,
  })

module.exports = () => {
router.post('/getrec', (req, res)=>{
  let data = req.body;
  var rec_id = data.id;
  console.log(rec_id);
 const sql = `select * from get_recommendation('`+ rec_id +`');`;
 console.log(sql);  
 pool.connect((err, client, release) => {
    
   
     if (err) {
       return console.error('Error acquiring client', err.stack);
     }
     client.on("notice",msg => {  
             
        res.locals.recs = msg.message;
        
     });
    client.query(sql, (err, result) => {   
       release()
       if (err) {
         return console.error('Error executing query', err.stack);
       }
           
          
            
            // res.json({result_rec: result,
            //             recs: res.locals.recs});
   
    //    console.log("notice", msg);
   
         res.render('recview', {result_recs: result,
          recs: res.locals.recs});       
     });

   });     
});
  return router;
}
