const utils=require('../utils');

const exec=async (update, db)=>{
    const capitani=await db.get("perdue-capitani");
    const [command, ...args]=update.message.text.split(" ");
    const team=args.join(" ");
    const toInsert=update.message.from;
    toInsert.team=team;
    capitani.insert(toInsert);
    const message={
        chat_id: update.message.chat.id,
        text: "Perfetto, ti ho aggiunto come capitano della squadra "+team
    }
    utils.sendMessage(message)
}

module.exports={
    exec
}