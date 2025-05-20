export const getLocaleDateTime = (timeStamp: string) => {
  let localeDate = new Date(timeStamp);
  let localeDateStr = localeDate.toLocaleDateString();
  let localeTimeStr = localeDate.toLocaleTimeString();
  return [localeDateStr, localeTimeStr];
};
