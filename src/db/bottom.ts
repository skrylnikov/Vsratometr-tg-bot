import Keyv from 'keyv';
import { KeyvFile } from 'keyv-file';

export const StatsBottom = new Keyv<number>({
  store: new KeyvFile({
    filename: './data/stats-bottom.json'
  })
});

