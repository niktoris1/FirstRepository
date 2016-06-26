var express = require('express');
var sqlite = require('sqlite3');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static('static'));
var db = new sqlite.Database('db.sqlite');


app.get('/', function (req, res) {
    db.all('select * from InfoKeeper', function (err, result) {
        res.render('index.ejs', {items: result});
    })

});


app.post('/add', function(req, res){
    var statement = 'insert into InfoKeeper (PlanetName, PlanetValue, BoomSound) values(?, ?, ?)';
    db.run(statement, req.query.planet_name, req.query.planet_value, req.query.boom_sound, function () {
        res.send('added');
    });
});

app.delete('/delete', function (req, res) {
    var statement = 'delete from InfoKeeper where id = ?';
    db.run(statement, req.query.id, function(){
        res.send('deleted');
    });
});

var port = process.env.PORT || 12345;
app.listen(port, function() {
    console.log("Listening on " + port);
});