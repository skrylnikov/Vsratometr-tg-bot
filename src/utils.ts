
export const tokenize = (text: string) => {
  const shortText = text.substring(0, 10);
  return shortText.split(/\s|\.|,|!|\?/).filter((x) => x.length !==0);
}

const plusList = [
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
];

export const isPlus = (text: string) => {
  return plusList.some((x) => text.indexOf(x) === 0);
}


const minusList = [
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
];

export const isMinus = (text: string) => {
  return minusList.some((x) => text.indexOf(x) === 0);
}
