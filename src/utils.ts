
export const tokenize = (text: string) => {
  const shortText = text.substring(0, 10);
  return shortText.split(/\s|\.|,|!|\?/).filter((x) => x.length !==0);
}

const plusSet = new Set([
  '+',
  '++',
  '+++',
  '++++',
  '+++++',
  '👍',
  '👍👍',
  '👍👍👍',
  '👍👍👍👍',
  '👍👍👍👍👍',
]);

export const isPlus = (text: string) => {
  const tokenList = tokenize(text);

  return tokenList.some((x) => plusSet.has(x));
}


const minusSet = new Set([
  '-',
  '--',
  '---',
  '----',
  '-----',
  '👎',
  '👎👎',
  '👎👎👎',
  '👎👎👎👎',
  '👎👎👎👎👎',
]);

export const isMinus = (text: string) => {
  const tokenList = tokenize(text);

  return tokenList.some((x) => minusSet.has(x));
}
