import { readFileSync } from 'fs';
import { resolve } from 'path';
import { FluentBundle, FluentResource } from '@fluent/bundle';

const createBundle = (lang: string) => {
  const resource = new FluentResource(readFileSync(resolve(__dirname, lang, 'bot.ftl'), {encoding: 'utf-8'}));

  const bundle = new FluentBundle(lang);

  bundle.addResource(resource);

  return bundle;
}

export type ILangList = 'ru' | 'ru-int';

const bundleMap: Record<ILangList, FluentBundle> = {
  'ru': createBundle('ru'),
  'ru-int': createBundle('ru-int'),
};

export const getMessage = (lang: ILangList, id: string, args?: Record<string, string>) => {
  const bundle = bundleMap[lang];

  const message = bundle.getMessage(id); 

  if (!message || !message.value){
    return id;
  }

  return bundle.formatPattern(message.value, args);
}
