var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var fs = require('fs');
var path = require('path');



app.get('/yourroute', function(req, res) {
  res.send("stuff");
});

app.post('/create/:name/:age', function(req, res) {
  let obj = {
    "name": req.params.name,
    "age": req.params.age
  }

  fs.readFile('./storage.json', 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    data = JSON.parse(data);
    console.log("prestige worldwide");
    data.push(obj);

    fs.writeFile('./storage.json', JSON.stringify(data), function(err) {
      if (err) {
        throw err;
      }

    })
  })
  res.send("We are storing your name and age");

});

app.get('/', function(req, res){
  fs.readFile('./storage.json', 'utf8', function(err, data){
    if(err){
      throw err;
    }
    let currentData = JSON.parse(data);
    res.json(currentData);
  })
})

app.get('/:name', function(req, res) {

  fs.readFile('./storage.json', 'utf8', function(err, data) {
    let user = req.params.name;
    data = JSON.parse(data);
    for (var i = 0; i < data.length; i++) {
      if (data[i].name.toLowerCase() === user.toLowerCase()) {
        res.json(data[i]);
        return;
      }
    }
    res.sendStatus(400);
  })
})

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
