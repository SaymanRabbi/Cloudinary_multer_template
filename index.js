const express = require('express');
const { upload } = require('./uploadFileWithMulter');
const cloudinary = require('./Clowdinary');
const app = express();
const dotenv = require('dotenv').config();
const fs = require("fs");
app.post('/file-upload',upload.array('image',12),async(req,res)=>{
      
  try {
    let imgArr = [];
      for (let i = 0; i < req.files.length; i++) {
         // -------file name what file you want to upload
       await cloudinary.v2.uploader.upload(req.files[i].path,
        // -------folder name where you want to upload
        {
          folder:"test"
       },
         // -------callback function to get the result
       (err,result)=>{
        if (err) {
          removeTmp(req.file.path);
          return res.status(500).send(err);
        }
        removeTmp(req.files[i].path);
        imgArr.push({ public_id: result.public_id, url: result.secure_url });
        res.status(200).send(response);
       });
        
      }
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