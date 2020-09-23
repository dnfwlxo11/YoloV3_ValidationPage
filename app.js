var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = require('./router/router');
var file_manage = require('./router/file_manage');

var hostname = '127.0.0.1';

app.listen(3000, function (req, res) {
    console.log('Server Start!!!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use('/upload_file', router);
app.use('/', router);
// app.use('/email_post', router);
// app.use('/ajax_home', router);

app.use(express.static('public'));
app.use(express.static('detectionModel'));