const utils = require('../utils');
const schedule = require('node-schedule');

const exec = async (update, db) => {
    const [command, ...args] = update.message.text.split(" ");
    const msg = args.join(" ");
    const message = {
        chat_id: update.message.chat.id,
        text: msg
    }
    const date = new Date(Date.now() + 3600 * 1000 * 12);
    const job = schedule.scheduleJob(date, () => {
        utils.sendMessage(message)
    });
    utils.sendMessage({
        chat_id: update.message.chat.id,
        text: "Ok ti invierò questo messaggio tra 12 ore....spero."
    });
}

module.exports = {
    exec
}