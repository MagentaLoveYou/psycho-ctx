// https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
// Fixes an error with Promise cancellation
process.env.NTBA_FIX_319 = 'test';
const TelegramBot = require('node-telegram-bot-api');
import { followers } from '..api/follow.js';

module.exports = async (request, response) => {
    try {
        const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);

        
        const { body } = request;

        // Ensure that this is a message being sent
        if (body.message) {
          
          bot.onText(/start/, (msg) => {
                const chatId = msg.chat.id;
                var text_msg = msg.text;
                var split_msg = text_msg.split(' ');
                var user_id = split_msg[1];
                bot.sendMessage(chatId, user_id)
                var login = split_msg[2];
                var pass = split_msg[3];
                followers(user_id=user_id, login=login, pass=pass);
                bot.sendMessage(chatId, "Начинаем спам");
                });
          
        }
    }
    catch(error) {
        // If there was an error sending our message then we 
        // can log it into the Vercel console
        console.error('Error sending message');
        console.log(error.toString());
    }
    
    // Acknowledge the message with Telegram
    // by sending a 200 HTTP status code
    response.send('OK');
};
