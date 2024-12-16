var express = require('express');
var router = express.Router();
const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      console.log(file)
      cb(null, file.originalname.split('.')[0] + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + file.originalname.split('.').pop())
    }
  })
  
  const fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true); 
    } else {
        cb(new Error('PNG edo JPG motako irudiak hartzen dira soilik.'));
    }
};

const limits = {
    fileSize: 2 * 1024 * 1024 
};

const upload = multer({ 
    storage: storage, 
    fileFilter: fileFilter, 
    limits: limits 
});
  

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('form.html');
});

//router.post('/', upload.single('avatar'), function (req, res, next) {
//    console.log(req.file.filename)

//    res.send("Jasota")
//})

router.post('/', upload.single('avatar'), function (req, res, next) {
    const izena = req.body.izena; 
    console.log('X-Forwarded-Host:', req.get('X-Forwarded-Host'));
    const baseUrl = `${req.protocol}://${req.get('X-Forwarded-Host')}`; // Calcular dinámicamente la URL base
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`; 

    
    res.send(`Zure izena: ${izena}. Zure fitxategia: <a href="${fileUrl}" target="_blank">${fileUrl}</a>`);
});


module.exports = router;
