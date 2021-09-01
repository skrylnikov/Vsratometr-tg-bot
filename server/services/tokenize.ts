export const tokenize = (text: string) => {
  return text.toLowerCase().split(/\s|\.|,|!|\?/).filter((x) => x.length !== 0);
  // return text.toLowerCase().split(/|\.|,|!|\?|\(|\)/).filter((x) => x.length !== 0);
}
