const fetch=require('node-fetch');
require('dotenv').config()

const BASE_URL=`https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

const getCommand = (update)=>{
    const commandEntity=update.message.entities.find(entity => entity.type=="bot_command");
    if(commandEntity.offset===0){
        let command=update.message.text.substring(0, commandEntity.length);
        command=command.replace("@PerDueBot", "");
        return command;
    }
    return "";
}

const sendMessage = (message) => {
    const params=new URLSearchParams(message);
    return fetch(`${BASE_URL}/sendMessage?${params}`);
}

const checkAdmin=async (update)=>{
    const { message: { chat: { id: chatId }, from: { id: userId }}}=update
    if(chatId==userId){
        return true;
    }
    const response=await fetch(`${BASE_URL}/getChatMember?chat_id=${chatId}&user_id=${userId}`);
    const result=await response.json();
    return ["administrator", "creator"].includes(result.result.status);
}

module.exports={
    getCommand,
    sendMessage,
    checkAdmin
}