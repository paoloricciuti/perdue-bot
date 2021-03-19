const utils = require('../utils');
require('dotenv').config()

const exec = async (update, db) => {
    if (!(await utils.checkAdmin(update))) return;
    if(update.message.chat.id == update.message.from.id) return;
    const perdue = await db.get("perdue-table");
    const currentTime = new Date().getTime();
    let [latestPerDue] = await perdue.find({
        start: {
            $lt: currentTime
        },
        end: {
            $lt: currentTime
        }
    },
    {
        limit: 1,
        sort: {start: -1}
    });
    if(latestPerDue===null) return;
    const message = {
        chat_id: update.message.chat.id,
        text: "Ecco l'elenco dei x2\n\n",
        parse_mode: "markdown"
    }
    const byTeam = latestPerDue.perdue.reduce((byteam, cv) => {
        byteam[cv.team] = cv.x2
        return byteam
    }, {});
    for (let x2 of Object.entries(byTeam)) {
        message.text += `*[${x2[0]}]* - ${x2[1]}\n`
    }
    utils.sendMessage(message);
}

module.exports = {
    exec
}