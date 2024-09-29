import { bot } from "./bot";
import "./commands";

console.log("Starting bot...");

bot.catch((e) => { console.error(e) });


bot
  .start()
  .catch((e) => {
    console.error(e);
  });
