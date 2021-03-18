const utils = require('../utils');

const exec = async (update, db) => {
    const capitani = await db.get("perdue-capitani");
    const capitaniList=await capitani.find({});
    const message = {
        chat_id: update.message.chat.id,
        text: "Ecco la lista dei capitani:\n\n",
        parse_mode: "markdown"
    }
    for(let capitano of capitaniList){
        message.text+=`*[${capitano.team}]* - ${capitano.username || capitano.first_name}\n`
    }
    utils.sendMessage(message)
}

module.exports = {
    exec
}