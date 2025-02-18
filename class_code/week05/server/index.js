/* Project setup: For the server
1 - new project folder
2 - open an integrated terminal
3 - run these commands:
    npm init -y
    npm i express nodemon
    (optional) -> go into package.json and add "type": "module" to enable import from 
*/
 
// [Please enable only ONE of these] 
// const express = require("express"); // if using common JS (Default)
import express from "express"; // if you are using type: module
import cors from 'cors';
import multer from "multer";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads/')
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniquePrefix + '-' +file.fieldname)
  }
})

const upload = multer({ storage: storage })


const app = express();
const PORT = process.env.PORT || 8000;
 
// middlelware
app.use(cors());
app.use(express.urlencoded({extended: true})); // For HTML Forms
app.use(express.json()); // extracts application/json data, OLD method bodyparser
 
// routes
app.get("/", (req, res) => {
  res.send("Welcome to our server");
});

// Send data
app.get("/data", (req, res) => {
    const data = {
        fname: "Abdulllahi",
        lname: "Alao",
    }
    res.send(data)
  });

  app.post("/login", (req, res) => {
    console.log(req.body)
    // process with DB in future
    res.send("I stole your data")
  });
 
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
 
app.use("", (req, res) => {
  res.status(404).send("Page not found");
});

// New stuff during Lab session
app.post("/fileform", upload.single(), (req, res)=>{
  console.log(req.file)
  console.log(req.body)
  res.json("I received your information")
})