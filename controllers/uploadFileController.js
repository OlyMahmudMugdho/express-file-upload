const uploadFileMiddleware = require('../middlewares/upload');

const uploadFileController = async (req, res) => {
    await uploadFileMiddleware(req, res);
    if (req.file) {
        return res.status(400).json(
            {
                "error": true,
                "success": false,
                "message": "please upload a file"
            }
        )
    }
    else {
        return res.status(200).json(
            {
                "success": true,
                "message": `${req.file.originalname} is uploaded`
            }
        )
    }
}

module.exports = {
    uploadFileController
}