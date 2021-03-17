const utils = require('../utils');

const exec = async (update, db) => {
    const message = {
        chat_id: update.message.chat.id,
        text: "Ok ho segnato il vostro x2!"
    }
    if (update.message.from.id !== update.message.chat.id) {
        message.text = "Questo comando è solo per le chat private!";
        utils.sendMessage(message);
        return;
    }
    const capitani = await db.get("perdue-capitani");
    const team=await capitani.findOne({
        id: update.message.from.id
    })
    if(team===null){
        message.text = "Questo comando è solo per i capitani!";
        utils.sendMessage(message);
        return;
    }
    const currentTime=new Date().getTime();
    const [command, ...args] = update.message.text.split(" ");
    const x2 = args.join(" ");
    const perdue=await db.get("perdue-table");
    const updated=await perdue.findOneAndUpdate({
        end: {
            $gt: currentTime
        }
    }, {
        $push: {
            perdue: {
                team: team.team,
                x2
            }
        }
    });
    if(updated==null){
        message.text="La scelta del x2 non è attualmente attiva";
    }
    utils.sendMessage(message)
}

module.exports = {
    exec
}