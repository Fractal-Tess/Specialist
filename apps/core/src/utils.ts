export const createID = (length: number) => {
  let id = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    id += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return id;
};
