import { bot } from "./bot";
import { commands } from "./commands";

console.log("Starting bot...");

bot.use(commands);

bot.catch((e) => {
  console.error(e);
});

bot.start().catch((e) => {
  console.error(e);
});
