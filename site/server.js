// Get the packages we need
var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser')

var session = require('express-session');
var cors = require('cors');

// Create our Express application
var app = express();
// app.use(cors());
app.use(cors());

// Use environment defined port or 5000
var port = process.env.PORT || 5000;

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post('/tag', function(req, res) {
    console.log('tag site accessed', Date.now());
    res.sendStatus(200)
});

app.post('/title', function(req, res) {
    console.log('title site accessed', Date.now());
    res.sendStatus(200)
});

app.post('/share', function(req, res) {
    console.log('share: ' + req.body.id, Date.now());
    res.sendStatus(200)
});

app.post('/link', function(req, res) {
    console.log('link: ' + req.body.id, Date.now());
    res.sendStatus(200)
});

app.post('/upvote', function(req, res) {
    console.log('upvote: ' + req.body.id, Date.now());
    res.sendStatus(200)
});

app.post('/downvote', function(req, res) {
    console.log('downvote: ' + req.body.id, Date.now());
    res.sendStatus(200)
});

// Start the server
app.listen(port);
console.log('Server running on port ' + port, Date.now());
