const express = require("express");
const {Pool, Client} = require('pg');
const router = express.Router();

const app = express();
const pool = new Pool({
    host: 'localhost',
   user: 'postgres',
   database: 'VMSystem',
   password: 'password',
   max: 20,
   idleTimeoutMillis: 30000,
   connectionTimeoutMillis: 2000,
  })
  


module.exports = () => {
  router.post('/update', (req, res, next)=>{
    let data = req.body;
       console.log(data);
    const sql = `call movie_section_update('`+ JSON.stringify(data) +`');`;
    console.log(sql); 
    pool.connect((err, client, release) => {
        if (err) {
          return console.error('Error acquiring client', err.stack);
        }
        client.query(sql, (err, result) => {
      
          release()
          if (err) {
            return console.error('Error executing query', err.stack)
          }
            console.log(result);
            return res.redirect(301,'/');
            // return res.render('index', {result: result,
            // pageTitle: 'Movie DBManagement System'});
          
        });
    
      });
    // return res.render('index',{pageTitle: 'title'});
    
  });

  router.post('/add', (req, res)=>{
       let data = req.body;
       console.log(data);       
      const sql = `call addmovie('`+ JSON.stringify(data) +`');`;
     console.log(sql);   
      pool.connect((err, client, release) => {
          if (err) {
            return console.error('Error acquiring client', err.stack);
          }
          client.query(sql, (err, result) => {
        
            release()
            if (err) {
              return console.error('Error executing query', err.stack)
            }
            // res.send('form submitted success.');
            console.log(result);
              return res.redirect(301,'/');
              res.render('index', {
              pageTitle: 'Data posted successful'});
            
          });
    
        });     
  });


 
router.post('/delete', (req, res)=>{
  let data = req.body;
  var mov_id = data.id
  console.log(data);
  const sql = `call del_mov('`+ mov_id +`');`;
 console.log(sql);   
 pool.connect((err, client, release) => {
     if (err) {
       return console.error('Error acquiring client', err.stack);
     }
     client.query(sql, (err, result) => {
   
       release()
       if (err) {
         return console.error('Error executing query', err.stack)
       }
       // res.send('form submitted success.');
         return res.redirect(301,'/');
         res.render('index', {
         pageTitle: 'Data posted successful'});
       
     });

   });     
});



  return router;
}
