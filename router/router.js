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

router.post('/upload_file', upload.single('img'), function (req, res) {
    console.log(req.file);
    console.log('success save file');

    var fileOriginalname = req.file.originalname
    var date = new Date();
    date = date.toLocaleDateString().replace('. ', '_') + '_' + date.getHours.toString() + '_' + date.getMinutes.toString() + '_' +
    console.log(date)
    execFile('detectionModel/darknet', ['detector', 'test', 'detectionModel/model/obj.data', 'detectionModel/model/yolov3_custom.cfg', 'detectionModel/model/yolov3_custom_10000.weights', './result/img/' + fileOriginalname, '-dont_show', '-thresh 0.65'], function (err, data) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(data.toString());
            res.sendFile(path.join(__dirname, '/../predictions.jpg'))

            execFile('cp', ['./result/label/tmp.txt', './result/label/' + fileOriginalname.substring(0, fileOriginalname.lastIndexOf('.')) + '.txt'], function (err, data) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(data.toString());

                    execFile('rm', ['./result/label/tmp.txt'], function (err, data) {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log(data.toString());
                        }
                    });
                }
            });

            execFile('cp', [path.join(__dirname, '/../predictions.jpg'), './result/predict_Img/predict_' + fileOriginalname.substring(0, fileOriginalname.lastIndexOf('.')) + '.jpg'], function (err, data) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(data.toString());
                }
            });
        }
    });
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