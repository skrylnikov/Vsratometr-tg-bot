import type { BaseTranslation } from '../i18n-types.js'

const ru: BaseTranslation = {
	// TODO: your translations go here
	HI: 'Hi {name:string}! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n',

  bot: {
    error: "Кажется что-то сломалось(",

    supertop: "Супертоп",
    top: "Топ",
    bottom: "Антитоп",
      
    topEmpty: "Топ пуст. Клёвых сообщений не было(",
      
    banMeRate: "Нельзя меня оценивать!",
    banBotRate: "Отстань от бота! Оценивать можно только людей",
    banFrequency: "Оценивать можно не чаще раза в минуту",
      
    minusAction: "Плюс к антирейтингу",
    plusActin: "Плюс к рейтингу",
    plusMinusAction: "Плюс к рейтингу и антирейтингу",
  }
}

export default ru
