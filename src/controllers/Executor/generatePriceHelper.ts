export const generatePriceHelper = (name: string) => {
  const price: number = Math.round((Math.random() / 2) * 1000);

  return { name, price };
};
