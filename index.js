const express = require('express');
const { upload } = require('./uploadFileWithMulter');
const cloudinary = require('./Clowdinary');
const app = express();
const dotenv = require('dotenv').config();
const fs = require("fs");
app.post('/file-upload',upload.single('image'),async(req,res)=>{
  try {
    await cloudinary.v2.uploader.upload(
      // -------file name what file you want to upload
        req.file.path,
        {
          // -------folder name where you want to upload
          folder: 'test',
        },
        // -------callback function to get the result
        (err, response) => {
          if (err) {
            removeTmp(req.file.path);
            return res.status(500).send(err);
          }
            res.status(200).send(response);
            removeTmp(req.file.path);
        }
      );
    
  } catch (error) {
    res.status(500).send(error);
  }
})

app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.listen(5000,()=>{
    console.log('Server is running on port 5000 hello');
})
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};