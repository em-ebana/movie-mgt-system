const { response } = require("express");
const express = require("express");
const methodOverride = require('method-override');
const path = require('path');
// const db = require('./queries');
const routes = require('./queries');



const app = express();

const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views/pages'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, './static')));


app.use('/', routes());


// app.get('/user_movies', db.getmovies);
// app.post('/#usersignup', db.addusers)

app.listen(port, ()=>{
    console.log(`Express server listening on port ${port}`);
});