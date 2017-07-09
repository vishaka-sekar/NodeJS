var express = require('express'),
    name = require('C:/Nodejs/routes/nodeModulesWithMongoDb');

var app = express();
var bodyParser         = require("body-parser");
//app.configure(function () {
    //app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    //app.use(express.bodyParser());
//});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

app.get('/names' , name.findAll);
app.get('/names/:id', name.findById);
app.post('/names',name.addName);
app.put('/names/:id', name.updateName);
app.delete('/names/:id', name.deleteName);


app.listen(3000);
console.log('Listening');