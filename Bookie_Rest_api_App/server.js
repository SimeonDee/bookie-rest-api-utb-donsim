/**************************************************************************
Author:   Adeyemi Adedoyin Simeon
Date:     20th Oct., 2019
Language: NodeJs, Express, jQuery, Vanilla-Js, CSS, HTML, SQL, AJAX, JSON
Version:  1.4
E-mail:   adeyemi.sa1@gmail.com
Github:   https://github.com/SimeonDee
Link:     https://github.com/SimeonDee/bookie-rest-api-utb-donsim
Status:   Completed...
***************************************************************************

*Note: Please reference the author whenever and wherever you use all/portion of this code*
*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');

const PORT = process.env.PORT || 5000;

books = [
    {id:1, author:'MckDonald Davies', title:'The Day After Tomorrow'},
    {id:2, author:'Daniel Gribson', title:'See You Another Day'}
];


//app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Require the route handlers (a.k.a Controllers)
require('./routes')(app, books);

// Listen to requests on 'PORT'
app.listen(PORT, ()=>{
    console.log('Server live on Port ' + PORT);
});