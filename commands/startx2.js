const utils = require('../utils');
require('dotenv').config()

const exec = async (update, db) => {
    if (!(await utils.checkAdmin(update))) return;
    const message = {
        chat_id: update.message.chat.id,
        text: "È ora possibile inviare in privato su @PerDueBot il x2 della squadra."
    }
    const perdue = await db.get("perdue-table");
    const currentTime = new Date().getTime();
    let currentPerDue = await perdue.findOne({
        end: {
            $gt: currentTime
        }
    });
    if (currentPerDue != null) {
        message.text = "Il x2 è già stato avviato!"
        utils.sendMessage(message);
        return;
    }
    const end= parseInt(process.env.TIME_LIMIT);
    //const end = (1000 * 10);
    currentPerDue = await perdue.insert({
        start: currentTime,
        end: currentTime + end,
        perdue: []
    });
    utils.sendMessage(message);
    const capitani = await db.get("perdue-capitani");
    const teams=await capitani.find({});
    const notifyMessage={
        text: "Il x2 è stato avviato, puoi mandarmi il x2 della tua squadra col comando /x2 seguito dal nome del x2, ad esempio\n\n`/x2 FedoBass`",
        parse_mode: "markdown"
    }
    for(let team of teams){
        notifyMessage.chat_id=team.id;
        utils.sendMessage(notifyMessage)
    }
    setTimeout(()=>{
        const notifyMessage={
            text: "Mancano soltanto 6 ore al termine del x2, puoi mandarmi il x2 della tua squadra col comando /x2 seguito dal nome del x2, ad esempio\n\n`/x2 FedoBass`",
            parse_mode: "markdown"
        }
        for(let team of teams){
            notifyMessage.chat_id=team.id;
            utils.sendMessage(notifyMessage)
        }
    }, end/2);
    //mando l'elenco dei x2 nella chat in cui è stato inviato il comando alla scadenza del x2
    setTimeout(async () => {
        const message = {
            chat_id: update.message.chat.id,
            text: "Ecco l'elenco dei x2\n\n",
            parse_mode: "markdown"
        }
        const perDue = await perdue.findOne({
            _id: currentPerDue._id
        });
        const byTeam = perDue.perdue.reduce((byteam, cv) => {
            byteam[cv.team] = cv.x2
            return byteam
        }, {});
        for (let x2 of Object.entries(byTeam)) {
            message.text += `*[${x2[0]}]* - ${x2[1]}\n`
        }
        utils.sendMessage(message);
    }, end);
}

module.exports = {
    exec
}