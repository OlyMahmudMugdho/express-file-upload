const uploadFileController = require('./controllers/uploadFileController');
const express = require('express');
const router = express.Router();

let routes = (app) => {
    router.route('/')
        .post(uploadFileController.uploadFileController);

    app.use(router);
}

module.exports = routes;