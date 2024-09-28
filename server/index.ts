
import { bot } from './bot';
import './commands';

bot.launch().then(() => {
  console.log('Bot started');
});
