const utils=require('../utils');

const exec=async (update)=>{
    if(!(await utils.checkAdmin(update))) return;
    const message={
        chat_id: update.message.chat.id,
        text: "È ora possibile inviare in privato su @PerDueBot il x2 della squadra."
    }
    utils.sendMessage(message)
}

module.exports={
    exec
}