const fetch=require('node-fetch');
require('dotenv').config()

const BASE_URL=`https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

const getCommand = (update)=>{
    const commandEntity=update.message.entities.find(entity => entity.type=="bot_command");
    let command=update.message.text.substring(commandEntity.offset, commandEntity.length);
    command=command.replace("@PerDueBot", "");
    return command;
}

const sendMessage = (message) => {
    const params=new URLSearchParams(message);
    console.log(`${BASE_URL}/sendMessage?${params}`);
    return fetch(`${BASE_URL}/sendMessage?${params}`);
}

module.exports={
    getCommand,
    sendMessage
}