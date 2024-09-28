
import { bot } from './bot';
import './commands';

console.log('Starting bot...');

bot.launch().then(() => {
  console.log('Bot started');
});
