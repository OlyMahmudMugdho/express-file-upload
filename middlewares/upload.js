const multer = require('multer');
const util = require('util');
const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, __basedir + '/uploads');
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    }
);

const uploadFile = multer(
    {
        storage : storage,

    }
).single('file');

const uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware