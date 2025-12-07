require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const connectDB = require('./server/config/db')

const app = express();
const PORT = 5000 || process.env.PORT;

// Connect to DB
connectDB();

//allow data to be transfered
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//add cookie parser and create session for user tracking
app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
    //cookie: { maxAge: new Date (Date.now() + (3600000))}
    //Date.now( - 30 * 24 * 60 60 1000)
}))

//allow acces to public folder
app.use(express.static(__dirname + '/public'));

//Templating engine
app.use(expressLayout);

app.set('views', __dirname + '/views');
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));

app.listen(PORT, ()=> {
    console.log(`App listening on port ${PORT}`);
});