const express = require('express');
const http= require('http');
const utils= require('./utils');
require('dotenv').config()
const db = require('monk')(process.env.MONGO_CONNECTION_STRING);

const app=express();
app.use(express.json());
const server=http.createServer(app);

app.get(`/${process.env.BOT_TOKEN}`, (req, res)=>{
    res.json({
        active: true
    })
})

app.post(`/${process.env.BOT_TOKEN}`, (req, res)=>{
    const { body: update } = req;
    const commandString=utils.getCommand(update);
    const command=require(`./commands${commandString}`);
    command.exec(update, db);
    res.sendStatus(200);
});

server.listen(process.env.PORT || 3000, ()=>{
    console.log("Server up and running...");
})