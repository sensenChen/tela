// server init + mods
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

// server route handler
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


// server route handler
app.get('/dashboard', function(req, res){
    res.sendFile(__dirname + '/public/dash.html');
});

//// server route handler
//app.get('/signin', function(req, res){
//    res.sendFile(__dirname + '/public/signin.html');
//});







// start server
http.listen(3000, function(){
  console.log('Server up on *:3000');
});