var express = require('express');
var names = require('./nodeModules');



var app = express();

app.get('/names' , names.findAll);
app.get('/names/:id', names.findById);


app.listen(3000);
console.log('Listening');