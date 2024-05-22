require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const connectDB = require('./server/config/db')

const app = express();
const PORT = 5000 || process.env.PORT;

// Connect to DB
connectDB();

//allow data to be transfered
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//allow acces to public folder
app.use(express.static(__dirname + '/public'));

//Templating engine
app.use(expressLayout);

app.set('views', __dirname + '/views');
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);



app.use('/', require('./server/routes/main'));

app.listen(PORT, ()=> {
    console.log(`App listening on port ${PORT}`);
});