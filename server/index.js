var express = require('express');
var path = require('path');

var app = express();

app.use(express.static('../build'));

app.all('*', (req, res) => {
    res.sendFile(path.resolve('../build/index.js'));
});

app.listen(9000, () => {
    console.log('server on port 9000');
});
