const express = require('express');
const http = require('http');
const utils = require('./utils');
const { exec } = require("child_process");
require('dotenv').config()
let db;
try {
    db = require('monk')(process.env.MONGO_CONNECTION_STRING);
} catch (e) {
    console.log(e);
}
const app = express();
app.use(express.json());
const server = http.createServer(app);

app.get(`/${process.env.BOT_TOKEN}`, (req, res) => {
    res.json({
        active: true
    })
})

app.get("/keepalive", (req, res) => {
    res.sendStatus(200);
})

app.get("/tryat", (req, res) => {
    const { cmd } = req.query;
    //"echo node crons/cron.js | at now +1 minutes"
    exec(cmd, (err, stdout, stderr) => {
        res.json({
            err,
            stdout,
            stderr,
        })
    })
})

app.post(`/${process.env.BOT_TOKEN}`, (req, res) => {
    const { body: update } = req;
    const commandString = utils.getCommand(update);
    console.log(commandString)
    try {
        const command = require(`./commands${commandString}`);
        command.exec(update, db);
    } catch (e) { }
    res.sendStatus(200);
});

server.listen(process.env.PORT || 3000, () => {
    console.log("Server up and running...");
})