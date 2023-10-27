export const generateRandomNumberList = (
  length: number,
  max: number,
  min: number = 0
) => {
  const x = new Set<number>();

  for (let i = 0; i < length; i++) {
    const y = (Math.floor(Math.random() * 100000) % (max - min)) + min;
    if (x.has(y)) i--;
    else {
      x.add(y);
    }
  }

  return x;
};
