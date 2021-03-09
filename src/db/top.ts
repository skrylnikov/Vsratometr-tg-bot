import Keyv from 'keyv';
import { KeyvFile } from 'keyv-file';

export const StatsTop = new Keyv<number>({
  store: new KeyvFile({
    filename: './data/stats-top.json'
  })
});

