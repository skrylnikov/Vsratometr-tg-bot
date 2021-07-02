import { just, Maybe, none } from '@sweet-monads/maybe';

const tokenize = (text: string) => {
  return text.toLowerCase().split(/\s|\.|,|!|\?/).filter((x) => x.length !== 0);
  // return text.toLowerCase().split(/|\.|,|!|\?|\(|\)/).filter((x) => x.length !== 0);
}

export const getFirstToken = (text: string): Maybe<string> => {
  const tokenList = tokenize(text);

  if (tokenList.length === 0) {
    return none();
  }

  return just(tokenList[0]);
};
