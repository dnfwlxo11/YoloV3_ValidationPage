var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');

// var execFile = require('child_process').execFile;

// var upload = multer({ 
//     dest: 'model/img', 
//     limits: { fileSize: 3 * 1024 * 1024 } 
// });

// router.post('/upload_file', upload.single('img'), function(req, res) {
//     console.log(req.file);
//     console.log('success save file');

//     execFile('./model/darknet', ['detector', 'test', './model/obj.data', './model/yolov3_custom.cfg', './model/yolov3_custom_3000.weights', './model/img/test.jpg', '-dont_show'], function(err, data) {
//         if(err) {
//             console.log(err)
//         } 
//         else 
//         console.log(data.toString());                       
//     }); 

//     res.render(path.join(__dirname, '../model/predicts.jpg'))
// });

// module.exports = router;