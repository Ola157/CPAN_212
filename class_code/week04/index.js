/* Project setup: For the server
1 - new project folder
2 - open an integrated terminal
3 - run these commands:
    npm init -y
    npm i express nodemon
    (optional) -> go into package.json and add "type": "module" to enable import from 
*/
 
// [Please enable only ONE of these] 
import express from "express"; // if you are using type: module
// const express = require("express"); // if using common JS (Default)
 import logger from './middleware/logger.js';
 import auth from './middleware/auth.js';



const app = express()
const PORT = process.env.PORT || 8000;
 
// middlelware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use(logger); // this is application wide, so it runs everwhere
 
// routes
app.get("/", logger, (req, res) => {
    // logger(req); use logger above
    res.send("Welcome to our server");
});

// app.post("/login", parseData, checkDB, checkPassword, twoFAcheck);

app.get("/about", (req, res) => {
    res.send("Welcome to the about page");
});
app.get("/login", (req, res) => {
    res.send("We have recieved your request - Login");
});
app.post("/login", (req, res) => {
    res.send("We stole your information");
});
app.get("/fetchData", auth, (req, res) => {
    res.send("Hi Abdullahi, Here is your profile data");
});
 
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
 
app.use("", (req, res) => {  // It work as else statement if res.send is put after this it will show page not found
  res.status(404).send("Page not found");
});
