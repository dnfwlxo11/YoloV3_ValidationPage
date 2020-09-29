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

router.post('/upload_file', upload.array('img'), function (req, res) {
    console.log('success save file');
    var imageItem = req.files;

    function startLabeling(name) {
        return new Promise(function (resolve, reject) {
                var fn = name;

                execFile('./startLabeling', [fn, fn.substring(0, fn.lastIndexOf('.')) + '.txt', fn.substring(0, fn.lastIndexOf('.')) + '.txt',
                    'predict_' + fn.substring(0, fn.lastIndexOf('.')) + '.jpg', 'predict_' + fn.substring(0, fn.lastIndexOf('.')) + '.jpg',
                    fn, fn.substring(0, fn.lastIndexOf('.')) + '.jpg'], function (err, data) {
                        if (err) {
                            console.log(err);
                            resolve();
                        }

                        else {
                            console.log(data.toString());
                            resolve();
                        }
                    }
                );
        });
    }

    async function asyncLaunch(imageitem) {
        for (var i = 0; i < imageitem.length; i++) {
            var name = imageitem[i].originalname;
            await startLabeling(name);
            console.log(name);
        }

        setTimeout(function(){
            console.log('잠시 대기');
        }, 1500);
        res.sendFile(path.join(__dirname, '../public/res_down.html'));
    }

    asyncLaunch(imageItem);
});

router.get('/', function (req, res) {
    console.log('Hi welcome my server');
    res.sendFile(path.join(__dirname, '../public/main.html'));
});

module.exports = router;