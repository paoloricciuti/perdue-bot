const express = require('express');
const http= require('http');
require('dotenv').config()
const db = require('monk')(process.env.MONGO_CONNECTION_STRING);

const app=express();
const server=http.createServer(app);

app.get(`/${process.env.BOT_TOKEN}`, (req, res)=>{
    res.json({
        active: true
    })
})

app.post(`/${process.env.BOT_TOKEN}`, (req, res)=>{
    console.log(req.body);
    res.json(req.body);
});

server.listen(process.env.PORT || 3000, ()=>{
    console.log("Server up and running...");
})