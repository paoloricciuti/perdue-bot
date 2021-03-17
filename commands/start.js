const utils=require('../utils');

const exec=(update, _)=>{
    const message={
        chat_id: update.message.chat.id,
        text: "Ciao, sono il bot fatto apposta per aiutare la chat a gestire i x2!\n\nQuando un'amministratore della chat invierà il comando /startx2 potrai inviarmi il nome della persona che sarà il vostro x2 per questo turno col comando /x2."
    }
    utils.sendMessage(message)
}

module.exports={
    exec
}