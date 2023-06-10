const express = require('express');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const { randomUUID } = require('crypto');

// global.__basedir = __dirname;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: '*' }))

// const initRoutes = require("../file-upload/routes");
// initRoutes(app)

app.get('/', (req, res) => {
    return res.json({
        "success": true
    })
});
app.get('/files/*', (req, res) => {
    return res.sendFile(path.join(__dirname,req.url));
})


// app.use(require('./routes'));

app.post('/upload', fileUpload({ createParentPath: true }), (req, res) => {
    const files = req.files;
    console.log(files);
    let filename;
    Object.keys(files).forEach(
        key => {
            console.log((files[key].name));
            filename = files[key].name;
            ext = path.extname(filename);
            // const filePath = path.join(__dirname, 'files', files[key].name);
            filename = randomUUID() + ext;
            const filePath = path.join(__dirname, 'files', filename);
            files[key].mv(filePath, (error) => {
                console.log(error);
            })
        }
    )
    return res.json(
        {
            status: 'uploaded',
            url: 'http://localhost:5000/files/' + filename,
            message: 'logged'
        }
    )
})


app.listen(5000, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Server is running on http://localhost:5000');
})
