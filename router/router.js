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
    var imagegItem = req.files;

    async function startLabeling(name){
            var fn = name;
            
            execFile('./startLabeling', [fn, fn.substring(0, fn.lastIndexOf('.')) + '.txt', fn.substring(0, fn.lastIndexOf('.')) + '.txt',
                'predict_' + fn.substring(0, fn.lastIndexOf('.')) + '.jpg', 'predict_' + fn.substring(0, fn.lastIndexOf('.')) + '.jpg',
                fn, fn.substring(0, fn.lastIndexOf('.')) + '.jpg'], function (err, data) {
                    if (err) {
                        console.log(err);
                    }

                    else {
                        console.log(data.toString());
                        res.sendFile(path.join(__dirname, '../predictions.jpg'));
                    }
                }
            );
    }

    async function asyncLaunch(imagegItem) {
        imagegItem.forEach(item => {
            var name = item.originalname;
            await startLabeling(name);
            console.log(item);
        })
    }

    asyncLaunch();
});

router.get('/', function (req, res) {
    console.log("Hi welcome my server");
    res.sendFile(path.join(__dirname, '../public/main.html'));
});

module.exports = router;