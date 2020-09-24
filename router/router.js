var express = require('express');
var router = express.Router();
var path = require('path');

var multer = require('multer');

var execFile = require('child_process').execFile;

var upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'result/img');
        },

        filename(req, file, cb) {
            cb(null, file.originalname);
        },
    }),
});

async function startLabeling(name){
    var fn = name;
    var filePath;
    console.log('\n' + fn)
    var date = new Date();
    //date = date.toLocaleDateString().replace('. ', '_') + '_'.toString() + date.getHours.toString() + '_'.toString() + date.getMinutes.toString() + '_'.toString() + date.getMilliseconds.toString();
    //console.log(date);
    
    await execFile('./startLabeling', [fn, fn.substring(0, fn.lastIndexOf('.')) + '.txt', fn.substring(0, fn.lastIndexOf('.')) + '.txt',
        'predict_' + fn.substring(0, fn.lastIndexOf('.')) + '.jpg', 'predict_' + fn.substring(0, fn.lastIndexOf('.')) + '.jpg',
        fn, fn.substring(0, fn.lastIndexOf('.')) + '.jpg'], function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(data.toString());
                filePath = '/../predictions.jpg';
            }
        }
    );

    return filePath
}

router.post('/upload_file', upload.array('img'), function (req, res) {
    console.log(req.files[2]);
    console.log('success save file');

    for (var i = 0; i < req.files.length; i++) {
        var name = req.files[i].originalname;
        var tmp = startLabeling(name);
        console.log(tmp)
        //res.sendFile(path.join(__dirname));
    }
});

router.get('/', function (req, res) {
    console.log("Hi welcome my server");
    res.sendFile(path.join(__dirname, '../public/main.html'));
});

// router.post('/email_post', function (req, res) {
//     res.render(path.join(__dirname, '../public/email.ejs'), { 'email': req.body.email });
//     // res.sendFile(__dirname + '/public/main.html');
// });

// router.post('/ajax_home', function (req, res) {
//     console.log('data loading complate : ' + req.body.new);
//     var responseData = { 'result': 'ok', 'receive data': req.body.new };
//     res.json(responseData)
// });

module.exports = router;