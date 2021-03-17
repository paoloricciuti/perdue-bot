const utils=require('../utils');

const exec=async (update, db)=>{
    if(!(await utils.checkAdmin(update))) return;
    const message={
        chat_id: update.message.chat.id,
        text: "È ora possibile inviare in privato su @PerDueBot il x2 della squadra."
    }
    const perdue=await db.get("perdue-table");
    const currentTime=new Date().getTime();
    const currentPerDue=await perdue.findOne({
        end: {
            $gt: currentTime
        }
    });
    console.log(currentPerDue);
    if(currentPerDue!=null){
        message.text="Il x2 è già stato avviato!"
        utils.sendMessage(message);
        return;
    }
    perdue.insert({
        start: currentTime,
        end: currentTime+(1000*60*60*12),
        perdue: []
    });
    utils.sendMessage(message)
}

module.exports={
    exec
}