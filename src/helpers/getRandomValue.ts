export const getRandomValueBetweenNums = (num1: number, num2: number) => {
  return Math.floor(Math.random() * (num2 - num1)) + num1;
};
