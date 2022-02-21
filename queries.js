const express = require("express");
const {Pool, Client} = require('pg');
const ratingroutes = require('./routes/ratings');
const recommendationroutes = require('./routes/recommendation')
const movieroutes = require('./routes/movies');
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
  let rec_id = 'USE317';
  router.get('/', (req, res, next)=>{
    const sql = `SELECT * from public.get_usersv3(); select * from movies; select * from genres;
     select * from roles; select * from movie_section_fetchall_wtosubordinates(); select * from ratings_section_all(); 
     select * from ratings; select * from movie_section_orig_subordinate();
      select * from movie_section_fetchsubordinate_movies();`;
    pool.connect((err, client, release) => {
        if (err) {
          return console.error('Error acquiring client', err.stack);
        }
        client.query(sql, (err, result) => {
      
          release()
          if (err) {
            return console.error('Error executing query', err.stack)
          }
          // console.log(result[0]);
          // console.log(result[1]);
          // console.log(result[2]);
          // console.log(result[3]);
          // 
          // console.log(result[7].rows[0].prequel_id);
             res.render('index', {result: result[0],
              movies: result[1],
              genres: result[2],
              roles: result[3],
              films: result[4],
              ratings: result[5],
              rates: result[6], 
              prequels: result[7], 
              sequels: result[8],            
              pageTitle: 'Movie DBManagement System'});
          
        });
        // pool.end();
      });
    // return res.render('index',{pageTitle: 'title'});
    
    
  });
 

  router.post('/add', (req, res)=>{
       let data = req.body
       console.log(data);
      const sql = `call addUserscurrent('`+ (JSON.stringify(data)) +`');`;
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


router.post('/delete', (req, res)=>{
  let data = req.body;
  var firstname = data.firstname;
  var lastname = data.lastname;
  console.log(firstname,lastname);
 const sql =
              { text: 'call del_user_current(firstname, lastname) values($1,$2)',
              values: [firstname, lastname]
              };

  console.log(sql);   
 pool.connect((err, client, release) => {
     if (err) {
       return console.error('Error acquiring client', err.stack);
     }
     
     client.query('call del_user_current($1,$2)',[firstname, lastname], (err, result) => {
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
console.log(data);
const sql = `call update_users_current('`+ (JSON.stringify(data)) +`');`; 
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
router.use('/ratings', ratingroutes());
router.use('/recommendation', recommendationroutes());
router.use('/movies', movieroutes());


  return router;
}
