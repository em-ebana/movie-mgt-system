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
    router.post('/add', (req, res, next)=>{
        let data = req.body;
        console.log(data);
       const sql = `call ratings_section_add('`+ JSON.stringify(data) +`');`;
       console.log(sql);   
       pool.connect((err, client, release) => {
           if (err) {
             return console.error('Error acquiring client', err.stack);
           }
          //  pool.on("connect", client => { client.on("notice", msg => console.log("notice", msg)); });
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


router.post('/update', (req, res)=>{
    let data = req.body;
    console.log("updatee", data);
   const sql = `call ratings_section_update('`+ JSON.stringify(data) +`');`;
   console.log(sql);   
   pool.connect((err, client, release) => {
       if (err) {
         return console.error('Error acquiring client', err.stack);
       }
      //  pool.on("connect", client => { client.on("notice", msg => console.log("notice", msg)); });
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
  console.log("delete", data)
 const sql = `call ratings_section_del('`+ JSON.stringify(data) +`');`;

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
