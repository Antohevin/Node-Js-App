const Multer = require('multer');
const Utils = require('../utils');
const dir = '../imagestorage';
var fs = require('fs');


const storage = Multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, dir)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
   
const upload = Multer({ storage: storage }).array('imageupload');

function Uploader(req, res, callback) {
    upload(req, res, function (err) {
        if(err){
            callback(err,[])
            return;
        };
        callback(null,req.file);
        return;
     });
 }
exports.multiImageUpload = (req,calback)=>{

    Uploader(req,res,(err,filaname) =>{
        if(err){
            callback(err,null);
            return;
        }
        callback(null,filaname);
        return;
    })
}

