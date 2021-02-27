import Keyv from 'keyv';
import { KeyvFile } from 'keyv-file';

export const Stats = new Keyv<number>({
  store: new KeyvFile({
    filename: './data/stats.json'
  })
});

