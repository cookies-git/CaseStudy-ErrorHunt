const express = require('express'); 
const path = require ('path'); 
const bodyparser = require('body-parser'); //ADDED
const cors = require('cors');
const host = '0.0.0.0';
const port = process.env.PORT || 3000;


const nav = require('./src/data/nav')

const loginRouter = require('./src/routes/loginroute');
const signupRouter = require('./src/routes/signuproute');
const homeRouter = require('./src/routes/homerouter'); //typo
const booksRouter = require('./src/routes/booksroute')(nav); //nav passing
const authorsRouter = require('./src/routes/authorsroute')(nav); //nav passing
// const bodyParser = require('body-parser');

const app = new express; 

app.set('views','./src/views'); 
app.set('view engine','ejs');
app.use(cors());
app.use(bodyparser.urlencoded({extended:true})); 
app.use(express.json());

//Setting the path for static files
app.use(express.static(path.join(__dirname , '/public'))); 

//Requesting for /books, use booksRouter
app.use('/login',loginRouter); 
app.use('/signup',signupRouter); 
app.use('/home',homeRouter); 
app.use('/books',booksRouter); 
app.use('/authors',authorsRouter); 

 
app.get('/',function(req,res){

    res.render('index',{

        nav, // caling nav
        title: "Library"
    });
    
});


app.listen(port, host, function() {
    console.log("Server started.......");
  });