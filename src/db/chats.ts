import Keyv from 'keyv';
import { KeyvFile } from 'keyv-file';

interface IChat {
  id: number;
  members: number[];
}

export const Chats = new Keyv<IChat>({
  store: new KeyvFile({
    filename: './data/chats.json'
  })
});

