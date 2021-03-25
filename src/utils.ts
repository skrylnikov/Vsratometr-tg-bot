
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
  'лайк',
  'ня',
  'заебись',
  'клас',
  'огонь',
  'круто',
  'пиздато',
  'ахуенно',
  'ахуено',
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
  'дизлайк',
  'говно',
  'гавно',
  'хуйня',
  'отстой',
  'кринж',
  'пиздец',
  'хуево',
  'хуёво',
];

export const isMinus = (text: string) => {
  return minusList.some((x) => text.indexOf(x) === 0);
}
