import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, './public/images/')
  },
  filename: function (_, file, cb) {
    console.log(file)
    const mimeExtension = {
      'image/jpeg': '.jpeg',
      'image/jpg': '.jpg',
      'image/png': '.png',
      'image/JPEG': '.JPEG',
      'image/JPG': '.JPG',
      'image/PNG': '.PNG',
    }
    cb(null, file.fieldname + '-' + Date.now() + mimeExtension[file.mimetype])
  }
})

const updateProductImage = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      console.log(file.mimetype)
      if(file.mimetype === 'image/jpeg' || 
        file.mimetype === 'image/jpg'   || 
        file.mimetype === 'image/png'   ||
        file.mimetype === 'image/JPEG'  ||
        file.mimetype === 'image/JPG'   ||
        file.mimetype === 'image/PNG'
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        req.fileError = 'File format is not valid';
      }
  }
})

export { updateProductImage }